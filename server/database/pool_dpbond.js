/*
 * 설정
 *
 * @date 2019-10-21
 * @author ThreeOn
 */
const mysql = require("mysql");
const config = require("./mysql_config");
const Promise = require("bluebird");
const util = require("util");
const ibatisMapper = require("mybatis-mapper");

Promise.promisifyAll(mysql);
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const DB_INFO = {
	host: config.DP_BOND.host,
	port: config.DP_BOND.port,
	user: config.DP_BOND.user,
	password: config.DP_BOND.password,
	database: config.DP_BOND.database,
	multipleStatements: true,
	connectionLimit: 25,
	waitForConnections: false,
	supportBigNumbers: true,
	bigNumberStrings: true,
};

module.exports = class {
	constructor(dbinfo) {
		dbinfo = dbinfo || DB_INFO;
		this.pool = mysql.createPool(dbinfo);
	}

	connect() {
		return this.pool.getConnectionAsync().disposer((conn) => {
			return conn.release();
		});
	}

	end() {
		this.pool.end(function (err) {});
	}

	getMapper(dirLevel) {
		let dirPrefix = "./";

		if (dirLevel == 1) dirPrefix = "../";
		else if (dirLevel == 2) dirPrefix = "../../";
		else if (dirLevel == 3) dirPrefix = "../../../";
		else dirPrefix = "./";
		//server/ 경로에서 불릴 때만 유효한 경로
		ibatisMapper.createMapper([
			// dirPrefix + "database/mysql/macromanager/bond.xml"
		]);

		return ibatisMapper;
	}

	getDbInfo() {
		return this.DB_INFO;
	}
};

module.exports.DB_INFO = DB_INFO;
