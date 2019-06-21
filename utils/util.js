function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
/**
 * 日期格式化：
 * formatStr：可选，格式字符串，默认格式：yyyy-MM-dd hh:mm:ss
 * 约定如下格式：
 * （1）YYYY/yyyy/YY/yy 表示年份
 * （2）MM/M 月份
 * （3）W/w 星期
 * （4）dd/DD/d/D 日期
 * （5）hh/HH/h/H 时间
 * （6）mm/m 分钟
 * （7）ss/SS/s/S 秒
 * （8）iii 毫秒
 */
Date.prototype.format = function (formatStr) {
  var str = formatStr;
  if (!formatStr) {
    str = "yyyy-MM-dd hh:mm:ss";//默认格式
  }
  var Week = ['日', '一', '二', '三', '四', '五', '六'];

  str = str.replace(/yyyy|YYYY/, this.getFullYear());
  str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

  str = str.replace(/MM/, this.getMonth() >= 9 ? (parseInt(this.getMonth()) + 1).toString() : '0' + (parseInt(this.getMonth()) + 1));
  str = str.replace(/M/g, (parseInt(this.getMonth()) + 1));

  str = str.replace(/w|W/g, Week[this.getDay()]);

  str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
  str = str.replace(/d|D/g, this.getDate());

  str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
  str = str.replace(/h|H/g, this.getHours());
  str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
  str = str.replace(/m/g, this.getMinutes());

  str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
  str = str.replace(/s|S/g, this.getSeconds());

  str = str.replace(/iii/g, this.getMilliseconds() < 10 ? '00' + this.getMilliseconds() : (this.getMilliseconds() < 100 ? '0' + this.getMilliseconds() : this.getMilliseconds()));

  return str;
}
//案例
  Date.prototype.format = function(format) {
    var o = {
      "M+": this.getMonth() + 1,                   //month 
      "d+": this.getDate(),                      //day 
      "h+": this.getHours(),                     //hour 
      "m+": this.getMinutes(),                   //minute 
      "s+": this.getSeconds(),                   //second 
      "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter 
      "S": this.getMilliseconds()               //millisecond 
    }

    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1,
          RegExp.$1.length == 1 ? o[k] : ("00" +
            o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  }