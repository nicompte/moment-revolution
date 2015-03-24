'use strict';

var moment = require('../../index.js'),
  chai = require('chai');

describe('moment()', function () {
  describe('#revolution().format()', function () {
    it('should return a revolutionnary date', function () {
      chai.assert.equal(moment(new Date(2014, 7, 25)).revolution().format(), 'Octidi 8 Fructidor 222');
      chai.assert.equal(moment(new Date(2014, 8, 1)).revolution().format(), 'Quintidi 15 Fructidor 222');
      chai.assert.equal(moment(new Date(1802, 8, 23)).revolution().format(), 'Primidi 1 Vendémiaire 11');
      chai.assert.equal(moment(new Date(1988, 2, 29)).revolution().format(), 'Nonidi 9 Germinal 196');
    });
    it('should handle the Sans-culottides month', function () {
      chai.assert.equal(moment(new Date(2014, 8, 16)).revolution().format(), 'Décadi 30 Fructidor 222');
      chai.assert.equal(moment(new Date(2014, 8, 17)).revolution().format(), 'Jour de la Vertu 1 Sans-culottides 222');
      chai.assert.equal(moment(new Date(2014, 8, 18)).revolution().format(), 'Jour du Génie 2 Sans-culottides 222');
      chai.assert.equal(moment(new Date(2014, 8, 19)).revolution().format(), 'Jour du Travail 3 Sans-culottides 222');
      chai.assert.equal(moment(new Date(2014, 8, 20)).revolution().format(), 'Jour de l\'Opinion 4 Sans-culottides 222');
      chai.assert.equal(moment(new Date(2014, 8, 21)).revolution().format(), 'Jour des Récompenses 5 Sans-culottides 222');
      chai.assert.equal(moment(new Date(1795, 8, 16)).revolution().format(), 'Décadi 30 Fructidor 3');
      chai.assert.equal(moment(new Date(1795, 8, 17)).revolution().format(), 'Jour de la Vertu 1 Sans-culottides 3');
    });
    it('should handle Revolution days', function () {
      chai.assert.equal(moment(new Date(1795, 8, 22)).revolution().format(), 'Jour de la Révolution 6 Sans-culottides 3');
      chai.assert.equal(moment(new Date(1799, 8, 22)).revolution().format(), 'Jour de la Révolution 6 Sans-culottides 7');
      chai.assert.equal(moment(new Date(2018, 8, 22)).revolution().format(), 'Jour de la Révolution 6 Sans-culottides 226');
      chai.assert.equal(moment(new Date(2022, 8, 22)).revolution().format(), 'Jour de la Révolution 6 Sans-culottides 230');
    });
  });
});

describe('Revolutionnay calendar', function () {
  it('should start the 22th of September, 1792', function () {
    chai.assert.equal(moment(new Date(1792, 8, 22)).revolution().format(), 'Primidi 1 Vendémiaire 1');
  });
});

describe('Revolutionnary date formatting', function () {
  it('handles roman digits', function () {
    chai.assert.equal(moment(new Date(1792, 8, 22)).revolution().format('ddd D M yyyy'), 'Primidi 1 Vendémiaire I');
  });
});
