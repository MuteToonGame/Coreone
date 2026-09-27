/* ============================================================
   post/ch7.js
   After-match story for Stage 7 (Spain)
   Depends on: showPostMatch, playerName, PM_LOCKED_POS (index.html)
   หมายเหตุ: inject พิกัด [s7pm] เข้า PM_LOCKED_POS เองจากไฟล์นี้
             ไม่ต้องแก้ index.html
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 💉 ฉีดพิกัด [s7pm] เข้า PM_LOCKED_POS ของ index.html ---------- */
  (function patchS7pmCoords(){
    try {
      if (typeof PM_LOCKED_POS === 'object' && PM_LOCKED_POS) {
        PM_LOCKED_POS.s7pm_l__jo     = { dx: 182.03160858154297, dy: -23.3955078125,     sc: 0.84 };
        PM_LOCKED_POS.s7pm_l__gump4  = { dx: 206.98645782470703, dy: -7.60906982421875,  sc: 0.76 };
        PM_LOCKED_POS.s7pm_l__gump5  = { dx: 198.04725646972656, dy: -0.975677490234375, sc: 0.76 };
        PM_LOCKED_POS.s7pm_r__vik12  = { dx: -152.4270782470703, dy: 21.7962646484375,   sc: 1.56 };
        PM_LOCKED_POS.s7pm_r__maya12 = { dx: -176.9153060913086, dy: -2.087799072265625, sc: 1    };
        PM_LOCKED_POS.s7pm_c         = { dx: 0,                  dy: 0,                  sc: 1    };
        PM_LOCKED_POS.s7pm_box       = { dx: 0,                  dy: 0,                  sc: 1    };
      }
    } catch (e) { /* ถ้า PM_LOCKED_POS ยังไม่โหลด ก็ข้ามไป */ }
  })();

  /* ---------- Asset filenames ---------- */
  var IMG = {
    jo:     'Jo.webp',
    maya12: 'Maya12.webp',
    gump4:  'Gump4.webp',
    gump5:  'Gump5.webp',
    vik12:  'Vik12.webp'
  };

  var CSS_ID = 'ch7PhoneCSS';

  /* ---------- Inject styles once ---------- */
  function injectCSS() {
    if (document.getElementById(CSS_ID)) return;
    var st = document.createElement('style');
    st.id = CSS_ID;
    st.textContent = [
      '.ch7-fade{position:fixed;inset:0;background:#000;z-index:10000;',
        'opacity:0;transition:opacity 2s ease;pointer-events:none;}'
    ].join('');
    document.head.appendChild(st);
  }

  /* ---------- Fade to black ---------- */
  function fadeToBlack(done) {
    injectCSS();
    var f = document.createElement('div');
    f.className = 'ch7-fade';
    document.body.appendChild(f);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { f.style.opacity = '1'; });
    });
    setTimeout(function () {
      if (f.parentNode) f.remove();
      if (typeof done === 'function') done();
    }, 2100);
  }

  /* ---------- Entry point ---------- */
  window.startPostChapter7 = function (next) {
    injectCSS();

    showPostMatch([
      { who: 'โจ',   l: [IMG.jo],     sp: 'l', text: 'ในที่สุดก็ผ่านได้...' },
      { who: 'มายา', r: [IMG.maya12], sp: 'r', text: 'คุณสลับท่า... สเปนอ่านไม่ทัน' },
      { who: 'null', l: [IMG.gump4],  sp: 'l', text: '...ขอบใจ' },
      { who: 'วิค',  r: [IMG.vik12],  sp: 'r', text: '...',
        tag: 'มองกัมป์ 2 วิ → เดินออก' },
      { who: 'null', l: [IMG.gump5],  sp: 'l', text: '...' }
    ], function () {
      fadeToBlack(next);
    }, 's7pm');
  };

})();
