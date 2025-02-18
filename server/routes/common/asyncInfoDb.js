/*
 * 정보 DB SQL
 *
 * @date 2024-03-26
 * @author ThreeOn
 */
const axios = require("axios");
const querystring = require("querystring");
const config = require("../../config/config");
const { logger } = require("../../config/config");

async function run(mode, tstr, ctype) {
	// logger.debug("/common/asyncInfoDb 모듈 안에 있는 runRequestNormal 호출됨.");

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
	let opts = {
		url: config.dpforms_url + rpath,
		method: "POST",
		form: { sstr: tstr.split("").reverse().join("") },
	};

	try {
		const res = await axios.post(opts.url, querystring.stringify(opts.form));
		// console.log(res.data);
    if (ctype == 1) {
      // 카멜
    } else if (ctype == 2) {
      // 카멜 --> snake
      jsonKeySnakeCase(res.data.resultList);
    } else {
      // 카멜 --> 모두 대문자
      jsonKeyUpperCase(res.data.resultList);
    }

		return res.data;
	} catch (error) {
		console.log("[asyncInfoDb] tstr : " + tstr, error);
		return { success: false, message: error };
	}
}

// dpforms 응답시 카멜케이스 적용됨. 모두 대문자(ex: f16013 --> F16013)
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

// 카멜케이스 문자열 --> 스네이크 문자열 변경
let jsonKeySnakeCase = function (object) {
	if (Array.isArray(object)) {
		// 리스트<맵> 형식
		object.forEach((item, index) => {
			object[index] = Object.fromEntries(
				Object.entries(item).map(([key, value]) => [camelToSnake(key), value])
			);
		});
		return object;
	} else {
		// 맵 형식
		return Object.fromEntries(
			Object.entries(object).map(([key, value]) => [camelToSnake(key), value])
		);
	}
};

let camelToSnake = function (tstr) {
	let tstr1 = tstr.replace(/([A-Z])/g, function (match) {
		return "_" + match.toUpperCase();
	});

	let tstr2 = tstr1.replace(/([a-z])/g, function (match) {
		return match.toUpperCase();
	});

	return tstr2;
};

module.exports.run = run;
