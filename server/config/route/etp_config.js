/*
 * 설정
 *
 * @date 2024-02-08
 * @author ThreeOn
 */

module.exports = [
  // ETF
  { file: "./etp/etfDiv", path: "/etp/etfdivinfo", method: "getEtfDivInfo", session: "uncheck", type: "get", },
  { file: "./etp/etfDiv", path: "/etp/etffeeinfo", method: "getEtfFeeInfo", session: "uncheck", type: "get", },
  { file: "./etp/etfDiv", path: "/etp/etfctginfo", method: "getEtfCtgInfo", session: "uncheck", type: "get", },
  { file: "./etp/etfDiv", path: "/etp/etfbyctgcode", method: "getEtfByCtgCode", session: "uncheck", type: "get", },
  { file: "./etp/etpCorrelFile", path: "/etp/makeetpcorrel", method: "makeCorrel", session: "uncheck", type: "get", },
  { file: "./etp/etpCorrelFile", path: "/etp/makeetpcorrelfile", method: "makeCorrelFile", session: "uncheck", type: "get", },
  // 
];
