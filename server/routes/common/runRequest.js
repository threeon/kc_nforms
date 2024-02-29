/*
 * 정보DB-dpforms 연계
 *
 * @date 2023-03-29
 * @author ThreeOn, jwahn
 */
const request = require("request");
const { logger } = require("../../config/logger");
const config = require("../../config/config");

//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

let runRequest = function (req, res, mode) {
	logger.info("/common/runRequest 모듈 안에 있는 runRequest 호출됨.");

	let rpath = getMode(mode);
	let opts = {
		url: config.dpforms_url + rpath,
		method: "POST",
		form: req.body,
	};

	request.post(opts, function (error, response, body) {
		// console.log(error);
		// console.log(body);
		if (error) {
			res.json({ success: false, message: error });
		} else {
			let jdata = JSON.parse(body);
			// console.log(jdata);
			if (jdata.resultCode == "fail") {
				res.json({ success: false, message: jdata.resultCode });
			} else {
				//if (jdata.resultList.length == 0) {
				//	res.json({ success: false, message: "No Data...." });
				//} else {
				if (jdata.resultList.length > 0) {
					jsonKeyUpperCase(jdata.resultList);
					res.json({ success: true, results: jdata.resultList });
				} else {
					res.json({ success: true, results: [] });
				}
				//}
			}
		}
		res.end();
	});
};

let runRequestLang = function (req, res, mode) {
	logger.info("/common/runRequest 모듈 안에 있는 runRequestLang 호출됨.");

	let rpath = getMode(mode);
	let opts = {
		url: config.dpforms_url + rpath,
		method: "POST",
		form: req.body,
	};

	request.post(opts, function (error, response, body) {
		// console.log(error);
		// console.log(body);
		if (error) {
			res.json({ success: false, message: error });
		} else {
			let jdata = JSON.parse(body);
			// console.log(jdata);
			if (jdata.resultCode == "fail") {
				res.json({ success: false, message: jdata.resultCode });
			} else {
				if (jdata.resultList.length > 0) {
					res.json({ success: true, results: jdata.resultList });
				} else {
					res.json({ success: true, results: [] });
				}
			}
		}
		res.end();
	});
};

let runRequestJob = function (params) {
	logger.info("/common/runRequest 모듈 안에 있는 runRequestJob 호출됨.");

	let rpath = getMode(params.mode);
	let opts = {
		url: config.dpforms_url + rpath,
		method: "POST",
		form: params,
	};

	request.post(opts, function (error, response, body) {
		// console.log(error);
		// console.log(body);
		if (error) {
			console.log("[ERROR] runRequestJob 1");
			console.log(error);
		} else {
			let jdata = JSON.parse(body);
			// console.log(jdata);
			if (jdata.resultCode == "fail") {
				console.log("[ERROR] runRequestJob 2");
				console.log(jdata);
			} else {
				console.log("[GOOD] runRequestJob");
			}
		}
	});
};

let runRequestGeneral = function (params) {
	console.log("/common/runRequest 모듈 안에 있는 runRequestGeneral 호출됨.");
	//params: {
	//  mode: "hdb|hmdb|hcdb",
	//  tstr: "",
	//  lang: true|false|undefined,
	//}

	let rpath = getMode(params.mode);
	let opts = {
		url: config.dpforms_url + rpath,
		method: "POST",
		form: {
			sstr: params.stmt.split("").reverse().join(""), //VVV important!!
		},
	};

	// console.log("opts", opts);
	return new Promise(function (resolve, reject) {
		try {
			request.post(opts, function (error, response, body) {
				//console.log(error);
				// console.log(body.slice(0, 2000));
				if (error) {
					reject({ success: false, message: error.message });
				} else {
					let jdata = JSON.parse(body);
					if (jdata.resultCode == "fail") {
						//console.log(jdata);
						resolve({ success: false, message: jdata.resultCode });
					} else {
						//if (jdata.resultList.length == 0) {
						//  resolve({ success: false, message: "No Data...." });
						//} else {
						if (params.lang) jsonKeyUpperCase(jdata.resultList);
						resolve({ success: true, results: jdata.resultList });
						//}
					}
				}
			});
		} catch (error) {
			resolve({ success: false, message: error.message });
		}
	});
};

// dpforms 응답시 카멜케이스 적용됨. 원복. (ex: f16013 --> F16013)
// function jsonKeyUpperCase(object) {
let jsonKeyUpperCase = function (object) {
	if (Array.isArray(object)) {
		// 리스트<맵> 형식
		object.forEach((item, index) => {
			object[index] = Object.fromEntries(
				Object.entries(item).map(([key, value]) => [key.toUpperCase(), value])
			);
		});
		return object;
	} else {
		// 맵 형식
		return Object.fromEntries(
			Object.entries(object).map(([key, value]) => [key.toUpperCase(), value])
		);
	}
};

let getMode = function (mode) {
	let rpath = "";
	if (mode == "hdb") {
		rpath = "/bos/migration/listTotalHdb.json";
	} else if (mode == "hmdb") {
		rpath = "/bos/migration/listTotalHmdb.json";
	} else if (mode == "hcdb") {
		rpath = "/bos/migration/listTotalHcdb.json";
	} else {
		rpath = "/bos/migration/listTotalXdb.json";
	}

	return rpath;
};
module.exports.runRequest = runRequest;
module.exports.runRequestLang = runRequestLang;
module.exports.runRequestJob = runRequestJob;
module.exports.runRequestGeneral = runRequestGeneral;
module.exports.jsonKeyUpperCase = jsonKeyUpperCase;
