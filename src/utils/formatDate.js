/**
 * 获取上周、本周、上月、本月、上季度、本季度的开始日期、结束日期 start
 * 亲测无bug。获取上月开始结束日期考虑了年份的变化
 */
var now = new Date(); //当前日期
var nowDayOfWeek = now.getDay() - 1; //今天本周的第几天
var nowDay = now.getDate(); //当前日
var nowMonth = now.getMonth(); //当前月
var nowYear = now.getYear(); //当前年
nowYear += nowYear < 2000 ? 1900 : 0; //
var lastMonthDate = new Date(); //上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
var lastYear = lastMonthDate.getYear();
var lastMonth = lastMonthDate.getMonth();

var afterMonthDate = new Date(); //下月日期
afterMonthDate.setDate(1);
var afterMonth = afterMonthDate.getMonth() + 1;

//格式化日期：yyyy-MM-dd
export function formatDate(date) {
  var myyear = date.getFullYear();
  var mymonth = date.getMonth() + 1;
  var myweekday = date.getDate();
  if (mymonth < 10) {
    mymonth = "0" + mymonth;
  }
  if (myweekday < 10) {
    myweekday = "0" + myweekday;
  }
  return myyear + "-" + mymonth + "-" + myweekday;
}
export function getStartYear() {
  var getStartYear = new Date(nowYear - 1, nowMonth, nowDay - 1);
  return formatDate(getStartYear);
}
export function getEndYear(date) {
  var getEndYear = new Date(nowYear, nowMonth, nowDay - 1);
  return formatDate(getEndYear);
}

//获得某月的天数
export function getMonthDays(myMonth) {
  var monthStartDate = new Date(nowYear, myMonth, 1);
  var monthEndDate = new Date(nowYear, myMonth + 1, 1);
  var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  return days;
}
//获得本季度的开始月份
export function getQuarterStartMonth() {
  var quarterStartMonth = 0;
  if (nowMonth < 3) {
    quarterStartMonth = 0;
  }
  if (2 < nowMonth && nowMonth < 6) {
    quarterStartMonth = 3;
  }
  if (5 < nowMonth && nowMonth < 9) {
    quarterStartMonth = 6;
  }
  if (nowMonth > 8) {
    quarterStartMonth = 9;
  }
  return quarterStartMonth;
}

