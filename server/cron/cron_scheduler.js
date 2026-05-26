/**
 * CRON SCHEDULER
 * 
 * @date 2018-09-17
 * 
 * @author ThreeOn
 */

var cron_scheduler = {};

var cron = require('node-cron');
let mvTnGoodsList = require("./mvTnGoodsList");
let mvTnGoodsUserList = require("./mvTnGoodsUserList");



cron_scheduler.init = function(app) {
	console.log('cron_scheduler.init 호출됨.');
	return cronRegister(app);
};

// route_info에 정의된 라우팅 정보 처리
function cronRegister(app) {
	// cron 작업 등록
  /* 개인정보 문제로 취소됨
	cron.schedule('* * * * 1-5', function(){
		var nDate = new Date();
		console.log('mvTnGoodsList 작업 실행 : ' + nDate);
		// mvTnGoodsList.start(app);
	});
	cron.schedule('* * * * 1-5', function(){
		var nDate = new Date();
		console.log('mvTnGoodsUserList 작업 실행 : ' + nDate);
		mvTnGoodsUserList.start(app);
	});
  */
}

module.exports = cron_scheduler;

