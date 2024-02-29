/*
 * ETF 배당정보 / 총보수요율
 *
 * @date 2024-02-29
 * @author ThreeOn
 */
let Promise = require("bluebird");
const config = require("../../database/mysql_config");
const normalTrans = require("routes/common/normalTrans");
// const util = require("../../util/util");

let getEtfDivInfo = function (req, res) {
	console.log("/etp/etfDiv 모듈 안에 있는 getEtfDivInfo 호출됨.");

	let param = { dbms: "kcetp", mapper: "etfDiv", mapid: "selectEtfDiv" };
	normalTrans.runGetQuery(req, res, param);
};

let getEtfFeeInfo = function (req, res) {
	console.log("/etp/etfDiv 모듈 안에 있는 getEtfFeeInfo 호출됨.");

	let param = { dbms: "kcetp", mapper: "etfDiv", mapid: "selectEtfFee" };
	normalTrans.runGetQuery(req, res, param);
};

let getEtfCtgInfo = function (req, res) {
	console.log("/etp/etfDiv 모듈 안에 있는 getEtfCtgInfo 호출됨.");

	let param = { dbms: "kcetp", mapper: "etfDiv", mapid: "selectEtfCtg" };
	normalTrans.runGetQuery(req, res, param);
};

let getEtfByCtgCode = function (req, res) {
	console.log("/etp/etfDiv 모듈 안에 있는 getEtfByCtgCode 호출됨.");

	let param = { dbms: "kcetp", mapper: "etfDiv", mapid: "selectEtfByCtgCode" };
	normalTrans.runGetQuery(req, res, param);
};
module.exports.getEtfDivInfo = getEtfDivInfo;
module.exports.getEtfFeeInfo = getEtfFeeInfo;
module.exports.getEtfCtgInfo = getEtfCtgInfo;
module.exports.getEtfByCtgCode = getEtfByCtgCode;
