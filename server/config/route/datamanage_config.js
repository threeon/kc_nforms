/*
 * 설정
 *
 * @date 2018-08-31
 * @author ThreeOn
 */

module.exports = [
  // DATA MANAGE
  { file: "./datamanage/ric", path: "/api/datamanage/getricchange", method: "getRicChange", session: "uncheck", type: "get",},
  { file: "./datamanage/reportcode", path: "/api/datamanage/getreportcode", method: "getReportCode", session: "uncheck", type: "get",},
  { file: "./datamanage/reportcode", path: "/api/datamanage/operreportcode", method: "operReportCode", session: "uncheck", type: "oper",},
];
