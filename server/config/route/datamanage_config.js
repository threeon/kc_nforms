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
// 세계지수  
  { file: "./datamanage/worldindex", path: "/api/datamanage/worldindex/getitemlist", method: "getItemList", session: "uncheck", type: "get",},
  { file: "./datamanage/worldindex", path: "/api/datamanage/worldindex/updateitem", method: "updateItem", session: "uncheck", type: "post",},
  { file: "./datamanage/worldindex", path: "/api/datamanage/worldindex/deleteitem", method: "deleteItem", session: "uncheck", type: "post",},
  { file: "./datamanage/worldindex", path: "/api/datamanage/worldindex/excelupload", method: "excelUpload", session: "uncheck", type: "post", },
// DATA MANAGE(채권)
  { file: "./datamanage/bond/bondindex", path: "/api/datamanage/bondindex/getitemlist", method: "getItemList", session: "uncheck", type: "get",},
  { file: "./datamanage/bond/bondindex", path: "/api/datamanage/bondindex/excelupload", method: "excelUpload", session: "uncheck", type: "post",},
  { file: "./datamanage/bond/bondindex", path: "/api/datamanage/bondindex/updateitem", method: "updateItem", session: "uncheck", type: "post", },
  { file: "./datamanage/bond/m058hadre", path: "/api/datamanage/bond/m058hadre/getitemlist", method: "getItemList", session: "uncheck", type: "get",},
  { file: "./datamanage/bond/m058hadre", path: "/api/datamanage/bond/m058hadre/excelupload", method: "excelUpload", session: "uncheck", type: "post",},
  { file: "./datamanage/bond/m058hadre_new", path: "/api/datamanage/bond/m058hadrenew/getitemlist", method: "getItemList", session: "uncheck", type: "get",},
  { file: "./datamanage/bond/m058hadre_new", path: "/api/datamanage/bond/m058hadrenew/excelupload", method: "excelUpload", session: "uncheck", type: "post",},
  { file: "./datamanage/bond/m058hfrnrefe", path: "/api/datamanage/bond/m058hfrnrefe/getitemlist", method: "getItemList", session: "uncheck", type: "get",},
  { file: "./datamanage/bond/m058hfrnrefe", path: "/api/datamanage/bond/m058hfrnrefe/excelupload", method: "excelUpload", session: "uncheck", type: "post",},
  { file: "./datamanage/bond/m058hfrncsfw", path: "/api/datamanage/bond/m058hfrncsfw/getitemlist", method: "getItemList", session: "uncheck", type: "get",},
  { file: "./datamanage/bond/m058hfrncsfw", path: "/api/datamanage/bond/m058hfrncsfw/deleteitemlist", method: "deleteItemList", session: "uncheck", type: "post",},
  { file: "./datamanage/bond/m058hfrncsfw", path: "/api/datamanage/bond/m058hfrncsfw/excelupload", method: "excelUpload", session: "uncheck", type: "post",},
// DATA MANAGE(ETF)
  { file: "./datamanage/etf/etffee", path: "/api/datamanage/etffee/excelupload", method: "excelUpload", session: "uncheck", type: "post",},
  { file: "./datamanage/etf/globaletfdesc", path: "/api/datamanage/globaletfdesc/getitemlist", method: "getItemList", session: "uncheck", type: "get",},
  { file: "./datamanage/etf/globaletfdesc", path: "/api/datamanage/globaletfdesc/updateitem", method: "updateItem", session: "uncheck", type: "post",},
  { file: "./datamanage/etf/globaletfdesc", path: "/api/datamanage/globaletfdesc/gettransitemlist", method: "getTransItemList", session: "uncheck", type: "get",},
  // { file: "./datamanage/etf/globaletfdesc", path: "/api/datamanage/globaletfdesc/excelupload", method: "excelUpload", session: "uncheck", type: "post",},
  { file: "./datamanage/etf/globaletfdesc", path: "/api/datamanage/globaletfdesc/translate", method: "translate", session: "uncheck", type: "post",},
// DRAM EXCHAGE  
  { file: "./datamanage/semi/semimaster", path: "/api/datamanage/semimaster/getitemlist", method: "getItemList", session: "uncheck", type: "get",},
  { file: "./datamanage/semi/semimaster", path: "/api/datamanage/semimaster/updateitem", method: "updateItem", session: "uncheck", type: "post",},
  { file: "./datamanage/semi/semimaster", path: "/api/datamanage/semimaster/deleteitem", method: "deleteItem", session: "uncheck", type: "post",},
  { file: "./datamanage/semi/semimaster", path: "/api/datamanage/semimaster/excelupload", method: "excelUpload", session: "uncheck", type: "post",},
  { file: "./datamanage/semi/semiin", path: "/api/datamanage/semiin/getitemlist", method: "getItemList", session: "uncheck", type: "get",},
  { file: "./datamanage/semi/semiin", path: "/api/datamanage/semiin/updateitem", method: "updateItem", session: "uncheck", type: "post",},
  { file: "./datamanage/semi/semiin", path: "/api/datamanage/semiin/deleteitem", method: "deleteItem", session: "uncheck", type: "post",},
  { file: "./datamanage/semi/semiin", path: "/api/datamanage/semiin/excelupload", method: "excelUpload", session: "uncheck", type: "post",},
  { file: "./datamanage/semi/semiindex", path: "/api/datamanage/semiindex/getitemlist", method: "getItemList", session: "uncheck", type: "get",},
  { file: "./datamanage/semi/semiindex", path: "/api/datamanage/semiindex/updateitem", method: "updateItem", session: "uncheck", type: "post",},
  { file: "./datamanage/semi/semiindex", path: "/api/datamanage/semiindex/deleteitem", method: "deleteItem", session: "uncheck", type: "post",},
  { file: "./datamanage/semi/semiindex", path: "/api/datamanage/semiindex/excelupload", method: "excelUpload", session: "uncheck", type: "post",},
];
