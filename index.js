(function () {
  'use strict';

  var revolution = require('./revolution'),
    moment = require('moment');

  var Revolution = function (moment) {
    var date = revolution(moment.year(), moment.month() + 1, moment.date());
    this.dayName = date.dayName;
    this.day = date.day;
    this.month = date.month;
    this.year = date.year;
    this.romanYear = date.romanYear;
  };

  Revolution.prototype.format = function (template) {
    if (typeof template === 'undefined' || template === '') {
      template = this.format.default;
    }
    for (var token in this.format.tokens) {
      template = template.replace(this.format.tokens[token], this[token]);
    }
    return template;
  };

  Revolution.prototype.format.default = 'ddd D M YYYY';

  Revolution.prototype.format.tokens = {
    day: /D/,
    dayName: /ddd/,
    month: /M/,
    year: /YYYY/,
    romanYear: /yyyy/
  };

  moment.fn.revolution  = function () {
    return new Revolution(this);
  };

  module.exports = moment;
})();
