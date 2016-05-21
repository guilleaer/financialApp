window.GAL = window.GAL || {};
GAL.FinancialApp = GAL.FinancialApp || {};
GAL.FinancialApp.Utils = GAL.FinancialApp.Utils || {};
GAL.FinancialApp.Utils.padNumber = function (n, p) {
    var s = n.toString();
    while (s.length < p) {
      s = '0' + s;
    }
    return s;
  };
GAL.FinancialApp.Utils.formatDateISO = function (d) {
  if (typeof (d) === "string") {
    var date = new Date(d);
    if (date.toISOString() === d) {
      d = date;
    } else {
      OB.error("The argument must be a date or an iso string");
      return;
    }
  }
  var curr_date = d.getDate();
  var curr_month = d.getMonth();
  var curr_year = d.getFullYear();
  var curr_hour = d.getHours();
  var curr_min = d.getMinutes();
  var curr_sec = d.getSeconds();
  var curr_mill = d.getMilliseconds();

  return GAL.FinancialApp.Utils.padNumber(curr_year, 4) + '-' + GAL.FinancialApp.Utils.padNumber(curr_month + 1, 2) + '-' + GAL.FinancialApp.Utils.padNumber(curr_date, 2) + ' ' + GAL.FinancialApp.Utils.padNumber(curr_hour, 2) + ':' + GAL.FinancialApp.Utils.padNumber(curr_min, 2) + ':' + GAL.FinancialApp.Utils.padNumber(curr_sec, 2) + '.' + GAL.FinancialApp.Utils.padNumber(curr_mill, 3);
};
