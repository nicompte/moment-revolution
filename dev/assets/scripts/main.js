'use strict';



Date.prototype.toDateInputValue = function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
};

$(function (){

  hljs.initHighlightingOnLoad();

  $('#date').datetimepicker({
    format: 'dd/mm/yyyy',
    minView: 2,
    language: 'fr',
    autoclose: true,
    todayBtn: true
  })
  .on('change', function(){
    var date = moment($(this).val(), 'DD/MM/YYYY');
    var revDate = moment(date).toRevolutionnary();
    $('#revdate').html(revDate);
  })
  .val(moment(new Date()).format('DD/MM/YYYY'))
  .siblings('.input-group-addon').on('click', function(){
    $('#date').datetimepicker('show');
  });

  var revDate = moment(new Date()).toRevolutionnary();
  $('#revdate').html(revDate);

});
