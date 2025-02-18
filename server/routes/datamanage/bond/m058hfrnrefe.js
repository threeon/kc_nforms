/*
 * 리포트 종목 연동 정보 관리
 *
 * @date 2023-10-27
 * @author ThreeOn
 */
const infoDb = require("../../common/asyncInfoDb");

let getItemList = async function (req, res) {
	console.log(
		"/api/datamanage/bond/m058hfrnrefe/getitemlist : /datamanage/m058hfrncsfw 안에 있는 getItemList 호출됨."
	);
	let jcode = "";

	jcode = req.query.jcode;

	let tstr = `SELECT *
    FROM DBSUPER.M058HFRNREFE
    WHERE F16013 = '${jcode}'
    `;

	// console.log(tstr);
	let result = await infoDb.run("xdb", tstr, 2);
	console.log(result);
	res.json({ success: true, results: result.resultList });
};

let excelUpload = async function (req, res) {
	console.log(
		"/api/datamanage/bond/m058hfrnrefe/excelupload : /datamanage/m058hfrncsfw 안에 있는 excelUpload 호출됨."
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
		"/api/datamanage/bond/m058hfrnrefe/excelupload : /datamanage/m058hfrncsfw 안에 있는 excelUpload 완료됨."
	);
};

// Altibase DBMS 는 insert Or update 가 안됨
const insertXdbOne = async function (dobj) {
	// dobj.F33965 = 2001;
	let tstr = `SELECT F16013
      FROM DBSUPER.M058HFRNREFE
      WHERE trim(F16013) = '${dobj.F16013}'
      `;

	// console.log("-------------------------------------------------");
	// console.log("insertXdbOne Start......");
	// console.log("-------------------------------------------------");
	// console.log(tstr);
	let res = await infoDb.run("xdb", tstr, 1);
	console.log(res);
	// 값이 있고, 같으면 return, 없으면 UPDATE
	// 값이 없으면 INERT
	if (res.resultCode == "success" && res.resultList.length >= 1) {
		// DELETE
		tstr = `DELETE FROM DBSUPER.M058HFRNREFE
      WHERE trim(F16013) = '${dobj.F16013}'
      `;
    res = await infoDb.run("xdb", tstr, 1);
    console.log(res);
    if (res.resultCode != "success") {
      console.log("[excelUpload] INFO DB FAIL : " + tstr, dobj);
      return;
    } else {
      // console.log("[excelUpload] INFO DB : " + tstr, res);
    }
  } 
  // INSERT
  tstr = `INSERT INTO DBSUPER.M058HFRNREFE (
    F16013, FRN_TYPE, REF_RATE_1, REF_RATE_2, REF_RATE_3,
	REF_RATE_4, REF_RATE_5, FRN_SPEC, LOOKBACK, ROUNDING,
	ROUNDING_RULE, FLOOR_RULE, FLOOR_RATE, HOL_LOC, RESET_TYPE,
	FIXED_YEAR
  ) VALUES ('${dobj.F16013}', '${dobj.FRN_TYPE}', '${dobj.REF_RATE_1}', '${dobj.REF_RATE_2}', '${dobj.REF_RATE_3}',
  '${dobj.REF_RATE_4}', '${dobj.REF_RATE_5}', '${dobj.FRN_SPEC}', '${dobj.LOOKBACK}', '${dobj.ROUNDING}',
  '${dobj.ROUNDING_RULE}', '${dobj.FLOOR_RULE}', '${dobj.FLOOR_RATE}', '${dobj.HOL_LOC}', '${dobj.RESET_TYPE}',
  '${dobj.FIXED_YEAR}'
  )`;

  res = await infoDb.run("xdb", tstr, 1);
	console.log(res);
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
