/*
 * RIC
 *
 * @date 2023-10-27
 * @author ThreeOn
 */
const os = require("os");
const fs = require("fs");
const Promise = require("bluebird");
const async = require("async");
const config = require("../../config/config.js");
const mconfig = require("../../database/mysql_config");
const util = require("../../util/util.js");
const path = require("path");
const filename = '['+__dirname+'/'+path.basename(__filename)+'] ';

let makeCorrel = function (req, res) {
	console.log(
		"/etp/makeetpcorrel : /datamanage/etpCorrelFile 안에 있는 makeCorrel 호출됨."
	);
  let edate = req.query.edate;
  let sdate = Number(edate) - 10000;

  // console.log(filename);
  console.log("edate : " + edate);
  console.log("sdate : " + sdate);

  const pool = req.app.get("pool_kcetp");
  const mapper = req.app.get("mapper_kcetp");
  // let etpBasic = [];

  async.waterfall(
    [
      function (cb) {
        let stmt = mapper.getStatement(
          "etpCorrel",
          "getEtpCorrelBasic",
          {},
          mconfig.format
        );
        // console.log(stmt);
        Promise.using(pool.connect(), (conn) => {
          try {
            conn.query(stmt, function (err, rows) {
              // console.log(rows);
              if (!err) {
                // console.log(filename+"length : " + rows.length);
                cb(null, rows);
              } else {
                console.log("Error while performing Query.", err);
                cb(err);
              }
            });
          } catch (exception) {
            console.log("Error while performing Query.", exception);
            cb(err);
          }
        });
      },
      function (etpBasic, cb) {
        // console.log(filename+"startDate 2 : " + startDate);
        // console.log(filename+"func3...." + etpBasic.length);
        // console.log(filename+"sdate : " + sdate);
        processCorrel(req.app, etpBasic, sdate, edate, cb);
      },
    ],
    function (err) {
      if (err) {
        console.log("waterfall error............")
        console.log(err);
        res.json({ success: false});
        res.end();
      } else {
        console.log("Process Completed.....")        
        res.json({ success: true});
        res.end();
      }
    }
  );


};

async function processCorrel(app, etpBasic, sdate, edate, cb) {
	const pool = app.get("pool_kcetp");
	const mapper = app.get("mapper_kcetp");

	let forLength = etpBasic.length;
	let count = 0;
  let ostr = "";
	// inDate : 조회화면과 로직상 오류 있슴.
	// 일단, 강제로 수정
	let inDate = sdate;
	for (let i = 0; i < forLength; i++) {
		// console.log(filename+"processCorrel count : " + count + " / " + forLength + " code : " + etpBasic[i].F16012);
		// if(etpBasic[i].F16012 !== 'KR7069500007') continue;
    // if (i != 215) continue;

    let param = {
      F16012: etpBasic[i].F16012,
      sdate: sdate,
      edate: edate
    };
		// let param = {...code, ...sdates};
		// console.log(param);
		let stmt = mapper.getStatement(
			"etpCorrel",
			"getCorrelHist",
			param,
			mconfig.format
		);
		// console.log(filename+"processCorrel stmt : " + stmt);
		await Promise.using(pool.connect(), async (conn) => {
      try {
        // console.log("---------------------------------------------------1")
        // console.log(stmt);
				conn.query(stmt, function (err, rows) {
					// console.log(filename+"stmt : " + stmt);
          let tList1 = rows;
          // console.log("tList1 : " + tList1.length);
					// console.log(rows);
					if (!err) {
						let stmt1 = mapper.getStatement(
							"etpCorrel",
							"getCorrelBigoHist",
							param,
							mconfig.format
						);
						// console.log(filename+"processCorrel stmt1 : " + stmt1);
						conn.query(stmt1, function (err, rows) {
							let tList2 = rows;
              // console.log("tList2 : " + tList2.length);
							// console.log(rows);
							if (err) {
								console.log("Error while performing Query.", err);
							} else {
                let corr = getCorrelation(tList1, tList2, inDate);
                console.log("(" + i + "/" + forLength + ") : " + corr);
                // let tstr = util.padZero(corr * 100000, 6)
                // ostr += etpBasic[i].F16012 + tstr + os.EOL;
								updateCorrel(app, { F16012: etpBasic[i].F16012, edate: edate, CORREL: corr });
							}
						});
					} else {
						console.log("Error while performing Query2.", err);
						// cb(err);
					}
				});
			} catch (exception) {
				// cb(err);
				console.log("Error while performing Query1.", err);
			}
		});
		count = count + 1;
  }

  cb(null);
}

