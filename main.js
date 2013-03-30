var Color = require('color');

Modernizr.load([{
  test: Modernizr.inputtypes.color,
  nope: 'jscolor.min.js',
  callback: function(id, testResult) {
    jscolor.init();
  }
}]);

function blend() {
  var cur = Color($('#current').val()).rgbArray();
  var bg = Color($('#background').val()).rgbArray();
  var opacity = parseInt($('#opacity').val(), 10) / 100;
  var r = blend_single(cur[0], bg[0], opacity);
  var g = blend_single(cur[1], bg[1], opacity);
  var b = blend_single(cur[2], bg[2], opacity);
  var n = Color().rgb(r, g, b);
  console.log(n.rgbString());
  $('#result').val(n.hexString());
}

function blend_single(cur, bg, opacity) {
  //console.log("("+cur+" - ((1 - "+opacity+") * "+bg+")) / "+opacity+"");
  return (cur - ((1 - opacity) * bg)) / opacity;
}

window.blend = blend;
