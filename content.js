chrome.storage.sync.get(['colorBlindMode'], function(result) {
  if (result.colorBlindMode) {
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundColor = 'white';
    var elements = document.getElementsByTagName('*');
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var style = window.getComputedStyle(element);
      var bgColor = style.backgroundColor;
      var fgColor = style.color;
      if (bgColor) {
        var newBgColor = getColor(bgColor);
        if (newBgColor != bgColor) {
          element.style.backgroundColor = newBgColor;
        }
      }
      if (fgColor) {
        var newFgColor = getColor(fgColor);
        if (newFgColor != fgColor) {
          element.style.color = newFgColor;
        }
      }
    }
  }
});

function getColor(color) {
  var r, g, b;
  if (color.indexOf('rgb') != -1) {
    var rgbArray = color.split('(')[1].split(')')[0].split(',');
    r = parseInt(rgbArray[0]);
    g = parseInt(rgbArray[1]);
    b = parseInt(rgbArray[2]);
  } else {
    r = parseInt(color.substr(1, 2), 16);
    g = parseInt(color.substr(3, 2), 16);
    b = parseInt(color.substr(5, 2), 16);
  }
  var newColor = colorBlindTransform(r, g, b);
  if (newColor) {
    if (color.indexOf('rgb') != -1) {
      return 'rgb(' + newColor.r + ',' + newColor.g + ',' + newColor.b + ')';
    } else {
      return '#' + newColor.hex;
    }
  } else {
    return color;
  }
}

function colorBlindTransform(r, g, b) {
  // Protanopia (red-blindness) simulation
  var newR = Math.round((0.567 * r) + (0.433 * g) + (0.0 * b));
  var newG = Math.round((0.558 * r) + (0.442 * g) + (0.0 * b));
  var newB = Math.round((0.0 * r) + (0.242 * g) + (0.758 * b));
  if (newR > 255 || newG > 255 || newB > 255) {
    return null;
  }
  return {r: newR, g: newG, b: newB};
}
