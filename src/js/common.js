var $ = require('jquery');
var bootstrap = require('bootstrap');

$(function () {
    $('[data-toggle="popover"]').popover();
})

$(function() {
	$('.popover-test').popover();
})

$(function() {
	$('.tooltip-test').tooltip();
})