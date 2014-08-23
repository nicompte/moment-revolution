'use strict';

$(function (){

  hljs.initHighlighting();

  $('form').on('submit', function(e){
    e.preventDefault();
    $('#date').change();
  });

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
