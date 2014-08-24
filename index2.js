  if (typeof require !== 'undefined') {
    var moment = require('moment');
  }else{
    var moment = this.moment;
  }

  (function(moment){

  'use strict';

   var days = [
      'Primidi', 'Duodi', 'Tridi', 'Quartidi', 'Quintidi', 'Sextidi', 'Septidi', 'Octidi', 'Nonidi', 'Décadi',
      'Jour de la Vertu', 'Jour du Génie', 'Jour du Travail', 'Jour de l\'Opinion', 'Jour des Récompenses', 'Jour de la Révolution'
    ],
    months = [
      'Vendémiaire', 'Brumaire', 'Frimaire',
      'Nivôse', 'Pluviôse', 'Ventôse',
      'Germinal', 'Floréal', 'Prairial',
      'Messidor', 'Thermidor', 'Fructidor',
      'Sans-culottides'
    ];

  var dayOfMonth = {
    1: 122,
    2: 153,
    3: 181,
    4: 212,
    5: 242,
    6: 273,
    7: 303,
    8: 334,
    9: 365,
    10: 30,
    11: 61,
    12: 91
  };

  function trunc(x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
  }

  function repDnr2 (year, month, day, repYear, md, sj) {
    if(month === 9 && year === repYear + 1791){
      return day - md - 1;
    }else{
      return dayOfMonth[month] +
        sj * (month > 2 && month < 10 ? 1 : 0) +
        day - md - 1;
    }
  }

  function repDnr1 (year, month, day, repYear) {
    var md, sj;
    md = (function () {
      switch (year) {
        case 4: case 8: return 22;
        case 12: case 16: return 23;
        default:
          return 23 -
            Math.floor(( year - 1) / 100 ) +
            Math.floor(( year - 1) / 400 ) +
            Math.floor(( year - 209) / 100 ) -
            Math.floor(( year - 209) / 400 );
      }
    })();
    sj = (year % 4 === 0 ? 1 : 0) -
      ((year + 1792) % 100 === 0 ? 1 : 0) +
      ((year + 1792) % 400 === 0 ? 1 : 0);
    return repDnr2(year, month, day, repYear, md, sj);
  }

  function localRepYear (year, month, day) {
    var repYear, endOfYearDay;
    repYear = year - 1792;
    endOfYearDay = (function () {
      switch (year) {
        case 1792: case 1799: return 22;
        case 1803: case 1807: return 23;
        default:
            return 8 +
              Math.floor(year / 100) -
              Math.floor(year / 400) -
              Math.floor((year - 1972) / 100) -
              Math.floor((year - 1972) / 400);
      }
    })();
    if ( (month === 9 && day >= endOfYearDay) || month >= 10 ){
      repYear ++;
    }
    return repYear;
  }

  function localRepDayName (localRepDay) {
      return days[(localRepDay -1) % 10];
  }

  function localRepDay (year, month, day) {
    return (repDnr1(year, month, day, localRepYear) % 30) + 1 + 1; // + 1 ajouté
  }

  function localRepMonth (year, month, day){
    return trunc(repDnr1(year, month, day, localRepYear) / 30);
  }

  function toRevolutionnary (year, month, day){
    var repDay, repDayName, repMonth, repMonthName, repYear;
    repDay = localRepDay(year, month, day);
    repDayName = localRepDayName(repDay);
    repMonth = localRepMonth(year, month, day);
    repMonthName = months[repMonth];
    repYear = localRepYear(year, month, day);
    return [repDayName, repDay, repMonthName, repYear];
  }

  function _formatRevolutionnary (revolutionnaryDate) {
    return revolutionnaryDate[0] + ' ' + revolutionnaryDate[1] + ' ' + revolutionnaryDate[2] + ' ' + revolutionnaryDate[3];
  }

  moment.fn.toRevolutionnary = function () {
    var revolutionnaryDate = toRevolutionnary(this.year(), this.month() + 1, this.date());
    return _formatRevolutionnary(revolutionnaryDate);
  };

  moment.dateToRevolutionnary = function (date) {
    var revolutionnaryDate = toRevolutionnary(date.getFullYear(), date.getMonth() + 1, date.getDate());
    return _formatRevolutionnary(revolutionnaryDate);
  };


  if(typeof module !== 'undefined'){
    module.exports = moment;
  }else{
    window.moment = moment;
  }

})(moment);
