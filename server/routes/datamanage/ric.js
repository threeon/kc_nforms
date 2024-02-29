/*
 * RIC
 *
 * @date 2023-10-27
 * @author ThreeOn
 */
const runRequest = require("routes/common/runRequest");

let getRicChange = function (req, res) {
	console.log(
		"/api/datamanage/getricchange : /datamanage/ric 안에 있는 getricchange 호출됨."
	);
	let sdate = "";
	let edate = "";

	sdate = req.query.sdate;
	edate = req.query.edate;

	let tstr = `SELECT 'US' NATIONCODE, *
    FROM M194URICREPORT
    WHERE MAIN_TYPE = 'RENM'
    AND RIC NOT LIKE '%\\_%' ESCAPE '\\'
    AND OLD_VALUE NOT LIKE '%\\_%' ESCAPE '\\'
    AND RECODE_DATE >= '${sdate}'
    AND RECODE_DATE <= '${edate}'
    ORDER BY RECODE_DATE DESC
    `;

	// console.log(req.query);
	console.log(tstr);
	req.body.sstr = tstr.split("").reverse().join("");
	runRequest.runRequest(req, res, "xdb");
};

module.exports.getRicChange = getRicChange;
