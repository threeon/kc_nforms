/*
 * 리포트 종목 연동 정보 관리
 *
 * @date 2023-10-27
 * @author ThreeOn
 */
const infoDb = require("../../common/asyncInfoDb");
const request = require('request');
const nodeUtil = require('util');
const requestPromise = nodeUtil.promisify(request);

let getItemList = async function (req, res) {
	console.log(
		"/api/datamanage/globaletfdesc/getitemlist : /datamanage/etf/globaletfdesc 안에 있는 getItemList 호출됨."
	);

  let sseq = req.query.sseq;
  let eseq = req.query.eseq;
  let scode = req.query.scode;
  
	let tstr = `SELECT * FROM (SELECT A.*, B.SIMPLE_CODE, ROWNUM AS RN
    FROM DBSUPER.M169UMSOPER_INVSTRG A, DBSUPER.M169UMSOPER B
    WHERE A.MSTARID = B.MSTARID
    AND B.SIMPLE_CODE LIKE '%${scode}%'
    ORDER BY B.SIMPLE_CODE)
    WHERE RN BETWEEN ${sseq} AND ${eseq}
    `;

	// console.log(tstr);
	let result = await infoDb.run("hdb", tstr, 2);
	console.log(result);
	res.json({ success: true, results: result.resultList });
	console.log("/datamanage/etf/globaletfdesc 안에 있는 getItemList 완료됨");
};

// Altibase DBMS 는 insert Or update 가 안됨
const updateXdbOne = async function (dobj) {
  tstr = `UPDATE DBSUPER.M169UMSOPER_INVSTRG SET
    INVSTRG_KOR = '${dobj.INVSTRG_KOR}'
      WHERE MSTARID = '${dobj.MSTARID}'
    `;
  // console.log(tstr);
	let result = await infoDb.run("hdb", tstr, 2);
  // console.log(res);
  return result;
};

let updateItem = async function (req, res) {
	console.log(
		"/api/datamanage/globaletfdesc/updateitem : /datamanage/etf/globaletfdesc 안에 있는 updateItem 호출됨."
	);

	let dobj = req.body;
	// console.log(dobj);
  let result = await updateXdbOne(dobj);
	if (result.resultCode != "success") {
		// console.log("[updateItem] INFO DB : ", dobj);
		res.json({ success: false, message: "UPDATE 실패했습니다." });
	} else {
		// console.log("[updateItem] INFO DB FAIL : " + tstr, dobj);
		res.json({ success: true, results: [] });
	}
};

let getTransItemList = async function (req, res) {
	console.log(
		"/api/datamanage/globaletfdesc/gettransitemlist : /datamanage/etf/globaletfdesc 안에 있는 getTransItemList 호출됨."
	);

	let tstr = `SELECT MSTARID, REPLACE(AA.INVSTRG, '''', '') AS INVSTRG, 
          REPLACE(AA.INVSTRG_ENG, '''', '') AS INVSTRG_ENG,
          REPLACE(AA.INVSTRG_KOR, '''', '') AS INVSTRG_KOR
          FROM (
            SELECT A.MSTARID, A.INVSTRG, B.INVSTRG_ENG, B.INVSTRG_KOR
            FROM (
                SELECT MSTARID, INVSTRG 
                FROM DBSUPER.M169UMSOPER
                WHERE LENGTH(INVSTRG) > 10
                ) A
            LEFT OUTER JOIN M169UMSOPER_INVSTRG B
            ON A.MSTARID = B.MSTARID) AA
          WHERE (REPLACE(AA.INVSTRG, '''', '') <> NVL(REPLACE(AA.INVSTRG_ENG, '''', ''), 'X')) 
          OR AA.INVSTRG_KOR IS NULL
    `;

	// console.log(tstr);
	let result = await infoDb.run("hdb", tstr, 2);
	// console.log(result);
	res.json({ success: true, results: result.resultList });
	console.log(
		"/datamanage/etf/globaletfdesc 안에 있는 getItemList 완료됨"
	);
};

