(() => {
  'use strict';

  const el = {
    qrImg: document.getElementById('qr'),
    ssid: document.getElementById('ssid'),
    pass: document.getElementById('pass'),
    hidden: document.getElementById('hidden'),
    update: document.getElementById('update')
  };

  const wifi = {
    ssid: 'ssid',
    pass: 'password',
    type: 'WPA',
    hidden: false
  };

  el.update.addEventListener('click', updatePrint);

  function tOnly (bool) {
    return bool ? true : '';
  }

  function updatePrint () {
    updateInfo();
    setTimeout(() => window.print(), 750); // Should be part of a promise for the loaded image, but, for now, hopefully it'll succeed within 750ms
  }

  function updateInfo () {
    wifi.ssid = el.ssid.value;
    wifi.pass = el.pass.value;
    wifi.hidden = el.hidden.checked;
    const qrUrl = `https://zxing.org/w/chart?cht=qr&chs=350x350&chld=L&choe=UTF-8&chl=${encodeURIComponent(`WIFI:S:${wifi.ssid};T:${wifi.type};P:${wifi.pass};${tOnly(wifi.hidden)};`)}`;
    el.qrImg.src = qrUrl;
  }


})();
