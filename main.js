var Color = require('color');

Modernizr.load([{
  test: Modernizr.inputtypes.color,
  nope: 'jscolor.min.js',
  callback: function(id, testResult) {
    jscolor.init();
  }
},{
  test: Modernizr.inputtypes.range,
  nope: 'html5slider.js',
  callback: function(id, testResult) {
  }
}]);

function blend() {
  var bgVal = $('#background').val();
  var bgHex = (bgVal.indexOf('#') === -1) ? '#' + bgVal : bgVal ;
  var curVal = $('#current').val();
  var curHex = (curVal.indexOf('#') === -1) ? '#' + curVal : curVal ;


  var bgColor = Color(bgHex);
  $('body').css('backgroundColor', bgColor.rgbString());
  if (bgColor.light()) {
    $('body').css('color', bgColor.darken(0.75).rgbString());
  } else {
    $('body').css('color', bgColor.negate().lighten(0.35).rgbString());
  }
  var cur = Color(curHex).rgbArray();

  var bg = Color(bgHex).rgbArray();
  var opacity = parseInt($('#opacity').val(), 10) / 100;
  var r = blend_single(cur[0], bg[0], opacity);
  var g = blend_single(cur[1], bg[1], opacity);
  var b = blend_single(cur[2], bg[2], opacity);
  var n = Color().rgb(r, g, b);
  $('#rgba').html(n.alpha(opacity).rgbaString());
  $('#opacity-val').html(Math.round(opacity*100) + "%");

  var currentColor = Color(curHex).alpha(1);
  $('#original .picker .bg').css('backgroundColor', currentColor.hexString());
  $('#original .hex').html(currentColor.hexString());
  $('#original .rgb').html(currentColor.rgbString());
  $('#original .hsl').html(currentColor.hslString());

  var newColor = Color().rgb(r, g, b).alpha(opacity);
  $('#new-opacity .picker .bg').css('backgroundColor', newColor.rgbaString());
  $('#new-opacity .hex').html(newColor.hexString());
  $('#new-opacity .rgb').html(newColor.rgbString());
  $('#new-opacity .hsl').html(newColor.hslString());

  newColor = Color().rgb(r, g, b).alpha(1);
  $('#new .picker .bg').css('backgroundColor', newColor.hexString());
  $('#new .hex').html(newColor.hexString());
  $('#new .rgb').html(newColor.rgbString());
  $('#new .hsl').html(newColor.hslString());
}

function blend_single(cur, bg, opacity) {
  return (cur - ((1 - opacity) * bg)) / opacity;
}

$(function () {
  $('body [title]').qtip({
    position: {
      my: 'bottom center',
      at: 'top center'

    }
  });
});

window.blend = blend;
