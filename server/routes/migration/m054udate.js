/*
 * 리포트 종목 연동 정보 관리
 *
 * @date 2023-10-27
 * @author ThreeOn
 */
const infoDb = require("../common/asyncInfoDb");
const Promise = require("bluebird");
const mconfig = require("../../database/mysql_config");

let getData = async function (req, res) {
	console.log(
		"/api/migration/m054udate/getData : /mirgraion/m054udate 안에 있는 getData 호출됨."
	);
	let tstr = `SELECT *
    FROM DBSUPER.M054UDATE
    WHERE TRADE_DATE < '20300000'
    ORDER BY TRADE_DATE DESC
    LIMIT 3000
    `;

	// console.log(tstr);
	let result = await infoDb.run("xdb", tstr, 1);
	// console.log(result);
	res.json({ success: true, results: result.resultList });
};

let doMigration = function (req, res) {
	console.log(
		"/api/migration/m054udate/doMigraion : /mirgraion/m054udate 안에 있는 doMigration 호출됨."
	);

	let pool = req.app.get("pool_dpbond");
	let mapper = req.app.get("mapper_dpbond");
	var stmt = mapper.getStatement(
		"m054udate",
		"insertM054udate",
		req.body,
		mconfig.format
	);
	console.log(stmt);

	Promise.using(pool.connect(), (conn) => {
		try {
			conn.query(stmt, function (err, rows) {
				if (!err) {
					res.json({ success: true });
					res.end();
				} else {
					let msg = "delete Error....";
					console.log(msg);
					res.json({ success: false, message: err });
					res.end();
				}
			});
		} catch (err) {
			console.log("Error while performing Query.", err);
			res.json({ success: false, message: err });
			res.end();
		}
	});
};


module.exports.getData = getData;
module.exports.doMigration = doMigration;
