/*
* crmHdbStatSummary.js
*
* 실행 방법: # node crmHdbStatSummary.js 
*/

const Promise = require("bluebird");
const async = require('async');
let mconfig = require("database/mysql_config");
const infoDb = require("routes/common/asyncInfoDb");

const { logger } = require("../config/logger");

logger.level = 'trace';

module.exports = {
  start: function (app) {
    logger.info("[mvTnGoodsList] # Process starts.", new Date())

    let pool = app.get("pool_kccrm");
    let mapper = app.get("mapper_kccrm");
    let stmt = mapper.getStatement(
      "tnGoods",
      "selectTnGoods",
      {},
      mconfig.format
    );
    // console.log(stmt);
  
    Promise.using(pool.connect(), (conn) => {
      try {
        conn.query(stmt, function (err, rows) {
          if (!err) {
            if (rows.length > 0) {
              // logger.debug("The solution is: ", rows);
              processMigration(rows);
            } else {
              console.log("[mvTnGoodsList] 등록된 리스트가 없습니다.");
            }
          } else {
            console.log("[mvTnGoodsList] Query Error.");
          }
        });
      } catch (expetion) {
        console.log("[mvTnGoodsList] Connection Error.");
      }
    });
  
  }
};

const BATCH_SIZE = 2000;

const processMigration = async function (rows) {
  try {
    await deleteXdbBatch();
    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
      const chunk = rows.slice(i, i + BATCH_SIZE).map(modifyRow);
      await insertXdbBatch(chunk);
      console.log(`[mvTnGoodsList]  ${Math.min(i + BATCH_SIZE, rows.length)} / ${rows.length}`);
    }
    console.log("[mvTnGoodsList] Completed....");
  } catch (err) {
    console.error("[mvTnGoodsList] migration error:", err);
  }
};

const deleteXdbBatch = async function () {
  // console.log("[mvTnGoodsList] deleteXdbBatch............");
  const sql = `DELETE FROM DCU01.TN_GOODS`;

  // console.log(sql);
  return infoDb.run("hcdb", sql, 2);
};

// 작은따옴표 이스케이프 (Altibase: '' 로 escape)
const esc = (v) => `'${String(v ?? "").replaceAll("'", "''")}'`;

const COLS = [
  "GOODS_SQ", "PID", "FRST_USER_SQ", "SECON_USER_SQ", "REGISTER_ID",
  "REGIST_DT", "RECKN_BGN_DE", "COST_DEPT", "RQEST_CODE", "INSTL_DEPT",
];

const insertXdbBatch = async function (objs) {
  // console.log("[mvTnGoodsList] insertXdbBatch............");
  if (objs.length === 0) return;

  const valuesSql = objs
    .map((o) => `(${COLS.map((c) => esc(o[c])).join(", ")})`)
    .join(",\n  ");

  const sql = `INSERT INTO DCU01.TN_GOODS (${COLS.join(", ")}) VALUES\n  ${valuesSql}`;

  // console.log(sql);
  return infoDb.run("hcdb", sql, 2);
};

const modifyRow = function (obj) {
  const tobj = Object.fromEntries(
    Object.entries(obj).map(([k, v]) => {
      if (v === null) return [k, ""];
      if (typeof v === "string") return [k, v.replaceAll("null", "")];
      return [k, v];
    })
  );
  if (tobj.RECKN_BGN_DE) {
    tobj.RECKN_BGN_DE = String(tobj.RECKN_BGN_DE).replaceAll("-", "");
  }
  return tobj;
};