function getCorrelation(tList1, tList2, inDate) {

	let mList = [];
  // console.log("getCorrelation tList1 : " + tList1.length + " tList2 : " + tList2.length + " inDate : " + inDate);
  // console.log(tList1);
  // 데이터 갯수가 10 개 이하인 종목은 0 으로 처리
  console.log("1................")
  if (tList1 <= 10) return 0;
	for (let i = 0; i < tList1.length - 1; i++) {
		if (tList1[i].TRADE_DATE <= inDate) break;
		let tObj = Object.assign({}, tList1[i]);
		tObj.gubun = true;

		// 분배금 체크
		if (tObj.CASH_YN == "Y") {
			tObj.gubun = false;
		} else {
			tObj.CASH_YN = "";

			// 국내 주식형(비채권형)
			if (tObj.KOR_CHK == "01" && tObj.ASSET_CHK !== "02") {
				// 년말배당 체크
				if (tObj.YEAR_CASH == "Y") {
					tObj.gubun = false;
				}

				// 국내 채권형
			} else if (tObj.KOR_CHK == "01" && tObj.ASSET_CHK == "02") {
				if (tObj.EXP_YN == "Y") {
					tObj.gubun = false;
				}

				// 해외
			} else if (tObj.KOR_CHK !== "01") {
				if (tObj.EXP_YN == "Y") {
					tObj.gubun = false;
				}
			} else {
				console.log(
					"NOT modify=============================== : " + tObj.ETF_ISIN_CODE
				);
			}
		}

		let tRate = Number(
			Math.log(Number(tList1[i].LAST_NAV) / Number(tList1[i + 1].LAST_NAV)) *
				100.0
		);
		tObj.navRate = Number(tRate.toFixed(12));

		// console.log(filename+"type of : " + (typeof tObj.navRate));
		let indexRate = Number(
			Math.log(
				(Number(tList1[i].LAST_CLOSE) * Number(tList1[i].EX_RATE)) /
					(Number(tList1[i + 1].LAST_CLOSE) * Number(tList1[i + 1].EX_RATE))
			) *
				tList1[i].ETF_TRACE_YD_MULT *
				100.0
		);
		tObj.indexRate = Number(indexRate.toFixed(12));

		// 수작업 제외 추가
		for (let j = 0; j < tList2.length; j++) {
			if (tList1[i].TRADE_DATE == tList2[j].TRADE_DATE) {
				tObj.gubun = tList2[j].GUBUN == "Y";
			}
		}
		mList.push(tObj);
	}

  // console.log("mList.length : " + mList.length);
	let corList = mList.filter((item) => item.gubun == true);
	let arrX = getArrAttr(corList, "navRate");
	// console.log("arrX...............: " + arrX.length);
	// for(let k=0; k < arrX.length; k++) {
	//   console.log((k+1) + " : " + arrX[k]);
	// }

	let arrY = getArrAttr(corList, "indexRate");
	// console.log("arrY...............: " + arrY.length);
	// for(let k=0; k < arrY.length; k++) {
	//   console.log((k+1) + " : " + arrY[k]);
	// }

	let corr = 0;
	if (arrX.length == arrY.length) {
		corr = calcCorrelation(arrX, arrY);
	} else {
		console.log(
			"Nav 데이터 갯수 : " +
				arr1.length +
				" Index 데이터  갯수 : " +
				arr2.length +
				" 가 일치하지 않습니다."
		);
	}
	// console.log(filename+"corr : " + corr);
	return corr;
}

// inKey 의 배열 반환
function getArrAttr (tList, inKey) {
  let returnList = [];

  for (let i = 0; i < tList.length; i++) {
    returnList[i] = tList[i][inKey];
  }

  return returnList;
}