let translate = async function (req, res) {
	console.log(
		"/api/datamanage/globaletfdesc/translate : /datamanage/etf/globaletfdesc 안에 있는 translate 호출됨."
	);

	let param = req.body;
	// console.log(param);
	for (let i = 0; i < param.itemList.length; i++) {
		let tobj = param.itemList[i];
		// if (i % 100 == 0) {
		// 	console.log(` ${i} / ${param.itemList.length}`);
		// }
    // 네이버 클라우드 PAPAGO 번역 API
    let pres = JSON.parse(await papagoTrans(tobj.INVSTRG));
    // console.log("papago end.....");
    // console.log(pres);
    
    if (pres.message != undefined) {
      tobj.INVSTRG_KOR = pres.message.result.translatedText;
      tobj.INVSTRG_ENG = tobj.INVSTRG;
      // console.log(tobj)
      let res = await insertXdbOne(tobj);
      console.log(res);
    }
		// if (i == 0) break;
	}
	// console.log(param);
	res.json({ success: true, results: [] });
	console.log(
		"/api/datamanage/globaletfdesc/excelupload : /datamanage/etf/globaletfdesc 안에 있는 translate 완료됨."
	);
}

/*
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
let excelUpload = async function (req, res) {
	console.log(
		"/api/datamanage/globaletfdesc/excelupload : /datamanage/etf/globaletfdesc 안에 있는 excelUpload 호출됨."
	);

	let param = req.body;
	// console.log(param);
	for (let i = 0; i < param.itemList.length; i++) {
		let tobj = param.itemList[i];
		if (i % 200 == 0) {
			console.log(` ${i} / ${param.itemList.length}`);
		}
    console.log(tobj)
		// let res = await insertXdbOne(tobj);
    // 네이버 클라우드 번역 API
    await papagoTrans(tobj.INVSTRG)
		if (i == 2) break;
	}
	// console.log(param);
	res.json({ success: true, results: [] });
	console.log(
		"/api/datamanage/globaletfdesc/excelupload : /datamanage/etf/globaletfdesc 안에 있는 excelUpload 완료됨."
	);
};
*/


// Altibase DBMS 는 insert Or update 가 안됨
const insertXdbOne = async function (dobj) {
	let tstr = `SELECT MSTARID
      FROM DBSUPER.M169UMSOPER_INVSTRG
      WHERE MSTARID = '${dobj.MSTARID}'
      `;

	// console.log("-------------------------------------------------");
	// console.log("insertXdbOne Start......");
	// console.log("-------------------------------------------------");
	// console.log(tstr);
	let res = await infoDb.run("hdb", tstr, 2);
	// console.log(res);
	// 값이 있고, 같으면 return, 없으면 UPDATE
	// 값이 없으면 INERT
	if (res.resultCode == "success" && res.resultList.length >= 1) {
		// UPDATE
		tstr = `UPDATE DBSUPER.M169UMSOPER_INVSTRG SET
          INVSTRG_ENG = '${dobj.INVSTRG}',
          INVSTRG_KOR = '${dobj.INVSTRG_KOR}'
        WHERE MSTARID = '${dobj.MSTARID}'
      `;
	} else {
		// INSERT
		tstr = `INSERT INTO DBSUPER.M169UMSOPER_INVSTRG (
		  MSTARID, INVSTRG_ENG, INVSTRG_KOR)
      VALUES ('${dobj.MSTARID}', '${dobj.INVSTRG}', '${dobj.INVSTRG_KOR}'
		)`;
	}

  // console.log(tstr);
  res = await infoDb.run("hdb", tstr, 2);
  if (res.resultCode != "success") {
    console.log(tstr);
  }
  return res;
};

let papagoTrans = async function (iText) {
  // console.log('papago test........');
  // SSL 인증 무시
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  let client_id = 'wxk3shsgfn';
  let client_secret = '9wDX1qHibdOqRH1MHF3lS0dCy5yRbdBuumLQr4jt';
  let query = iText;
  let api_url = 'https://papago.apigw-pub.fin-ntruss.com/nmt/v1/translation';
  let options = {
      method: 'POST',
      url: api_url,
      form: {'source':'en', 'target':'ko', 'text':query},
      headers: {
        'X-NCP-APIGW-API-KEY-ID': client_id,
        'X-NCP-APIGW-API-KEY': client_secret,
        'Content-Type':"application/json"
      }
  };
  try {
    const response = await requestPromise(options);
    // console.log(response.body);
    return response.body;
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
};

module.exports.getItemList = getItemList;
module.exports.getTransItemList = getTransItemList;
module.exports.updateItem = updateItem;
// module.exports.deleteItem = deleteItem;
// module.exports.excelUpload = excelUpload;
module.exports.translate = translate;
