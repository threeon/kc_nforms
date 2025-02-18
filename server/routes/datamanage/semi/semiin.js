/*
 * 리포트 종목 연동 정보 관리
 *
 * @date 2023-10-27
 * @author ThreeOn
 */
const infoDb = require("../../common/asyncInfoDb");

let getItemList = async function (req, res) {
	console.log(
		"/api/datamanage/semiin/getitemlist : /datamanage/semiin 안에 있는 getItemList 호출됨."
	);
	let sdate = "";
	let edate = "";
	let jcode = "";
	let jstr = "";

	sdate = req.query.sdate;
	edate = req.query.edate;
	jcode = req.query.jcode;

	if (jcode.length > 0) jstr = `AND F16013 = '${jcode}' `;

	let tstr = `SELECT F12506, TRIM(F16013) AS F16013,
    F15009, F15010, F15011, F15001, F15015,
    F15472, F15004, F15006, INPUT_DATE
    FROM DBSUPER.M203UBASEDIN
    WHERE F12506 >= ${sdate}
    AND F12506 <= ${edate} ${jstr}
    ORDER BY F12506 DESC
    LIMIT 3000
    `;

	// console.log(tstr);
	let result = await infoDb.run("xdb", tstr, 1);
	// console.log(result);
	res.json({ success: true, results: result.resultList });
};

let excelUpload = async function (req, res) {
	console.log(
		"/api/datamanage/semiin/excelupload : /datamanage/semiin 안에 있는 excelUpload 호출됨."
	);

	let param = req.body;
	// console.log(param);
	for (let i = 0; i < param.itemList.length; i++) {
		let tobj = param.itemList[i];
		let res = await insertXdbOne(tobj);

		if (i % 200 == 0) {
			console.log(` ${i} / ${param.itemList.length}`);
		}
		// if (i == 2) break;
	}
	// console.log(param);
	res.json({ success: true, results: [] });
	console.log(
		"/api/datamanage/semiin/excelupload : /datamanage/semiin 안에 있는 excelUpload 완료됨."
	);
};

// Altibase DBMS 는 insert Or update 가 안됨
const insertXdbOne = async function (dobj) {
	let tstr = `SELECT F12506, F16013
      FROM DBSUPER.M203UBASEDIN
      WHERE F12506 = ${dobj.F12506}
      AND trim(F16013) = '${dobj.F16013}'
      `;

	// console.log("-------------------------------------------------");
	// console.log("insertXdbOne Start......");
	// console.log("-------------------------------------------------");
	// console.log(tstr);
	let res = await infoDb.run("xdb", tstr, 1);
	// console.log(res);
	// 값이 있고, 같으면 return, 없으면 UPDATE
	// 값이 없으면 INERT
	if (res.resultCode == "success" && res.resultList.length >= 1) {
		// UPDATE
		tstr = `UPDATE DBSUPER.M203UBASEDIN SET
          F15009 = ${dobj.F15009},
          F15010 = ${dobj.F15010},
          F15011 = ${dobj.F15011},
          F15001 = ${dobj.F15001},
          F15015 = ${dobj.F15015},
          F15472 = ${dobj.F15472},
          F15004 = ${dobj.F15004},
          F15006 = ${dobj.F15006},
          INPUT_DATE = TO_CHAR(SYSDATE, 'YYYYMMDD')
        WHERE F12506 = ${dobj.F12506}
        AND F16013 = '${dobj.F16013}'
      `;
	} else {
		// INSERT
		tstr = `INSERT INTO DBSUPER.M203UBASEDIN (
      F12506, F16013,
      F15009, F15010, F15011, F15001, F15015,
      F15472, F15004, F15006,
      MID, MARKET, TYPE, INPUT_DATE
    ) VALUES ('${dobj.F12506}', '${dobj.F16013}',
    '${dobj.F15009}', '${dobj.F15010}', '${dobj.F15011}', '${dobj.F15001}','${dobj.F15015}', 
    '${dobj.F15472}', '${dobj.F15004}', '${dobj.F15006}',
    203, 'SEM', 1, TO_CHAR(SYSDATE, 'YYYYMMDD')
    )`;
  }
  console.log(tstr);
  res = await infoDb.run("xdb", tstr, 1);
  console.log(res);
  return res;
};

let updateItem = async function (req, res) {
	console.log(
		"/api/datamanage/semiin/updateitem : /datamanage/semiin 안에 있는 updateItem 호출됨."
	);

	let dobj = req.body;
	// console.log(dobj);
  let result = await insertXdbOne(dobj);
	if (result.resultCode != "success") {
		console.log("[updateItem] INFO DB : ", dobj);
		res.json({ success: false, message: "UPDATE 실패했습니다." });
	} else {
		// console.log("[updateItem] INFO DB FAIL : " + tstr, dobj);
		res.json({ success: true, results: [] });
	}
};

let deleteItem = async function (req, res) {
	console.log(
		"/api/datamanage/semiin/deleteitem : /datamanage/semiin 안에 있는 deleteItem 호출됨."
	);

	let dobj = req.body;
	// console.log(dobj);

	let tstr = `DELETE
    FROM DBSUPER.M203UBASEDIN
    WHERE F12506 = '${dobj.F12506}'
    AND F16013 = '${dobj.F16013}'
  `;

  let result = await infoDb.run("xdb", tstr, 1);
  // console.log(result);
  
	if (result.resultCode != "success") {
		console.log("[deleteItem] INFO DB : ", dobj);
		res.json({ success: false, message: "DELETE 실패했습니다." });
	} else {
		// console.log("[deleteItem] INFO DB FAIL : " + tstr, dobj);
		res.json({ success: true, results: [] });
	}
};

module.exports.getItemList = getItemList;
module.exports.updateItem = updateItem;
module.exports.deleteItem = deleteItem;
module.exports.excelUpload = excelUpload;
