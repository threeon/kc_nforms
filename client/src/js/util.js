/*
 * 설정
 */

module.exports = {
  getYearMonth: function () {
    var newDate = new Date();

    var year = newDate.getFullYear();
    var month = newDate.getMonth() + 1;
    if ((month + "").length < 2) month = "0" + month;
    return eval(year + month);
  },
  getYearMonth1: function () {
    var newDate = new Date();

    var year = newDate.getFullYear();
    var month = newDate.getMonth() + 2;
    if ((month + "").length < 2) month = "0" + month;
    return year + "-" + month;
  },
  getYearMonthList: function () {
    var rtnDates = [];

    var inDate = this.getYearMonth();

    rtnDates.push(inDate);

    return rtnDates;
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
  getTodayDate1: function () {
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
    return year + "-" + month + "-" + day;
  },
  getConvDate: function (inDate) {
    // console.log(inDate);
    return (
      inDate.substring(0, 4) + inDate.substring(5, 7) + inDate.substring(8, 10)
    );
  },
  getConvDate1: function (inDate) {
    // console.log(inDate);
    return (
      inDate.substring(0, 4) +
      "-" +
      inDate.substring(4, 6) +
      "-" +
      inDate.substring(6, 8)
    );
  },
  getToday: function () {
    var d = new Date();
    var myear = d.getFullYear();
    var mmonth = d.getMonth() + 1;
    var mday = d.getDate();
    if (mmonth < 10) mmonth = "0" + mmonth;
    if (mday < 10) mday = "0" + mday;
    return myear + "" + mmonth + "" + mday;
  },
  getBef1Week: function () {
    var d = new Date();
    var tdate = d.getTime() - 7 * 24 * 60 * 60 * 1000;
    var mdate = new Date();
    mdate.setTime(tdate);
    var myear = mdate.getFullYear();
    var mmonth = mdate.getMonth() + 1;
    var mday = mdate.getDate();
    if (mmonth < 10) mmonth = "0" + mmonth;
    if (mday < 10) mday = "0" + mday;
    return myear + "" + mmonth + "" + mday;
  },
  getBef1Month: function () {
    var mdate = new Date();
    mdate.setMonth(mdate.getMonth() - 1);
    var myear = mdate.getFullYear();
    var mmonth = mdate.getMonth() + 1;
    var mday = mdate.getDate();
    if (mmonth < 10) mmonth = "0" + mmonth;
    if (mday < 10) mday = "0" + mday;
    return myear + "" + mmonth + "" + mday;
  },
  getBefYears: function (byear) {
    return Number(this.getToday()) - 10000 * byear;
  },
  formatStringNum: function (num) {
    if (num != null) {
      return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return "";
    }
  },
};
