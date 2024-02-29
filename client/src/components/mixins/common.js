export default {
  methods: {
    formatInt: function(num) {
      if(num != null && typeof num !== 'undefined') {
        if(isNaN(num)) {
          return "0"
        } else {
          num = Number(num).toFixed(0);
          return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      } else {
        return "0"
      }
    },
    formatDigit: function(num, digit) {
      if(num != null && typeof num !== 'undefined') {
        if(isNaN(num)) {
          return "0.00000"
        } else {
          num = Number(num).toFixed(digit);
          var numAry = [];
          if(num.toString().indexOf('.')>=0) {
            numAry = num.toString().split('.');
            return numAry[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + numAry[1];
          }
          return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      } else {
        return "0.00"
      }
    },
    //formatNumber: function(num) {
    //  if(num != null && typeof num !== 'undefined') {
    //    if(isNaN(num)) {
    //      return "0.00"
    //    } else {
    //      num = Number(num).toFixed(2);
    //      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //    }
    //  } else {
    //    return "0.00"
    //  }
    //},
    formatNumber: function(num, fixed) {
      fixed = fixed || 2;
      if(num != null && typeof num !== 'undefined') {
        if(isNaN(num)) {
          var defaultVal = '0.';
          for(var i=0; i<fixed; i++) defaultVal += '0';
          //return "0.00"
          return defaultVal;
        } else {
          num = Number(num).toFixed(fixed);
          return num.toString().replace(/\B(?=(\d{3})+(?!\d))\./g, ",");
        }
      } else {
        return "0.00"
      }
    },
    truncateDecimal: function(num) {
      //return (num > 0)?Math.floor(num):Math.ceil(num);
      return Math.round(num)
    },
    formatDate: function(dateStr, sepStr) {
      const separator = (sepStr)? sepStr : "/";
      if (dateStr.length == 8) {
        return dateStr.substring(0, 4) + separator + dateStr.substring(4, 6) + separator + dateStr.substring(6, 8);
      } else if (dateStr.length == 6) {
        return dateStr.substring(0, 2) + separator + dateStr.substring(2, 4) + separator + dateStr.substring(4, 6);
      } else if (dateStr.length == 4) {
        return dateStr.substring(0, 2) + separator + dateStr.substring(2, 4);
      } else {
        return dateStr;
      }
    },
    formatDate2: function(dateStr, sepStr) {
      const separator = (sepStr)? sepStr : "/";
      if (dateStr.length == 8) {
        return "'" + dateStr.substring(2, 4) + separator + dateStr.substring(4, 6);
      } else {
        return dateStr;
      }
    },
    formatDate3: function(dateStr) {
      let formatStr = "";
  
      if (dateStr) {
        // IOS에서는 '2020.12.12 10:00:00'으로 Date 생성 시 오류
        // => '2020.12.12T10:00:00+09:00' 으로 우리나라 시간에 맞춰줌.
        const localTimeStr = dateStr.split(" ")[0] + "T" + dateStr.split(" ")[1] + "+09:00";

        const nowTime = new Date();
        const dateTime = new Date(localTimeStr);
        const nowMinutes = nowTime.getTime() / 1000 / 60;
        const dateMinutes = dateTime.getTime() / 1000 / 60;
        const diffMinutes = (nowMinutes < dateMinutes)? 0 : nowMinutes - dateMinutes;

        if (diffMinutes < 1440) {
          if (diffMinutes / 60 < 1) {
            const diffStr = this.formatInt(diffMinutes);
            //formatStr = diffStr + ((Number(diffStr) <= 1)? " minute" : " minutes") + " ago";
            formatStr = diffStr + "m";
          } else {
            const diffStr = this.formatInt(diffMinutes / 60);
            //formatStr = diffStr + ((Number(diffStr) <= 1)? " hour" : " hours") + " ago";
            formatStr = diffStr + "h";
          }
        } else {
          const month = dateTime.getMonth() + 1;
          const date = dateTime.getDate();
          const hours = dateTime.getHours();
          const minutes = dateTime.getMinutes();
          formatStr = ((month < 10)? "0" + month : month) + "." + ((date < 10)? "0" + date : date)
                       + " " + ((hours < 10)? "0" + hours : hours) + ":" + ((minutes < 10)? "0" + minutes : minutes);
        }
      }
  
      return formatStr;
    },
    formatDate4: function(dateStr) {
      let formatStr = "";

      if (dateStr && dateStr != "") {
        const date = dateStr.split(" ")[0];
        const time = dateStr.split(" ")[1];
        const dateArray = date.split("-");

        formatStr = time.substring(0, 5) + " " + dateArray[1] + "/" + dateArray[2];
      }

      return formatStr;
    },
    formatDate5: function(date) {
      return date.toISOString().slice(0,10);
    },
    formatDate6: function(date) {
      return date.toISOString().slice(0,10).replace(/-/gi, '');
    },
    formatDate7: function(dateStr) {
      if (dateStr.length == 8) {
        return dateStr.substring(4, 6) + "월" + dateStr.substring(6, 8) + "일";
      } else if (dateStr.length == 4) {
        return dateStr.substring(0, 2) + "월" + dateStr.substring(2, 4) + "일";
      } else {
        return dateStr;
      }
    },
    getMonday() {
      var d = new Date();
      var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
      var result = new Date(d.setDate(diff));
      //console.log("getMonday", result, this.formatDate5(result));
      return this.formatDate6(result);
    },
    formatTime: function(timeStr) {
      if (timeStr.length == 4) {
        return timeStr.substring(0, 2) + ":" + timeStr.substring(2, 4);
      } else if (timeStr.length == 3) {
        return "0" + timeStr.substring(0, 1) + ":" + timeStr.substring(1, 3);
      } else {
        return timeStr;
      }
    },
    formatTime2: function(timeStr) {
      if (timeStr.length == 4) {
        const timeNum = Number(timeStr);

        if (timeNum < 1200) {
          return timeStr.substring(0, 2) + ":" + timeStr.substring(2, 4) + " AM";
        } else if (timeNum >= 1200 && timeNum < 1300) {
          return timeStr.substring(0, 2) + ":" + timeStr.substring(2, 4) + " PM";
        } else {
          return ((timeNum - 1200 < 1000)? '0' + timeNum.toString().substring(0, 1) : timeNum.toString().substring(0, 2)) + ":" 
            + timeStr.substring(2, 4) + " PM";
        }
      } else {
        return timeStr;
      }
    },
    getBef1Year: function() {
      var mdate = new Date();
      mdate.setFullYear(mdate.getFullYear() - 1);
      var myear = mdate.getFullYear();
      var mmonth = mdate.getMonth() + 1;
      var mday = mdate.getDate();
      if(mmonth < 10) mmonth = "0" + mmonth;
      if(mday < 10) mday = "0" + mday;
      return myear + "" + mmonth + "" + mday;
    },
    getBefWeek: function(strDate, weekCount) {
      var d = (strDate)? new Date(strDate.substring(0,4), Number(strDate.substring(4,6)) -1, strDate.substring(6, 8)) : new Date();
      var tdate = d.getTime() - weekCount * (7 * 24 * 60 * 60 * 1000);
      var mdate = new Date();
      mdate.setTime(tdate);
      var myear = mdate.getFullYear();
      var mmonth = mdate.getMonth() + 1;
      var mday = mdate.getDate();
      if(mmonth < 10) mmonth = "0" + mmonth;
      if(mday < 10) mday = "0" + mday;
      return myear + "" + mmonth + "" + mday;
    },
    calcMedian: function(array) {
      if (array && array.length > 0) {
        const data = array.sort();
        if (data.length % 2 == 0) {
          return (Number(data[data.length / 2]) + Number(data[data.length / 2 - 1])) / 2;
        } else {
          return data[Math.floor(data.length / 2)];
        }
      }

      return null;
    },
    getBefMonth: function(date, before) {
      date.setMonth(date.getMonth() - before);
      return date;
    }
  }
}