/*
 * 리포트 종목 연동 정보 관리
 *
 * @date 2023-10-27
 * @author ThreeOn
 */
const infoDb = require("../../common/asyncInfoDb");

/*
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
*/

let excelUpload = async function (req, res) {
	console.log(
		"/api/datamanage/etffee/excelupload : /datamanage/etf/etffee 안에 있는 excelUpload 호출됨."
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
	let tstr = `SELECT TRADE_DATE, ISU_SRT_CD
      FROM DBSUPER.M001_SKSETFEXPNINFO
      WHERE TRADE_DATE = ${dobj.TRADE_DATE}
      AND trim(ISU_SRT_CD) = '${dobj.ISU_SRT_CD}'
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
		tstr = `UPDATE DBSUPER.M001_SKSETFEXPNINFO SET
          KOFIA_ISIN = '${dobj.KOFIA_ISIN}',
          OPR_FEE = '${dobj.OPR_FEE}',
          SALES_FEE = '${dobj.SALES_FEE}',
          ENTRUST_FEE = '${dobj.ENTRUST_FEE}',
          MANANGE_FEE = '${dobj.MANANGE_FEE}',
          SUM = '${dobj.SUM}',
          ETC_FEE = '${dobj.ETC_FEE}',
          TER = '${dobj.TER}',
          BROKERAGE_FEE = '${dobj.BROKERAGE_FEE}',
          TOTAL_FEE = '${dobj.TOTAL_FEE}'
        WHERE TRADE_DATE = '${dobj.TRADE_DATE}'
        AND ISU_SRT_CD = '${dobj.ISU_SRT_CD}'
      `;
	} else {
		// INSERT
		tstr = `INSERT INTO DBSUPER.M001_SKSETFEXPNINFO (
		  TRADE_DATE, ISU_SRT_CD, KOFIA_ISIN,
		  OPR_FEE, SALES_FEE, ENTRUST_FEE,
		  MANANGE_FEE, SUM, ETC_FEE,
		  TER, BROKERAGE_FEE, TOTAL_FEE
		  ) VALUES ('${dobj.TRADE_DATE}', '${dobj.ISU_SRT_CD}', '${dobj.KOFIA_ISIN}', 
			'${dobj.OPR_FEE}', '${dobj.SALES_FEE}', '${dobj.ENTRUST_FEE}',
			'${dobj.MANANGE_FEE}', '${dobj.SUM}', '${dobj.ETC_FEE}',
			'${dobj.TER}', '${dobj.BROKERAGE_FEE}', '${dobj.TOTAL_FEE}'
		))`;
	}
  // console.log(tstr);
  res = await infoDb.run("xdb", tstr, 1);
  // console.log(res);
  return res;
};

/*
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
*/

// module.exports.getItemList = getItemList;
// module.exports.updateItem = updateItem;
// module.exports.deleteItem = deleteItem;
module.exports.excelUpload = excelUpload;
