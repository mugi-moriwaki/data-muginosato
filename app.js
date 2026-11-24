// data.muginosato.com の入口
// お送りしたリンク（https://data.muginosato.com/?k=…）の k を、受付のページ（Google Apps Script）へ渡して中に出すだけ。
// ⚠ 秘密の物（合言葉・鍵）はここに書かない。出してよいのは下の APP のページだけ（ほかのアドレスは中に出さない）。
(function () {
  'use strict';

  // 受付のページ（Apps Script のウェブアプリ・…/exec）。第2回の試しの間は試しのデプロイ。
  var APP = '';

  var main = document.getElementById('main');
  var msg = document.getElementById('msg');
  var foot = document.getElementById('foot');
  var direct = document.getElementById('direct');

  function say(text) {
    msg.textContent = text;
  }

  if (!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(APP)) {
    say('ただいま準備中です。');
    return;
  }

  var k = '';
  try {
    k = new URLSearchParams(location.search).get('k') || '';
  } catch (e) {
    k = '';
  }
  if (!/^[A-Za-z0-9_-]{8,64}$/.test(k)) {
    say('お送りしたメールのリンクから開いてください。');
    return;
  }

  var src = APP + '?k=' + encodeURIComponent(k);
  var f = document.createElement('iframe');
  f.src = src;
  f.title = 'データの受け渡し';
  main.replaceChild(f, msg);

  direct.href = src;
  foot.hidden = false;
})();