//获得本周的开始日期
export function getWeekStartDates() {
  var weekStartDate = new Date(nowYear, nowMonth, nowDay - 7);
  return formatDate(weekStartDate);
}
//获得本周的结束日期
export function getWeekEndDates() {
  // var weekEndDate = new Date(nowYear, nowMonth, nowDay - 1);
  var weekEndDate = new Date(nowYear, nowMonth, nowDay);
  return formatDate(weekEndDate);
}
//获得本周的开始日期
export function getWeekStartDate() {
  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
  return formatDate(weekStartDate);
}
//获得本周的结束日期
export function getWeekEndDate() {
  var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
  return formatDate(weekEndDate);
}
//获得本周的结束日期
export function getWeekEndDateFive() {
  var weekEndDate = new Date(nowYear, nowMonth, nowDay + (4 - nowDayOfWeek));
  return formatDate(weekEndDate);
}
//获得上周的开始日期
export function getBeforeWeekStartDate() {
  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
  return formatDate(weekStartDate);
}
//获得上周的结束日期
export function getBeforeWeekEndDate() {
  var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
  return formatDate(weekEndDate);
}
//获得下周的开始日期
export function getLastWeekStartDate() {
  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 7);
  return formatDate(weekStartDate);
}
//获得下周的结束日期
export function getLastWeekEndDate() {
  var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 13);
  return formatDate(weekEndDate);
}
//获得本月的开始日期
export function getMonthStartDate() {
  var monthStartDate = new Date(nowYear, nowMonth, 1);
  return formatDate(monthStartDate);
}
//获得本月的结束日期
export function getMonthEndDate() {
  var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
  return formatDate(monthEndDate);
}
//获得本月的开始日期
export function getMonthStartDateTwo() {
  var monthStartDate = new Date(nowYear, nowMonth, nowDay - 32);
  return formatDate(monthStartDate);
}
//获得本月的结束日期
export function getMonthEndDateTwo() {
  var monthEndDate = new Date(nowYear, nowMonth, nowDay - 1);
  return formatDate(monthEndDate);
}
//获得上月开始时间
export function getBeforeMonthStartDate() {
  var lastMonthStartDate;
  if (lastMonth == 11) {
    lastMonthStartDate = new Date(nowYear - 1, lastMonth, 1);
  } else {
    lastMonthStartDate = new Date(nowYear, lastMonth, 1);
  }
  return formatDate(lastMonthStartDate);
}
//获得上月结束时间
export function getBeforeMonthEndDate() {
  var lastMonthEndDate;
  if (lastMonth == 11) {
    lastMonthEndDate = new Date(
      nowYear - 1,
      lastMonth,
      getMonthDays(lastMonth)
    );
  } else {
    lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
  }
  return formatDate(lastMonthEndDate);
}
//获得下月开始时间
export function getLastMonthStartDate() {
  var afterMonthStartDate;
  afterMonthStartDate = new Date(nowYear, afterMonth, 1);
  // if (afterMonth == 11) {
  //   afterMonthStartDate = new Date(nowYear, afterMonth, 1);
  // } else {
  //   afterMonthStartDate = new Date(nowYear, afterMonth, 1);
  // }
  return formatDate(afterMonthStartDate);
}
//获得下月结束时间
export function getLastMonthEndDate() {
  var afterMonthEndDate;
  afterMonthEndDate = new Date(nowYear, afterMonth, getMonthDays(afterMonth));
  // if (afterMonth == 11) {
  //   afterMonthEndDate = new Date(nowYear, afterMonth, getMonthDays(afterMonth));
  // } else {
  //   afterMonthEndDate = new Date(nowYear, afterMonth, getMonthDays(afterMonth));
  // }
  return formatDate(afterMonthEndDate);
}
//获得本季度的开始日期
export function getQuarterStartDate() {
  var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
  return formatDate(quarterStartDate);
}
//获得本季度的结束日期
export function getQuarterEndDate() {
  var quarterEndMonth = getQuarterStartMonth() + 2;
  var quarterStartDate = new Date(
    nowYear,
    quarterEndMonth,
    getMonthDays(quarterEndMonth)
  );
  return formatDate(quarterStartDate);
}
//获得本季度的开始日期
export function getQuarterStartDateTwo() {
  var quarterEndMonth = getQuarterStartMonth() - 2;
  var quarterStartDate = new Date(nowYear, quarterEndMonth, nowDay - 1);
  return formatDate(quarterStartDate);
}
//获得本季度的结束日期
export function getQuarterEndDateTwo() {
  var quarterStartDate = new Date(nowYear, nowMonth, nowDay - 1);
  return formatDate(quarterStartDate);
}
/**
 * 多少天以后的时间
 * @param date 时间
 * @param num  多少天
 * @param type 类型 年 月 天(默认天)
 */
export function afterDate(date, num, type) {
  if (!date) return "";
  switch (typeof date) {
    case "string":
      date = new Date(date.replace(/-/g, "/"));
      break;
    case "number":
      date = new Date(date);
      break;
  }
  if (type == "年") {
    var newYear = date.getFullYear() + num;
    var newDate =
      newYear +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();
    return new Date(newDate.replace(/-/g, "/"));
  } else if (type == "月") {
    var nowyear = date.getFullYear(); //当前年
    var nowMonth = date.getMonth() + 1; //当前月
    // var mod = parseInt(num/12);
    // var month = (num+nowMonth)%12;
    var month = (num + nowMonth) % 12;
    var mod = parseInt((num + nowMonth) / 12);
    var year = nowyear + mod;
    var newDate =
      year +
      "-" +
      month +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();
    return new Date(newDate.replace(/-/g, "/"));
  } else {
    //type=='天'
    var ms = date.getTime();
    ms += num * 24 * 60 * 60 * 1000;
    return formatDate(new Date(ms));
  }
}
