// http://en.wikipedia.org/wiki/Alpha_compositing#Alpha_blending
// https://dvcs.w3.org/hg/FXTF/rawfile/tip/compositing/index.html#blending
//

var Color = require('color');

Modernizr.load([{
  test: Modernizr.inputtypes.color,
  nope: 'jscolor.min.js',
  callback: function(id, testResult) {
    jscolor.init();
  }
}]);

function blend() {
  $('body').css('backgroundColor', $('#background').val());
  var cur = Color($('#current').val()).rgbArray();
  var bg = Color($('#background').val()).rgbArray();
  var opacity = parseInt($('#opacity').val(), 10) / 100;
  var r = blend_single(cur[0], bg[0], opacity);
  var g = blend_single(cur[1], bg[1], opacity);
  var b = blend_single(cur[2], bg[2], opacity);
  var n = Color().rgb(r, g, b);
  $('#rgba').html(n.alpha(opacity).rgbaString());
  $('#opacity-val').html(opacity*100 + "%");

  var currentColor = Color($('#current').val()).alpha(1);
  $('#original .picker').css('backgroundColor', currentColor.hexString());
  $('#original .hex').html(currentColor.hexString());
  $('#original .rgb').html(currentColor.rgbString());
  $('#original .hsl').html(currentColor.hslString());

  var newColor = Color().rgb(r, g, b).alpha(opacity);
  $('#new-opacity .picker').css('backgroundColor', newColor.rgbaString());
  $('#new-opacity .hex').html(newColor.hexString());
  $('#new-opacity .rgb').html(newColor.rgbString());
  $('#new-opacity .hsl').html(newColor.hslString());

  newColor = Color().rgb(r, g, b).alpha(1);
  $('#new .picker').css('backgroundColor', newColor.hexString());
  $('#new .hex').html(newColor.hexString());
  $('#new .rgb').html(newColor.rgbString());
  $('#new .hsl').html(newColor.hslString());
}

function blend_single(cur, bg, opacity) {
  //console.log("("+cur+" - ((1 - "+opacity+") * "+bg+")) / "+opacity+"");
  return (cur - ((1 - opacity) * bg)) / opacity;
}

window.blend = blend;
