// data.muginosato.com の入口
// お送りしたリンク（https://data.muginosato.com/?t=…）の t を、受付のページ（Google Apps Script）へ渡して中に出すだけ。
// ⚠ 秘密の物（合言葉・鍵）はここに書かない。出してよいのは下の APP のページだけ（ほかのアドレスは中に出さない）。
(function () {
  'use strict';

  // 受付のページ（Apps Script のウェブアプリ・…/exec）＝本番（?t=…・mugi-files の gas/uketori・data@ の「data 受付」）。空にすると「準備中」。
  var APP = 'https://script.google.com/macros/s/AKfycbz3-o8XatPuxlNMNe8cCypG9ebezarYY-DE5JF8tdmpVdvFyn7erAltWgHB8bVyWqkXkQ/exec';
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
  if (!t) {
    say('お送りしたメールのリンクから開いてください。');
    return;
  }
  if (!/^d[0-9a-f]{40}$/.test(t)) {
    say('このリンクは使えません。お送りしたメールのリンクを、そのまま開いてください。');
    return;
  }
  if (!OK_APP.test(APP)) {
    say('ただいま準備中です。しばらくしてからもう一度開いてください。');
    return;
  }
  var src = APP + '?t=' + encodeURIComponent(t);

  var f = document.createElement('iframe');
  f.src = src;
  f.title = 'データの受け渡し';
  main.replaceChild(f, msg);

  direct.href = src;
  foot.hidden = false;
})();
