/*
 * ETP REGISTER 위한 라우팅 함수 정의
 *
 * @date 2019-02-08
 * @author ThreeOn
 */
var Promise = require("bluebird");
const config = require('../../database/mysql_config');

var getMemberList = function(req, res) {
  console.log('member 모듈 안에 있는 checkLogin 호출됨.');

  var pool = req.app.get("pool");
  var mapper = req.app.get("mapper");
  var stmt = mapper.getStatement('member', 'selectAdminList', {}, config.format);
  // console.log(stmt);
  
  Promise.using(pool.connect(), conn => {
    try {
      conn.query(stmt, function(err, rows) {
        if (!err){
          if(rows.length > 0) {
            // console.log('The solution is: ', rows);
            res.json({ success: true, results: rows });
            res.end();
          }else {
            var msg = 'No Member!!';
            // console.log(msg);
            res.json({ success: false, message: msg });
            res.end();
          }
        }else{
          console.log('Error while performing Query.', err);
          res.json({ success: false, message: err });
          res.end();
        }        
      });
    } catch (expetion) {
      console.log('Error while performing Query.', err);
      res.json({ success: false, message: err });
      res.end();
    }
  });
};

var insertMember = function(req, res) {
  console.log('member 모듈 안에 있는 newMemberRegister 호출됨.');

  var pool = req.app.get("pool");
  var mapper = req.app.get("mapper");
  var paramData = req.body;

  var stmt = mapper.getStatement('member', 'insertMember', paramData, config.format);
  console.log(stmt);
  
  Promise.using(pool.connect(), conn => {
    try {
      conn.query(stmt, function(err, rows) {
        if (!err){
            // console.log('The solution is: ', rows);
            res.json({ success: true });
            res.end();
        }else{
          console.log('Error while performing Query.', err);
          res.json({ success: false, message: err });
          res.end();
        }        
      });
    } catch (expetion) {
      console.log('Error while performing Query.', err);
      res.json({ success: false, message: err });
      res.end();
    }
  });
};

var updateMember = function(req, res) {
  console.log('member 모듈 안에 있는 updateMember 호출됨.');

  var pool = req.app.get("pool");
  var mapper = req.app.get("mapper");
  var paramData = req.body;

  var stmt = mapper.getStatement('member', 'updateMember', paramData, config.format);
  console.log(stmt);
  
  Promise.using(pool.connect(), conn => {
    try {
      conn.query(stmt, function(err, rows) {
        if (!err){
          // console.log('The solution is: ', rows);
          res.json({ success: true });
          res.end();
        }else{
          console.log('Error while performing Query.', err);
          res.json({ success: false, message: err });
          res.end();
        }        
      });
    } catch (expetion) {
      console.log('Error while performing Query.', err);
      res.json({ success: false, message: err });
      res.end();
    }
  });
};

var deleteMember = function(req, res) {
  console.log('member 모듈 안에 있는 deleteMember 호출됨.');

  var pool = req.app.get("pool");
  var mapper = req.app.get("mapper");
  var paramData = req.body;

  var stmt = mapper.getStatement('member', 'deleteMember', paramData, config.format);
  console.log(stmt);
  
  Promise.using(pool.connect(), conn => {
    try {
      conn.query(stmt, function(err, rows) {
        if (!err){
            // console.log('The solution is: ', rows);
            res.json({ success: true });
            res.end();
        }else{
          console.log('Error while performing Query.', err);
          res.json({ success: false, message: err });
          res.end();
        }        
      });
    } catch (expetion) {
      console.log('Error while performing Query.', err);
      res.json({ success: false, message: err });
      res.end();
    }
  });
};

module.exports.getMemberList = getMemberList;
module.exports.insertMember = insertMember;
module.exports.updateMember = updateMember;
module.exports.deleteMember = deleteMember;
