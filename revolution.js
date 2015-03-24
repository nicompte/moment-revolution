(function () {
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

  function _romanize (num) {
    if (!+num) {
      return false;
    }
    var  digits = String(+num).split(''),
      key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
             '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
             '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
      roman = '',
      i = 3;
    while (i--) {
      roman = (key[+digits.pop() + (i * 10)] || '') + roman;
    }
    return new Array(+digits.join('') + 1).join('M') + roman;
  }

  // function _deromanize (str) {
  //   str = str.toUpperCase();
  //   var  validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/,
  //     token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,
  //     key = {M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1},
  //     num = 0, m;
  //   if (!(str && validator.test(str))) {
  //     return false;
  //   }
  //   while (m = token.exec(str)) {
  //     num += key[m[0]];
  //   }
  //   return num;
  // }

  /**
  * Polyfill for Math._trunc()
  */
  function _trunc(x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
  }

  /**
  * Return the number of days elapsed in the Republican year
  */
  function _numberOfElapsedDays(year, month, day, repYear) {
    var md, sj, elapsedDays;

    md = _lastDayOfPreviousYear(repYear);
    sj = _isLeap(repYear);

    // First days of the republican year
    if (month === 9 && year === repYear + 1791) {
      elapsedDays = day - md - 1;
    } else {
      elapsedDays = dayOfMonth[month] +
        sj * (month > 2 && month < 10 ? 1 : 0) +
        day - md - 1;
    }

    return elapsedDays;
  }

  /**
  * Return the last day of the previous day ?
  */
  function _lastDayOfPreviousYear(repYear) {
    return (function () { // Last day of the previous year ?
      switch (repYear) {
        case 4: case 8: return 22;
        case 12: case 16: return 23;
        default:
          return 23 -
            Math.floor((repYear - 1) / 100) +
            Math.floor((repYear - 1) / 400) +
            Math.floor((repYear - 209) / 100) -
            Math.floor((repYear - 209) / 400);
      }
    })();
  }

  /**
  * Return 1 for a leap year, 0 for a normal year
  */
  function _isLeap(repYear) {
    return (repYear % 4 === 0 ? 1 : 0) - // Leap year ?
      ((repYear + 1792) % 100 === 0 ? 1 : 0) +
      ((repYear + 1792) % 400 === 0 ? 1 : 0);
  }

  /**
  * Calculate republican repYear
  */
  function _getRepYear(year, month, day) {
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
    if ((month === 9 && day >= firstDayOfTheYear) || month >= 10) {
      repYear += 1;
    }
    return repYear;
  }

  function _getRepDayName(repDay, repMonth) {
    var lastMonth;
    lastMonth = repMonth === 12 ? 10 : 0;
    return days[(repDay  % 10) + lastMonth];
  }

  function _getRepDay(year, month, day, elapsedDays) {
    return (elapsedDays % 30) + 1;
  }

  function _getRepMonth(year, month, day, elapsedDays) {
    return _trunc(elapsedDays / 30);
  }

  function _getRepMonthName(repMonth) {
    return months[repMonth];
  }

  function revolution(year, month, day) {
    var repDay, repDayName, repMonth, repMonthName, repYear, elapsedDays;

    repYear = _getRepYear(year, month, day);

    elapsedDays = _numberOfElapsedDays(year, month, day, repYear);

    repMonth = _getRepMonth(year, month, day, elapsedDays);
    repMonthName = _getRepMonthName(repMonth);

    repDay = _getRepDay(year, month, day, elapsedDays);
    repDayName = _getRepDayName(repDay, repMonth);

    return {
      dayName: repDayName,
      day: repDay,
      month: repMonthName,
      year: repYear,
      romanYear: _romanize(repYear)
    };
  }

  module.exports = revolution;
})();
