/*global describe, it*/

'use strict';

var delegate = process.env.AK_DELEGATE_TEST_COVERAGE ? require('../lib-cov/delegate') : require('../');

document.body.innerHTML +=
  '<div class="l-1 d-1">' +
    '<div class="l-2">' +
      '<div class="l-3" id="l-3-1">' +
        '<div class="l-4" id="ll-4-1"></div>' +
        '<div class="l-4" id="ll-4-1"></div>' +
        '<div class="l-4" id="ll-4-1"></div>' +
        '<div class="l-4" id="ll-4-1"></div>' +
      '</div>' +
    '</div>' +
  '</div>' +
  '<div class="l-1 d-2">' +
    '<div class="l-2">' +
      '<div class="l-3" id="l-3-2">' +
        '<div class="l-4" id="l-4-1"></div>' +
        '<div class="l-4" id="l-4-2"></div>' +
        '<div class="l-4" id="l-4-3"></div>' +
        '<div class="l-4" id="l-4-4"><input /></div>' +
      '</div>' +
    '</div>' +
  '</div>'
;

describe('delegate', function () {
  it('#on(document.body, ".l-3")', function (done) {
    var counter1 = 0;
    var counter2 = 0;

    delegate.on(document.body, '.l-3', 'click', function (e) {
      if (e.target.id === 'l-3-1') {
        counter1 += 1;
      }

      if (e.target.id === 'l-3-2') {
        counter2 += 1;
      }
    });

    document.querySelector('.d-1 .l-3').click();
    document.querySelector('.d-2 .l-3').click();

    if (counter1 === 1 && counter2 === 1) {
      done();
    }
  });

  it('#on(".l-3 input", "focus"), #off(".l-3 input", "focus")', function (done) {
    var fn = delegate.on(document.body, '.l-3 input', 'focus', function () {
      done();
    });

    var input = document.querySelector('.l-3 input');

    // TODO use `input.focus();` when retarded Firefox & IE will handle it
    var e = document.createEvent('HTMLEvents');
    e.initEvent('focus', true, true);
    input.dispatchEvent(e);

    // TODO use `input.blur();` when retarded Firefox & IE will handle it
    e = document.createEvent('HTMLEvents');
    e.initEvent('blur', true, true);
    input.dispatchEvent(e);
    delegate.off(document.body, 'focus', fn);

    // TODO use `input.focus();` when retarded Firefox & IE will handle it
    e = document.createEvent('HTMLEvents');
    e.initEvent('focus', true, true);
    input.dispatchEvent(e);
  });

  it('#on(".d-2", ".l-2 .l-4"), #off(".d-2")', function (done) {
    var counter0 = 0;
    var counter1 = 0;
    var counter2 = 0;
    var counter3 = 0;
    var counter4 = 0;

    var d2 = document.body.querySelector('.d-2 .l-3');
    var fn = delegate.on(d2, '.l-4', 'click', function (e) {
      if (e.currentTarget === d2) {
        counter0 += 1;
      }

      if (e.target.id === 'l-4-1') {
        counter1 += 1;
      }

      if (e.target.id === 'l-4-2') {
        counter2 += 1;
      }

      if (e.target.id === 'l-4-3') {
        counter3 += 1;
      }

      if (e.target.id === 'l-4-4') {
        counter4 += 1;
      }
    });

    document.querySelector('.d-1 .l-4:first-of-type').click();
    document.querySelector('.d-2 .l-4:nth-child(1)').click();
    document.querySelector('.d-2 .l-4:nth-child(2)').click();
    document.querySelector('.d-2 .l-4:nth-child(3)').click();
    document.querySelector('.d-2 .l-4:nth-child(4)').click();

    delegate.off(document.body, 'click', fn);

    document.querySelector('.d-2 .l-4:nth-child(4)').click();

    delegate.off(d2, 'click', fn);

    document.querySelector('.d-2 .l-4:nth-child(3)').click();

    if (counter1 === 1 && counter2 === 1 && counter3 === 1 && counter4 === 2) {
      done();
    }
  });

  it('#on(".d-2 .l-3"), #click(".l-4")', function (done) {
    var d2 = document.body.querySelector('.d-2');

    delegate.on(d2, '.l-3', 'click', function () {
      done();
    });

    document.querySelector('.d-2 .l-4').click();
  });
});
