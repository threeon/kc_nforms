/*
 * 설정
 *
 * @date 2018-08-31
 * @author ThreeOn
 */

module.exports = [
  // MIGRATION
  { file: "./migration/m054udate", path: "/api/migration/m054udate/getData", method: "getData", session: "uncheck", type: "get",},
  { file: "./migration/m054udate", path: "/api/migration/m054udate/doMigration", method: "doMigration", session: "uncheck", type: "post", },
];
