/*
 * 설정
 *
 * @date 2022-01-07
 * @author ThreeOn
 */
const mysql = require("mysql");
const config = require("./mysql_config");
const Promise = require("bluebird");
const ibatisMapper = require("mybatis-mapper");

Promise.promisifyAll(mysql);
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const DB_INFO = {
	...config.KC_ETP,
	multipleStatements: true,
	connectionLimit: 25,
	waitForConnections: false,
	supportBigNumbers: true,
	bigNumberStrings: true,
	dateStrings: "date",
};

module.exports = class {
	constructor(dbinfo) {
		dbinfo = dbinfo || DB_INFO;
		this.pool_dpmacromanager = mysql.createPool(dbinfo);
	}

	connect() {
		return this.pool_dpmacromanager.getConnectionAsync().disposer((conn) => {
			return conn.release();
		});
	}

	end() {
		this.pool_dpmacromanager.end(function (err) {
			console.log(">>>>>>>>>>>>>>>>>>>>>>> >>>>>>>>> End of Pool!!");
			if (err) console.log("ERR pool ending!!");
		});
	}

	getMapper(dirLevel) {
		let dirPrefix = "./";

		if (dirLevel == 1) dirPrefix = "../";
		else if (dirLevel == 2) dirPrefix = "../../";
		else if (dirLevel == 3) dirPrefix = "../../../";
		else dirPrefix = "./";

		//server/ 경로에서 불릴 때만 유효한 경로
		ibatisMapper.createMapper([dirPrefix + "database/mysql/etp/etfDiv.xml"]);
		ibatisMapper.createMapper([dirPrefix + "database/mysql/etp/etpCorrel.xml"]);

		return ibatisMapper;
	}
};
