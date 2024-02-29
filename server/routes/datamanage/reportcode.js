/*
 * 리포트 종목 연동 정보 관리
 *
 * @date 2023-10-27
 * @author ThreeOn
 */
const runRequest = require("routes/common/runRequest");

let getReportCode = function (req, res) {
	console.log(
		"/api/datamanage/getreportcode : /datamanage/reportcode 안에 있는 getReportCode 호출됨."
	);
	let sdate = "";
	let edate = "";

	sdate = req.query.sdate;
	edate = req.query.edate;

	let tstr = `SELECT A.DATE, A.TIME, A.CODE, A.TITLE, B.NCD
    FROM 
    ( SELECT * FROM NEWS_TITLE
      WHERE DATE >= '${sdate}'
      AND DATE <= '${edate}'
      AND MTVCD = 700
      AND TITLE NOT LIKE '%정보 입수%'
      AND TITLE NOT LIKE '%발표치%'
      AND TITLE NOT LIKE '%보고서 삭제%'
      AND TITLE NOT LIKE '%정보 삭제%'
      AND TITLE NOT LIKE '%한신정%'
      AND TITLE NOT LIKE '%한기평%'
      AND TITLE NOT LIKE '%한신평%'
      ) A
    LEFT OUTER JOIN 
    ( SELECT * 
      FROM NEWS_CODE
      WHERE DATE >= '${sdate}'
      AND DATE <= '${edate}'
    ) B
    ON A.DATE = B.DATE
    AND A.CODE = B.CODE
    ORDER BY A.DATE DESC, A.TIME DESC
    `;

	// console.log(req.query);
	// console.log(tstr);
	req.body.sstr = tstr.split("").reverse().join("");
	runRequest.runRequest(req, res, "hmdb");
};

let operReportCode = function (req, res) {
	console.log(
		"/api/datamanage/operreportcode : /datamanage/reportcode 안에 있는 operReportCode 호출됨."
	);

	let tstr = "";
	let param = req.body;
	// console.log(param);

	if (param.oper == "delete") {
		tstr = `DELETE FROM NEWS_CODE
      WHERE DATE = '${param.date}' AND CODE = '${param.code}'
    `;
	} else if (param.oper == "update") {
		tstr = `UPDATE NEWS_CODE SET NCD = '${param.ncd}'
      WHERE DATE = '${param.date}' AND CODE = '${param.code}'
    `;
	} else if (param.oper == "insert") {
		tstr = `INSERT INTO NEWS_CODE (DATE, CODE, NCD, SEQ)
      VALUES ('${param.date}', '${param.code}', '${param.ncd}', 1)
    `;
	} else {
		res.json({ success: false, message: "operation Error." });
		res.end();
		return;
	}
	// console.log(tstr);
	req.body.sstr = tstr.split("").reverse().join("");
	runRequest.runRequest(req, res, "hmdb");

	let params = { sstr: "", mode: "hmdb" };
	tstr = `INSERT INTO QUEUE_TABLE (SEQ, PK1, PK2, DATANM, ACTION, IDT)
    VALUES(QSEQ.NEXTVAL, '${param.date}', '${param.code}', 'NEWS', 'U', SYSDATE);
  `;
	params.sstr = tstr.split("").reverse().join("");

	console.log(tstr);
	runRequest.runRequestJob(params);
};

module.exports.getReportCode = getReportCode;
module.exports.operReportCode = operReportCode;
