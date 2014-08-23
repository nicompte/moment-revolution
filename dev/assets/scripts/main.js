'use strict';

hljs.initHighlightingOnLoad();

Date.prototype.toDateInputValue = function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
};

$(function (){

  $('#date').on('change', function(){
    var b = $(this).val().split(/\D/);
    var date = new Date(b[0], --b[1], b[2]);
    var revDate = moment(date).toRevolutionnary();
    $('#revdate').html(revDate);
  });

  $('#date').val(new Date().toDateInputValue());
  var revDate = moment(new Date()).toRevolutionnary();
  $('#revdate').html(revDate);
});
