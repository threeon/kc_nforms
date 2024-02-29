/*
 * 관세청 데이터 입력을 위한 라우팅 함수 정의
 *
 * @date 2024-02-28
 * @author ThreeOn
 */
let Promise = require("bluebird");
const config = require("../../database/mysql_config");
// const util = require("../../util/util");

let postKcsImc = function (req, res) {
	console.log("/crawl/kcsImc 모듈 안에 있는 postKcsImc 호출됨.");

	console.log(req.body);

	let pool = req.app.get("pool_dpmacro");
	let mapper = req.app.get("mapper_dpmacro");
	let stmt = "";
	try {
		stmt = mapper.getStatement(
			"crawlKcs",
			"insertKcsImc",
			{ dataList: req.body },
			config.format
		);
		console.log(stmt);
	} catch (expetion) {
		console.log("Error while performing Query.", expetion);
		res.json({ success: false, message: expetion });
		res.end();
	}

	Promise.using(pool.connect(), (conn) => {
		try {
			conn.query(stmt, function (err, rows) {
				if (!err) {
					if (rows.length > 0) {
						// console.log('The solution is: ', rows);
						res.json({ success: true, results: { cnt: rows.length } });
						res.end();
					} else {
						var msg = "No DATA!!";
						// console.log(msg);
						res.json({ success: false, message: msg });
						res.end();
					}
				} else {
					console.log("Error while performing Query.", err);
					res.json({ success: false, message: err });
					res.end();
				}
			});
		} catch (expetion) {
			console.log("Error while performing Query.", expetion);
			res.json({ success: false, message: expetion });
			res.end();
		}
	});
};
module.exports.postKcsImc = postKcsImc;
