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
// 채권지수  
{ file: "./datamanage/bondindex", path: "/api/datamanage/bondindex/getitemlist", method: "getItemList", session: "uncheck", type: "get",},
  { file: "./datamanage/bondindex", path: "/api/datamanage/bondindex/excelupload", method: "excelUpload", session: "uncheck", type: "post",},
  { file: "./datamanage/bondindex", path: "/api/datamanage/bondindex/updateitem", method: "updateItem", session: "uncheck", type: "post", },
// 세계지수  
  { file: "./datamanage/worldindex", path: "/api/datamanage/worldindex/getitemlist", method: "getItemList", session: "uncheck", type: "get",},
  { file: "./datamanage/worldindex", path: "/api/datamanage/worldindex/updateitem", method: "updateItem", session: "uncheck", type: "post",},
  { file: "./datamanage/worldindex", path: "/api/datamanage/worldindex/deleteitem", method: "deleteItem", session: "uncheck", type: "post",},
  { file: "./datamanage/worldindex", path: "/api/datamanage/worldindex/excelupload", method: "excelUpload", session: "uncheck", type: "post", },
// DRAM EXCHAGE  
  { file: "./datamanage/semimaster", path: "/api/datamanage/semimaster/getitemlist", method: "getItemList", session: "uncheck", type: "get",},
  { file: "./datamanage/semimaster", path: "/api/datamanage/semimaster/updateitem", method: "updateItem", session: "uncheck", type: "post",},
  { file: "./datamanage/semimaster", path: "/api/datamanage/semimaster/deleteitem", method: "deleteItem", session: "uncheck", type: "post",},
  { file: "./datamanage/semimaster", path: "/api/datamanage/semimaster/excelupload", method: "excelUpload", session: "uncheck", type: "post",},
  { file: "./datamanage/semiindex", path: "/api/datamanage/semiindex/getitemlist", method: "getItemList", session: "uncheck", type: "get",},
  { file: "./datamanage/semiindex", path: "/api/datamanage/semiindex/updateitem", method: "updateItem", session: "uncheck", type: "post",},
  { file: "./datamanage/semiindex", path: "/api/datamanage/semiindex/deleteitem", method: "deleteItem", session: "uncheck", type: "post",},
  { file: "./datamanage/semiindex", path: "/api/datamanage/semiindex/excelupload", method: "excelUpload", session: "uncheck", type: "post",},
];
