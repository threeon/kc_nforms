/*
 * 설정
 */

module.exports = {
	getYearMonth: function () {
		var newDate = new Date();
		var year = newDate.getFullYear();
		var month = newDate.getMonth() + 1;
		if (month.length == 1) {
			month = "0" + month;
		}
		return eval(year + month);
	},

	getTodayDate: function () {
		var newDate = new Date();
		var year = newDate.getFullYear();
		var month = new String(newDate.getMonth() + 1);
		var day = new String(newDate.getDate());

		// 한자리수일 경우 0을 채워준다.
		if (month.length == 1) {
			month = "0" + month;
		}
		if (day.length == 1) {
			day = "0" + day;
		}
		return eval(year + month + day);
	},

	getAuthKey: function () {
		var tStr = "abcdefghijklmlopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		var min = 0;
		var max = tStr.length;
		var oStr = "";

		for (var i = 0; i < 32; i++) {
			var t = this.getRandomInt(min, max);
			// console.log("t : " + t);
			oStr += tStr.charAt(t);
		}

		return oStr;
	},

	getRandomInt: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  padZero: function (str, len) {
    var rtnStr = '';
    str = str + '';
    if (Number(str) < 0) {
      rtnStr = str.length >= len ? str : '-' + new Array(len - str.length + 1).join('0') + Math.abs(Number(str));
    } else {
      rtnStr = str.length >= len ? str : new Array(len - str.length + 1).join('0') + str;
    }
    return rtnStr;
  }
};
