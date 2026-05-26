/*
 * CRM 고객 정보 HDB 이관
 *
 * @date 2026-05-14
 * @author ThreeOn
 */
const infoDb = require("../../common/asyncInfoDb");
let mconfig = require("database/mysql_config");
let Promise = require("bluebird");
const { logger } = require("config/config");

let getTnGoodsUserList = async function (req, res) {
	console.log(
		"/api/datamanage/crm/gettngoodsuserlist : /datamanage/crm/tngoodsuser 안에 있는 getTnGoodsUserList 호출됨."
	);

  let tstr = `SELECT *
    FROM DCU01.TN_GOOD_USER
    ORDER BY GU_SQ ASC
    `;

	// console.log(tstr);
  let result = await infoDb.run("hcdb", tstr, 2);
  // console.log(result)
  if (result.resultCode != "success") {
		res.json({ success: false, message: "조회에 실패했습니다." });
	} else {
    // console.log(result.resultList);
    res.json({ success: true, results: result.resultList });
	}
};

let deleteTnGoodsUserList = async function (req, res) {
	console.log(
		"/api/datamanage/crm/deletetngoodsuserlist : /datamanage/crm/tngoodsuser 안에 있는 deleteTnGoodsUserList 호출됨."
	);

	// console.log(dobj);

	let tstr = `DELETE
    FROM DCU01.TN_GOOD_USER`;

  let result = await infoDb.run("hcdb", tstr, 2);
  console.log(result);
  
	if (result.resultCode != "success") {
		res.json({ success: false, message: "DELETE 실패했습니다." });
	} else {
		res.json({ success: true, results: [] });
	}
};

let moveTnGoodsUserList = async function (req, res) {
	
	// console.log(dobj);

	let pool = req.app.get("pool_kccrm");
	let mapper = req.app.get("mapper_kccrm");
	var stmt = mapper.getStatement(
		"tnGoods",
		"selectTnGoodsUser",
		req.body,
		mconfig.format
	);
	// console.log(stmt);

	Promise.using(pool.connect(), (conn) => {
		try {
      conn.query(stmt, function (err, rows) {
				if (!err) {
					if (rows.length > 0) {
						// logger.debug("The solution is: ", rows);
            processMigration(res, rows);
					} else {
						res.json({ success: false, message: "등록된 리스트가 없습니다." });
					}
				} else {
					console.log("Error while performing Query.", err);
					console.log(stmt);
					res.json({ success: false, message: err.message });
				}
			});
		} catch (expetion) {
			console.log("Error while performing Query.", err);
			console.log(stmt);
			res.json({ success: false, message: err.message });
    }
	});
};

const BATCH_SIZE = 2000;

const processMigration = async function (res, rows) {
  try {
    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
      const chunk = rows.slice(i, i + BATCH_SIZE).map(modifyRow);
      await insertXdbBatch(chunk);
      console.log(`${Math.min(i + BATCH_SIZE, rows.length)} / ${rows.length}`);
    }
    res.json({ success: true, results: [] });
  } catch (err) {
    console.error("migration error:", err);
    res.json({ success: false, message: err.message || String(err) });
  }
};

// 작은따옴표 이스케이프 (Altibase: '' 로 escape)
const esc = (v) => `'${String(v ?? "").replaceAll("'", "''")}'`;

const COLS = [
  "GU_SQ", "USER_NM", "POSITION", "MOBLPHON", "TELNO",
  "JOB_CDS", "JOB_COUNTERPART_CDS", "INVT_GOODS_CDS", "WORK_DEPT",
];

const insertXdbBatch = async function (objs) {
  console.log("insertXdbBatch............");
  if (objs.length === 0) return;

  const valuesSql = objs
    .map((o) => `(${COLS.map((c) => esc(o[c])).join(", ")})`)
    .join(",\n  ");

  const sql = `INSERT INTO DCU01.TN_GOOD_USER (${COLS.join(", ")}) VALUES\n  ${valuesSql}`;

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
  return tobj;
};

module.exports.getTnGoodsUserList = getTnGoodsUserList;
module.exports.deleteTnGoodsUserList = deleteTnGoodsUserList;
module.exports.moveTnGoodsUserList = moveTnGoodsUserList;
