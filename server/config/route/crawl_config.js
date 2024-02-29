/*
 * 설정
 *
 * @date 2024-02-08
 * @author ThreeOn
 */

module.exports = [
  // 관세청
  { file: "./crawl/kcsExi", path: "/crawl/postkcs/exi", method: "postKcsExi", session: "uncheck", type: "post", },
  { file: "./crawl/kcsExc", path: "/crawl/postkcs/exc", method: "postKcsExc", session: "uncheck", type: "post", },
  { file: "./crawl/kcsImi", path: "/crawl/postkcs/imi", method: "postKcsImi", session: "uncheck", type: "post", },
  { file: "./crawl/kcsImc", path: "/crawl/postkcs/imc", method: "postKcsImc", session: "uncheck", type: "post", },
  { file: "./crawl/kcsTrbal", path: "/crawl/postkcs/trbal", method: "postKcsTrbal", session: "uncheck", type: "post", },
  // 
];
