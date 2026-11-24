// data.muginosato.com の入口
// お送りしたリンク（https://data.muginosato.com/?t=…）の t を、受付のページ（Google Apps Script）へ渡して中に出すだけ。
// ⚠ 秘密の物（合言葉・鍵）はここに書かない。出してよいのは下の APP・TEST_APP のページだけ（ほかのアドレスは中に出さない）。
(function () {
  'use strict';

  // 受付のページ（Apps Script のウェブアプリ・…/exec）。
  //   APP      … 本番（?t=…・mugi-files の gas/uketori）。デプロイのアドレスが決まるまでは空＝「準備中」。
  //   TEST_APP … 第2回の試しのデプロイ（?k=…）。試しを片付けたら空にする。
  var APP = '';
  var TEST_APP = 'https://script.google.com/macros/s/AKfycby6MBrHsJO_e-6xjauMBJyJmtRxQFL4A81UYycLvRuFe-dBlCcOhjQR0PZUSkpUj2V_/exec';
  var OK_APP = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/;

  var main = document.getElementById('main');
  var msg = document.getElementById('msg');
  var foot = document.getElementById('foot');
  var direct = document.getElementById('direct');

  function say(text) {
    msg.textContent = text;
  }

  var q;
  try {
    q = new URLSearchParams(location.search);
  } catch (e) {
    q = { get: function () { return ''; } };
  }
  var t = q.get('t') || '';
  var k = q.get('k') || '';
  var src = '';
  if (t) {
    if (!/^d[0-9a-f]{40}$/.test(t)) {
      say('このリンクは使えません。お送りしたメールのリンクを、そのまま開いてください。');
      return;
    }
    if (!OK_APP.test(APP)) {
      say('ただいま準備中です。しばらくしてからもう一度開いてください。');
      return;
    }
    src = APP + '?t=' + encodeURIComponent(t);
  } else if (k && OK_APP.test(TEST_APP) && /^[A-Za-z0-9_-]{8,64}$/.test(k)) {
    src = TEST_APP + '?k=' + encodeURIComponent(k);
  } else {
    say('お送りしたメールのリンクから開いてください。');
    return;
  }

  var f = document.createElement('iframe');
  f.src = src;
  f.title = 'データの受け渡し';
  main.replaceChild(f, msg);

  direct.href = src;
  foot.hidden = false;
})();
