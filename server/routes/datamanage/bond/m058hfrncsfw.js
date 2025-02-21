/*
 * 리포트 종목 연동 정보 관리
 *
 * @date 2023-10-27
 * @author ThreeOn
 */
const infoDb = require("../../common/asyncInfoDb");

let getItemList = async function (req, res) {
	console.log(
		"/api/datamanage/bond/m058hfrncsfw/getitemlist : /datamanage/m058hfrncsfw 안에 있는 getItemList 호출됨."
	);
	let jcode = "";

	jcode = req.query.jcode;

	let tstr = `SELECT *
    FROM DBSUPER.M058HFRNCSFW 
    WHERE F16013 = '${jcode}'
    ORDER BY INT_DIV DESC, PAYMENT_DATE ASC
    `;

	// console.log(tstr);
	let result = await infoDb.run("xdb", tstr, 2);
	// console.log(result);
	res.json({ success: true, results: result.resultList });
};

let excelUpload = async function (req, res) {
	console.log(
		"/api/datamanage/bond/m058hfrncsfw/excelupload : /datamanage/m058hfrncsfw 안에 있는 excelUpload 호출됨."
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
		"/api/datamanage/bond/m058hfrncsfw/excelupload : /datamanage/m058hfrncsfw 안에 있는 excelUpload 완료됨."
	);
};

// Altibase DBMS 는 insert Or update 가 안됨
const insertXdbOne = async function (dobj) {
	// dobj.F33965 = 2001;
	let tstr = `SELECT F16013, INT_DIV, PAYMENT_DATE
      FROM DBSUPER.M058HFRNCSFW
      WHERE trim(F16013) = '${dobj.F16013}'
      AND INT_DIV = '${dobj.INT_DIV}'
      AND PAYMENT_DATE = '${dobj.PAYMENT_DATE}'
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
		// DELETE
		tstr = `DELETE FROM DBSUPER.M058HFRNCSFW
      WHERE trim(F16013) = '${dobj.F16013}'
      AND INT_DIV = '${dobj.INT_DIV}'
      AND PAYMENT_DATE = '${dobj.PAYMENT_DATE}'
      `;
    res = await infoDb.run("xdb", tstr, 1);
    // console.log(res);
    if (res.resultCode != "success") {
      console.log("[excelUpload] INFO DB FAIL : " + tstr, dobj);
      return;
    } else {
      // console.log("[excelUpload] INFO DB : " + tstr, res);
    }
  } 
  // INSERT
  tstr = `INSERT INTO DBSUPER.M058HFRNCSFW (
    F16013, INT_DIV, FIX_DIV, RESET_DATE, START_DATE,
	END_DATE, PAYMENT_DATE, OB_RATE, SPREAD, RATE,
	CF, REF_RATE_1, REF_RATE_2, F33867, F16455,
	F34648, F34649, F34650
  ) VALUES ('${dobj.F16013}', '${dobj.INT_DIV}', '${dobj.FIX_DIV}', '${dobj.RESET_DATE}', '${dobj.START_DATE}',
  '${dobj.END_DATE}', '${dobj.PAYMENT_DATE}', '${dobj.OB_RATE}', '${dobj.SPREAD}', '${dobj.RATE}',
  '${dobj.CF}', '${dobj.REF_RATE_1}', '${dobj.REF_RATE_2}', '${dobj.F33867}', '${dobj.F16455}',
  '${dobj.F34648}', '${dobj.F34649}', '${dobj.F34650}'
  )`;

  res = await infoDb.run("xdb", tstr, 1);
	// console.log(res);
	if (res.resultCode != "success") {
		console.log("[excelUpload] INFO DB FAIL : " + tstr, dobj);
	} else {
		// console.log("[excelUpload] INFO DB : " + tstr, res);
	}
};

/*
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
	let result = await infoDb.run("xdb", tstr, 1);
	if (result.resultCode != "success") {
		console.log("[updateItem] INFO DB : " + tstr, dobj);
		res.json({ success: false, message: "UPDATE 실패했습니다." });
	} else {
		// console.log("[updateItem] INFO DB FAIL : " + tstr, dobj);
		res.json({ success: true, results: [] });
	}
};
*/

module.exports.getItemList = getItemList;
module.exports.excelUpload = excelUpload;
// module.exports.updateItem = updateItem;
