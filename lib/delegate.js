'use strict';

/**
 * polyfill CSS matchesSelector()
 */
var matchSelector;
var prototype = Element.prototype;

if (prototype.webkitMatchesSelector) {
  matchSelector = 'webkitMatchesSelector';
} else if (prototype.mozMatchesSelector) {
  matchSelector = 'mozMatchesSelector';
} else if (prototype.msMatchesSelector) {
  matchSelector = 'msMatchesSelector';
} else {
  matchSelector = 'matchesSelector';
}

/**
 * Export `off`
 *
 * @param {HTMLElement} el
 * @param {String} selector
 * @param {String} event
 * @param {Function} callback
 * @param {Boolean} capture (optional)
 * @return {Function} use it to undelegate
 */
module.exports.on = function (el, selector, event, callback, capture) {
  if (event === 'focus' || event === 'blur') {
    capture = true;
  }

  var fn = function (e) {
    var target = e.target;
    var type = e.type;

    while (target && target !== el) {
      if (target[matchSelector](selector) && type === event) {
        return callback(e);
      }

      target = target.parentElement;
    }
  };

  el.addEventListener(event, fn, capture || false);

  return fn;
};

/**
 * Export `off`
 *
 * @param {HTMLElement} el
 * @param {String} event
 * @param {Function} callback
 * @param {Boolean} capture (optional)
 */
module.exports.off = function (el, event, callback, capture) {
  if (event === 'focus' || event === 'blur') {
    capture = true;
  }

  el.removeEventListener(event, callback, capture || false);
};