// 상관계수
function calcCorrelation(arrX, arrY) {
  let totcnt = arrX.length;
  let sumX = 0,
    sumX2 = 0,
    sumY = 0,
    sumY2 = 0,
    sumXY = 0;
  let eX = 0,
    eX2 = 0,
    eY = 0,
    eY2 = 0,
    eXY = 0;
  let tX = 0,
    tY = 0;
  for (let i = 0; i < arrX.length; i++) {
    tX = Number(arrX[i]);
    tY = Number(arrY[i]);
    // console.log("tX : " + tX + " tY : " + tY);
    sumX += tX;
    sumY += tY;
    sumXY += tX * tY;
    sumX2 += tX * tX;
    sumY2 += tY * tY;
  }
  eX = sumX / totcnt;
  eY = sumY / totcnt;
  eXY = sumXY / totcnt;
  eX2 = sumX2 / totcnt;
  eY2 = sumY2 / totcnt;

  // console.log("totcnt : " + totcnt);
  // console.log("eX : " + eX);
  // console.log("eY : " + eY);
  // console.log("eXY : " + eXY);
  // console.log("eX2 : " + eX2);
  // console.log("eY2 : " + eY2);

  // let rtn = ((eXY - eX*eY) / (Math.sqrt(eX2 - (eX * eX)) * Math.sqrt(eY2 - (eY * eY)))).toFixed(5)
  if (sumXY == 0) {
    // 주로 기초지수 오류임. (거래정지 등 되어 있슴)
    return 0;    
  } else {
    let rtn =
    Math.floor(
      ((eXY - eX * eY) /
        (Math.sqrt(eX2 - eX * eX) * Math.sqrt(eY2 - eY * eY))) *
        100000
    ) / 100000;
  // console.log("rtn : " + rtn);
    return rtn;
    
  }
}

function updateCorrel(app, param) {
	const pool = app.get("pool_kcetp");
	const mapper = app.get("mapper_kcetp");

	Promise.using(pool.connect(), async (conn) => {
		try {
			let stmt = mapper.getStatement(
				"etpCorrel",
				"updateEtpCorrelHist",
				param,
				mconfig.format
			);
			console.log("stmt : " + stmt);
			conn.query(stmt, function (err, rows) {
				if (err) {
					console.log("Error while performing Query.", err);
				}
			});
		} catch (exception) {
			// cb(err);
			console.log("Error while performing Query.", err);
		}
	});
}

let makeCorrelFile = function (req, res) {
  console.log(
    "/etp/makeetpcorrelfile : /datamanage/etpCorrelFile 안에 있는 makeCorrelFile 호출됨."
  );
  let edate = req.query.edate;

  // console.log(filename);
  console.log("edate : " + edate);

  const pool = req.app.get("pool_kcetp");
  const mapper = req.app.get("mapper_kcetp");
  let param = { edate: edate };

	Promise.using(pool.connect(), async (conn) => {
		try {
			let stmt = mapper.getStatement(
				"etpCorrel",
				"getEtpCorrelTotalHist",
				param,
				mconfig.format
			);
			console.log("stmt : " + stmt);
			conn.query(stmt, function (err, rows) {
				if (err) {
					console.log("Error while performing Query.", err);
          res.json({ success: false});
          res.end();
        } else {
          let ifname = "./logs/totcorrel." + edate;
          console.log("ifname : " + ifname);
          console.log("rows.length : " + rows.length);
          if (fs.existsSync(ifname)) {
            fs.unlinkSync(ifname);
            console.log(ifname);
          } else {
            // console.log(filename+"ifname1 : " + ifname + " not exist.");
          }

          let ostr = "";
          for (let i = 0; i < rows.length; i++) {
            let tstr = util.padZero(rows[i].CORREL * 100000, 6);
            ostr += rows[i].F16012 + tstr + os.EOL;
            // logger.info(ostr);
            // logger.debug("strlen : " + ostr.length);
          }
          fs.appendFileSync(ifname, ostr, "utf8");
          res.json({ success: true});
          res.end();
        }
			});
		} catch (exception) {
			console.log("Error while performing Query.", exception);
      res.json({ success: false});
      res.end();
    }
	});

}
module.exports.makeCorrel = makeCorrel;
module.exports.makeCorrelFile = makeCorrelFile;
