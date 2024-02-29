/*
 * 설정
 *
 * @date 2018-08-31
 * @author ThreeOn
 */

module.exports = [
  // 로그인
  { file: "./admin/login", path: "/admin/login", method: "checkLogin", session: "uncheck", type: "post", },
  // TOOL 관리
  //{ file: "./admin/tool", path: "/tool/fomc/fomcFileUpload", method: "fomcFileUpload", session: "uncheck", type: "post", }, //route_config와 중복
  // 관리자 계정관리
  { file: "./admin/member", path: "/admin/getmemberlist", method: "getMemberList", session: "uncheck", type: "get", },
  { file: "./admin/member", path: "/admin/insertmember", method: "insertMember", session: "uncheck", type: "post", },
  { file: "./admin/member", path: "/admin/updatemember", method: "updateMember", session: "uncheck", type: "post", },
  { file: "./admin/member", path: "/admin/deletemember", method: "deleteMember", session: "uncheck", type: "post", },
];
