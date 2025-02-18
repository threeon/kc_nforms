/*
 * 리포트 종목 연동 정보 관리
 *
 * @date 2023-10-27
 * @author ThreeOn
 */
const infoDb = require("../../common/asyncInfoDb");

let getItemList = async function (req, res) {
	console.log(
		"/api/datamanage/semimaster/getitemlist : /datamanage/semimaster 안에 있는 getItemList 호출됨."
	);
	let tstr = `SELECT TRIM(F16013) AS F16013, 
    F16002, F16288, F16542
    FROM DBSUPER.M203HREFE
    WHERE F16288 = 'SEM'
    ORDER BY F16542 ASC, F16013 DESC
    `;

	// console.log(tstr);
	let result = await infoDb.run("xdb", tstr, 1);
	// console.log(result);
	res.json({ success: true, results: result.resultList });
};

let excelUpload = async function (req, res) {
	console.log(
		"/api/datamanage/semimaster/excelupload : /datamanage/semimaster 안에 있는 excelUpload 호출됨."
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
		"/api/datamanage/semimaster/excelupload : /datamanage/semimaster 안에 있는 excelUpload 완료됨."
	);
};

// Altibase DBMS 는 insert Or update 가 안됨
const insertXdbOne = async function (dobj) {
	let tstr = `SELECT F16013
      FROM DBSUPER.M203HREFE
      WHERE F16013 = '${dobj.F16013}'
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
		tstr = `UPDATE DBSUPER.M203HREFE SET
          F16288 = '${dobj.F16288}',
          F16542 = '${dobj.F16542}',
          F16002 = '${dobj.F16002}',
          F16003 = '${dobj.F16002}',
          F16004 = '${dobj.F16002}',
          F16005 = '${dobj.F16002}'
        WHERE F16013 = '${dobj.F16013}'
      `;
	} else {
		// INSERT
		tstr = `INSERT INTO DBSUPER.M203HREFE (
      F16013, F16288, F16542,
      F16002, F16003, F16004, F16005
    ) VALUES ('${dobj.F16013}', '${dobj.F16288}', '${dobj.F16542}',
    '${dobj.F16002}', '${dobj.F16002}', '${dobj.F16002}', '${dobj.F16002}'
    )`;
  }
  // console.log(tstr);
  res = await infoDb.run("xdb", tstr, 1);
  // console.log(res);
  return res;
};

let updateItem = async function (req, res) {
	console.log(
		"/api/datamanage/semimaster/updateitem : /datamanage/semimaster 안에 있는 updateItem 호출됨."
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
		"/api/datamanage/semimaster/deleteitem : /datamanage/semimaster 안에 있는 deleteItem 호출됨."
	);

	let dobj = req.body;
	// console.log(dobj);

	let tstr = `DELETE
    FROM DBSUPER.M203HREFE
    WHERE F16013 = '${dobj.F16013}'
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
