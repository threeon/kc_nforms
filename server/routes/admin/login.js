/*
 * ETP REGISTER 위한 라우팅 함수 정의
 *
 * @date 2019-02-08
 * @author ThreeOn
 */
var Promise = require("bluebird");
const config = require("../../database/mysql_config");

var checkLogin = function (req, res) {
	console.log("admin 모듈 안에 있는 checkLogin 호출됨.");

	// var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
	// console.log('client IP***********--> ' + ip);

	//접속 시간
	var dt = new Date();
	// var dt_time = dt.getHours();
	console.log("client DATE***********--> " + dt);

	var paramData = req.body;
	var pool = req.app.get("pool");
	var mapper = req.app.get("mapper");
	var stmt = mapper.getStatement(
		"member",
		"selectAdminCheck",
		paramData,
		config.format
	);

	Promise.using(pool.connect(), (conn) => {
		try {
			conn.query(stmt, function (err, rows) {
				if (!err) {
					if (rows.length > 0) {
						// console.log('The solution is: ', rows);
						res.json({ success: true, results: rows });
						res.end();
					} else {
						var msg = "Not Correct ID or PASSWORD!!";
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
			console.log("Error while performing Query.", err);
			res.json({ success: false, message: err });
			res.end();
		}
	});
};

// 보안을 강화하고자 한다면, session key / IP를 DB에 저장하고 모든 조회시 체크
// route_loader.js 지금은 loginkey==undefined 로만 체크하기로 함
// 필요하면, IP / ID 로 DB 세션값 체크, 속도 이슈 생기면 DB를 REDIS로 구성
var makeSessionKey = function (req, user) {
	var sDate = new Date();

	req.session.loginkey =
		user.ipaddr + "_" + user.userid + "_" + sDate.toString();
	req.session.save();
	console.log("session loginkey: " + req.session.loginkey);
};

module.exports.checkLogin = checkLogin;
