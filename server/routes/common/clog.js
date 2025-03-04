/*
 * 정보 DB SQL
 *
 * @date 2024-03-26
 * @author ThreeOn
 */
function log(...args) {
  const tm = new Date().toLocaleString("ko-KR", { timeZoe: "Asia/Seoul"});
  console.log(`[${tm}]`, ...args);
};

module.exports.log = log;
