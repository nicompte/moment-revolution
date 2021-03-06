(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){

  'use strict';

  var revolution = require('./revolution'),
    moment = require('moment');

  var Revolution = function (moment) {
    var date = revolution(moment.year(), moment.month() + 1, moment.date());
    this.dayName = date.dayName;
    this.day = date.day;
    this.month = date.month;
    this.year = date.year;
  };

  Revolution.prototype.format = function(template){
    if(typeof template === 'undefined' || template === '') {
      template = this.format.default;
    }
    for(var token in this.format.tokens){
      template = template.replace(this.format.tokens[token], this[token]);
    }
    return template;

  };

  Revolution.prototype.format.default = 'ddd D M YYYY';

  Revolution.prototype.format.tokens = {
    day: /D/,
    dayName: /ddd/,
    month: /M/,
    year: /YYYY/
  };

  moment.fn.revolution  = function() {
    return new Revolution(this);
  };

  module.exports = moment;

})();

},{"./revolution":3,"moment":2}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
(function(){

  'use strict';

  var days = [
     'Décadi', 'Primidi', 'Duodi', 'Tridi', 'Quartidi', 'Quintidi', 'Sextidi', 'Septidi', 'Octidi', 'Nonidi',
     '', 'Jour de la Vertu', 'Jour du Génie', 'Jour du Travail', 'Jour de l\'Opinion', 'Jour des Récompenses', 'Jour de la Révolution'
   ],
   months = [
     'Vendémiaire', 'Brumaire', 'Frimaire',
     'Nivôse', 'Pluviôse', 'Ventôse',
     'Germinal', 'Floréal', 'Prairial',
     'Messidor', 'Thermidor', 'Fructidor',
     'Sans-culottides'
   ];

  var dayOfMonth = {
   1: 122, 2: 153, 3: 181,
   4: 212, 5: 242, 6: 273,
   7: 303, 8: 334, 9: 365,
   10: 30, 11: 61, 12: 91
  };

  /**
  * Polyfill for Math._trunc()
  */
  function _trunc(x) {
   return x < 0 ? Math.ceil(x) : Math.floor(x);
  }

  /**
  * Return the number of days elapsed in the Republican year
  */
  function _numberOfElapsedDays (year, month, day, repYear) {

   var md, sj, elapsedDays;

   md = _lastDayOfPreviousYear(repYear);
   sj = _isLeap(repYear);

   // First days of the republican year
   if(month === 9 && year === repYear + 1791){
     elapsedDays = day - md - 1;
   }else{
     elapsedDays = dayOfMonth[month] +
       sj * (month > 2 && month < 10 ? 1 : 0) +
       day - md - 1;
   }

   return elapsedDays;
  }


  /**
  * Return the last day of the previous day ?
  */
  function _lastDayOfPreviousYear (repYear) {

   return (function () { // Last day of the previous year ?
     switch (repYear) {
       case 4: case 8: return 22;
       case 12: case 16: return 23;
       default:
         return 23 -
           Math.floor(( repYear - 1) / 100 ) +
           Math.floor(( repYear - 1) / 400 ) +
           Math.floor(( repYear - 209) / 100 ) -
           Math.floor(( repYear - 209) / 400 );
     }
   })();

  }

  /**
  * Return 1 for a leap year, 0 for a normal year
  */
  function _isLeap (repYear) {

   return (repYear % 4 === 0 ? 1 : 0) - // Leap year ?
     ((repYear + 1792) % 100 === 0 ? 1 : 0) +
     ((repYear + 1792) % 400 === 0 ? 1 : 0);

  }

  /**
  * Calculate republican repYear
  */
  function _getRepYear (year, month, day) {
   var repYear, firstDayOfTheYear;
   repYear = year - 1792;
   firstDayOfTheYear = (function () {
     switch (year) {
       case 1792: case 1799: return 22;
       case 1803: case 1807: return 23;
       default:
           return 8 +
             Math.floor(year / 100) -
             Math.floor(year / 400) -
             Math.floor((year - 1972) / 100) +
             Math.floor((year - 1972) / 400);
     }
   })();
   // If we are beyond the first day of the year => next year
   if ( (month === 9 && day >= firstDayOfTheYear) || month >= 10 ){
     repYear ++;
   }
   return repYear;
  }

  function _getRepDayName (repDay, repMonth) {
   var lastMonth;
   lastMonth = repMonth === 12 ? 10 : 0;
   return days[(repDay  % 10) + lastMonth];
  }

  function _getRepDay (year, month, day, elapsedDays) {
   return (elapsedDays % 30) + 1;
  }

  function _getRepMonth (year, month, day, elapsedDays){
   return _trunc(elapsedDays / 30);
  }

  function _getRepMonthName (repMonth) {
    return months[repMonth];
  }

  function revolution (year, month, day){
    var repDay, repDayName, repMonth, repMonthName, repYear, elapsedDays;

    repYear = _getRepYear(year, month, day);

    elapsedDays = _numberOfElapsedDays(year, month, day, repYear);

    repMonth = _getRepMonth(year, month, day, elapsedDays);
    repMonthName = _getRepMonthName(repMonth);

    repDay = _getRepDay(year, month, day, elapsedDays);
    repDayName = _getRepDayName(repDay, repMonth);

    return {
      dayName : repDayName,
      day: repDay,
      month: repMonthName,
      year: repYear
    };
  }

  module.exports = revolution;

})();

},{}]},{},[1])