'use strict';

var matchSelector = Element.prototype.webkitMatchesSelector ? 'webkitMatchesSelector' : 'mozMatchesSelector';

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
  var fn = function (e) {
    if (! e.target[matchSelector](selector)) {
      return;
    }

    callback(e);
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
  el.removeEventListener(event, callback, capture || false);
};
