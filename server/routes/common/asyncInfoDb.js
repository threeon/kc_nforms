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

async function run(mode, tstr) {
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
		return res.data;
	} catch (error) {
		console.log("[asyncInfoDb] tstr : " + tstr, error);
		return { success: false, message: error };
	}
}

module.exports.run = run;
