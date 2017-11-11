(() => {
  'use strict';

  const form = {
    hidden: document.getElementById('hidden-input'),
    pass: document.getElementById('pass-input'),
    ssid: document.getElementById('ssid-input'),
    update: document.getElementById('update')
  };

  const preview = {
    pass: document.getElementById('pass'),
    qr: document.getElementById('qr'),
    ssid: document.getElementById('ssid')
  };

  const wifi = {
    ssid: 'myNetwork',
    pass: 'notMyPetsName123',
    type: 'WPA',
    hidden: false
  };

  window.addEventListener('input', updateInfo);
  form.hidden.addEventListener('change', updateInfo);
  form.update.addEventListener('click', updatePrint);

  function tOnly (bool) {
    return bool ? true : '';
  }
  
  const escapeHtml = s => s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  function updateInfo () {
    wifi.ssid = form.ssid.value;
    preview.ssid.innerHTML = escapeHtml(wifi.ssid);
    wifi.pass = form.pass.value;
    preview.pass.innerHTML = escapeHtml(wifi.pass);
    wifi.hidden = form.hidden.checked;
  }

  function updatePrint () {
    updateQr();
    setTimeout(() => window.print(), 750); // Should be part of a promise for the loaded image, but, for now, hopefully that'll succeed within 750ms
  }

  function updateQr () {
    const qrUrl = `https://zxing.org/w/chart?cht=qr&chs=350x350&chld=L&choe=UTF-8&chl=${encodeURIComponent(`WIFI:S:${wifi.ssid};T:${wifi.type};P:${wifi.pass};${tOnly(wifi.hidden)};`)}`;
    preview.qr.src = qrUrl;
  }


})();
