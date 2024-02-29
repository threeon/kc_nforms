/*
 * 시장 정보
 *
 * @date 2019-04-19
 * @author ThreeOn
 */
let fs = require("fs");
let mconfig = require("database/mysql_config");
let Promise = require("bluebird");
const { logger } = require("config/config");

/*
 * normalTrans
 */
let runGetQuery = function (req, res, param) {
	// logger.info(
	// 	"/common/normalTrans 모듈 안에 있는 normalTrans runGetQuery 호출됨."
	// );

	let pool = req.app.get("pool_" + param.dbms);
	let mapper = req.app.get("mapper_" + param.dbms);
	let paramData = req.query;
	// console.log(req.query);
	let stmt = mapper.getStatement(
		param.mapper,
		param.mapid,
		paramData,
		mconfig.format
	);
	// logger.debug(stmt);

	Promise.using(pool.connect(), (conn) => {
		try {
			conn.query(stmt, function (err, rows) {
				if (!err) {
					if (rows.length > 0) {
						// logger.debug("The solution is: ", rows);
						res.json({ success: true, results: rows });
						res.end();
					} else {
						const msg = "등록된 리스트가 없습니다.";
						logger.debug(msg);
						res.json({ success: false, message: msg });
						res.end();
					}
				} else {
					logger.error("Error while performing Query.", err);
					logger.debug(stmt);
					res.json({ success: false, message: err });
					res.end();
				}
			});
		} catch (expetion) {
			logger.error("Error while performing Query.", err);
			logger.debug(stmt);
			res.json({ success: false, message: err });
			res.end();
		}
	});
};

let runPostQuery = function (req, res, param) {
	// logger.info(
	// 	"/common/normalTrans 모듈 안에 있는 normalTrans runPostQuery 호출됨."
	// );

	let pool = req.app.get("pool_" + param.dbms);
	let mapper = req.app.get("mapper_" + param.dbms);
	let paramData = req.body;
	// logger.debug(paramData);
	let stmt = mapper.getStatement(
		param.mapper,
		param.mapid,
		paramData,
		mconfig.format
	);
	// logger.debug(stmt);

	Promise.using(pool.connect(), (conn) => {
		try {
			conn.query(stmt, function (err, rows) {
				// logger.debug(rows);
				if (!err) {
					res.json({ success: true, results: rows });
					// logger.debug({ success: true, results: rows });
					// Logging File 처리 (Start)
					if (param.log != undefined && param.log == "on") {
						let tstr = JSON.stringify(rows, null, " ");
						fs.writeFileSync(param.ofname, tstr, { flag: "a" }, "utf8");
					}
					// Logging File 처리 (End)

					res.end();
				} else {
					logger.error("Error while performing Query.", err);
					logger.debug(stmt);
					res.json({ success: false, message: err });
					res.end();
				}
			});
		} catch (expetion) {
			logger.error("Error while performing Query.", err);
			logger.debug(stmt);
			res.json({ success: false, message: err });
			res.end();
		}
	});
};

module.exports.runGetQuery = runGetQuery;
module.exports.runPostQuery = runPostQuery;
