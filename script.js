$(function() {
  var $card = $('#card')
    , $body = $('body')
    , morphCard = function(fn) {
      var oldWidth = $card.width()
        , oldHeight = $card.height();
      fn();
      var dx = -($card.width() - oldWidth) / 2.0
        , dy = -($card.height() - oldHeight) / 2.0;
      moveCard(dx, dy);
    }
	  , letters = ['A', 'B', 'C', 'D']
    , letterIdx = 0
  	, words = ['doc', 'HI', 'CAR', 'dog']
    , wordIdx = 0
    , changeCard = function(useWord) {
      morphCard(function() {
        var cardStr;
        if (useWord) {
          wordIdx = (wordIdx + 1) % words.length;
          cardStr = words[wordIdx];
        } else {
          letterIdx = (letterIdx + 1) % letters.length;
          cardStr = letters[letterIdx];
        }
        $card.html(cardStr)
      });
    }
    , blackBg = true // initial css properties have black bg
    , white = '#FFF'
    , black = '#000'
    , blackBackground = function() {
      $body.css('background-color', black);
      $card.css('color', black);
      blackBg = true;
    }
    , whiteBackground = function() {
      $body.css('background-color', black);
      $card.css('color', black);
      blackBg = false;
    }
    , timeout = 2000 // time for animations
    , delta = 5 // delta for movements
    , $window = $(window)
    , height = $window.height()
    , width = $window.width()
    , top = height / 2.0
    , left = width / 2.0
    , moveCard = function(dx, dy) {
      left += dx;
      left < 0 && (left = 0);
      var maxLeft = width - $card.width();
      left > maxLeft && (left = maxLeft);
      top += dy;
      top < 0 && (top = 0);
      var maxTop = height - $card.height();
      top > maxTop && (top = maxTop);
      $card.css({
          top: top
        , left: left
      });
    }
    , fontSize = 24 // initialize
    , changeFont = function(dx) {
      morphCard(function() {
        fontSize += dx;
        fontSize < 0 && (fontSize = 0);
        $card.css('font-size', fontSize);
      });
    };

  // initialize the card
  moveCard(0, 0);

	$(document).keydown(function(e) {
		var key = String.fromCharCode(e.keyCode);
		switch (key) {
    // ---------- FADING ------------------
    case 'B':
      blackBackground();
      break;
    case 'W':
      whiteBackground();
      break;
		case 'I':
      if (blackBg) {
		    $card.animate({
			    color: white
			  }, timeout);
      } else {
        $body.animate({
          'background-color': white
        }, timeout)
      }
      break;
    case 'O':
      if (blackBg) {
		    $card.animate({
			    color: black
			  }, timeout);
      } else {
        $body.animate({
          'background-color': black
        }, timeout)
      }
      break;

     // ------------ CARD MOVEMENT ---------------
    case 'H':
      // left
      moveCard(delta, 0);
      break;
    case 'J':
      // down
      moveCard(0, delta);
      break;
    case 'K':
      // up
      moveCard(0, -delta);
      break;
    case 'L':
      // right
      moveCard(-delta, 0)
      break;

    // ----------- SWITCHING LETTERS ------------
    case '%':
      // left arrow
      changeCard(); // switch to next letter
      break;
    case "'":
      // right arrow
      changeCard(true); // switch to next word
      break;

    // ------------ CHANGING FONT ---------------
    case '&':
      // up arrow
      changeFont(1);
      break;
    case '(':
      // down arrow
      changeFont(-1);
      break;
    }

		console.log(e.keyCode + ':' + key);
	});
});
