'use strict';

var moment = require('../../index.js'),
  chai = require('chai');

describe('moment()', function(){
  describe('#toRevolutionnary()', function(){
    it('should return a revolutionnary date', function(){
      chai.assert.equal(moment(new Date(2014, 7, 22)).toRevolutionnary(), 'Quintidi 5 Fructidor 222');
      chai.assert.notEqual(moment(new Date(2014, 7, 22)).toRevolutionnary(), 'Quintidi 6 Fructidor 222');
      chai.assert.equal(moment(new Date(2014, 8, 1)).toRevolutionnary(), 'Quintidi 15 Fructidor 222');
      chai.assert.equal(moment(new Date(1988, 2, 29)).toRevolutionnary(), 'Nonidi 9 Germinal 196');
    });
    it('should handle weird dates', function(){
      chai.assert.equal(moment(new Date(2014, 8, 17)).toRevolutionnary(), 'Jour de la Vertu 1 Sans-culottides 222');
      chai.assert.equal(moment(new Date(2014, 8, 18)).toRevolutionnary(), 'Jour du Génie 2 Sans-culottides 222');
      chai.assert.equal(moment(new Date(2014, 8, 19)).toRevolutionnary(), 'Jour du Travail 3 Sans-culottides 222');
      chai.assert.equal(moment(new Date(2014, 8, 20)).toRevolutionnary(), 'Jour de l\'Opinion 4 Sans-culottides 222');
      chai.assert.equal(moment(new Date(2014, 8, 21)).toRevolutionnary(), 'Jour des Récompenses 5 Sans-culottides 222');
    });
    it('should handle revolution days', function(){
      chai.assert.equal(moment(new Date(2018, 8, 22)).toRevolutionnary(), 'Jour de la Révolution 6 Sans-culottides 226');
    });
  });
});

describe('Revolutionnay calendar', function () {
  it('should start the 22th of September, 1792', function () {
    chai.assert.equal(moment(new Date(1792, 8, 22)).toRevolutionnary(), 'Primidi 1 Vendémiaire 1');
  });
});
