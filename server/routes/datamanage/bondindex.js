/*
 * 리포트 종목 연동 정보 관리
 *
 * @date 2023-10-27
 * @author ThreeOn
 */
const infoDb = require("../common/asyncInfoDb");

let getItemList = async function (req, res) {
	console.log(
		"/api/datamanage/bondidx/getitemlist : /datamanage/bondindex 안에 있는 getItemList 호출됨."
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
    F30792, F30791, F30925, F30646, F30927,
    F16188, F30797, F30798, F30799, F30923
    FROM DBSUPER.M045UBASEIN 
    WHERE F12506 >= '${sdate}'
    AND F12506 <= '${edate}' ${jstr}
    ORDER BY F12506 DESC
    `;

	// console.log(tstr);
	let result = await infoDb.run("xdb", tstr);
	// console.log(result);
	res.json({ success: true, results: result.resultList });
};

let excelUpload = async function (req, res) {
	console.log(
		"/api/datamanage/bondindex/excelupload : /datamanage/bondindex 안에 있는 excelUpload 호출됨."
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
		"/api/datamanage/bondindex/excelupload : /datamanage/bondindex 안에 있는 excelUpload 완료됨."
	);
};

// Altibase DBMS 는 insert Or update 가 안됨
const insertXdbOne = async function (dobj) {
	// dobj.F33965 = 2001;
	let tstr = `SELECT F12506, F16013
      FROM DBSUPER.M045UBASEIN
      WHERE F12506 = ${dobj.F12506}
      AND trim(F16013) = '${dobj.F16013}'
      `;

	// console.log("-------------------------------------------------");
	// console.log("insertXdbOne Start......");
	// console.log("-------------------------------------------------");
	// console.log(tstr);
	let res = await infoDb.run("xdb", tstr);
	// console.log(res);
	// 값이 있고, 같으면 return, 없으면 UPDATE
	// 값이 없으면 INERT
	if (res.resultCode == "success" && res.resultList.length >= 1) {
		// UPDATE
		tstr = `UPDATE DBSUPER.M045UBASEIN SET
          F30792 = '${dobj.F30792}'
          ,F30791 = '${dobj.F30791}'
          ,F30925 = '${dobj.F30925}'
          ,F30646 = '${dobj.F30646}'
          ,F30927 = '${dobj.F30927}'
          ,F16188 = '${dobj.F16188}'
          ,F30797 = '${dobj.F30797}'
          ,F30798 = '${dobj.F30798}'
          ,F30799 = '${dobj.F30799}'
          ,F30923 = '${dobj.F30923}'
        WHERE F12506 = '${dobj.F12506}'
        AND F16013 = '${dobj.F16013}'
      `;
	} else {
		// INSERT
		tstr = `INSERT INTO DBSUPER.M045UBASEIN (
      F12506, F16013, 
      F30792, F30791, F30925, F30646, F30927,
      F16188, F30797, F30798, F30799, F30923
    ) VALUES ('${dobj.F12506}', '${dobj.F16013}', 
    '${dobj.F30792}', '${dobj.F30791}', '${dobj.F30925}', '${dobj.F30646}', '${dobj.F30927}',
    '${dobj.F16188}', '${dobj.F30797}', '${dobj.F30798}', '${dobj.F30799}', '${dobj.F30923}'
    )`;
	}
	res = await infoDb.run("xdb", tstr);
	if (res.resultCode != "success") {
		console.log("[excelUpload] INFO DB FAIL : " + tstr, dobj);
	} else {
		// console.log("[excelUpload] INFO DB : " + tstr, res);
	}
};

let updateItem = async function (req, res) {
	console.log(
		"/api/datamanage/bondindex/updateitem : /datamanage/bondindex 안에 있는 updateItem 호출됨."
	);

	let tstr = "";
	let dobj = req.body;
	// console.log(dobj);
	tstr = `UPDATE DBSUPER.M045UBASEIN SET
      F30792 = '${dobj.F30792}'
      ,F30791 = '${dobj.F30791}'
      ,F30925 = '${dobj.F30925}'
      ,F30646 = '${dobj.F30646}'
      ,F30927 = '${dobj.F30927}'
      ,F16188 = '${dobj.F16188}'
      ,F30797 = '${dobj.F30797}'
      ,F30798 = '${dobj.F30798}'
      ,F30799 = '${dobj.F30799}'
      ,F30923 = '${dobj.F30923}'
    WHERE F12506 = '${dobj.F12506}'
    AND F16013 = '${dobj.F16013}'
  `;
	let result = await infoDb.run("xdb", tstr);
	if (result.resultCode != "success") {
		console.log("[updateItem] INFO DB : " + tstr, dobj);
		res.json({ success: false, message: "UPDATE 실패했습니다." });
	} else {
		// console.log("[updateItem] INFO DB FAIL : " + tstr, dobj);
		res.json({ success: true, results: [] });
	}
};

module.exports.getItemList = getItemList;
module.exports.excelUpload = excelUpload;
module.exports.updateItem = updateItem;
