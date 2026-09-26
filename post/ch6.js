/* ============================================================
   post/ch6.js
   After-match story for Stage 6 (Netherlands)
   Depends on: showPostMatch, playerName, PM_LOCKED_POS (index.html)
   หมายเหตุ: inject พิกัด [s6pm] เข้า PM_LOCKED_POS เองจากไฟล์นี้
             ไม่ต้องแก้ index.html
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 💉 ฉีดพิกัด [s6pm] เข้า PM_LOCKED_POS ของ index.html ----------
     PM_LOCKED_POS ถูกประกาศด้วย const ที่ top-level ของ classic script
     → อยู่ใน global lexical scope ที่แชร์กันทุก script บนหน้าเว็บ
     → จากไฟล์นี้มองเห็นและแก้ property ได้เลย (ติดแค่ห้าม reassign ตัวแปร) */
  (function patchS6pmCoords(){
    try {
      if (typeof PM_LOCKED_POS === 'object' && PM_LOCKED_POS) {
        PM_LOCKED_POS.s6pm_l__eyejo    = { dx: 84.16007232666016, dy: -247.11105346679688, sc: 2.2 };
        PM_LOCKED_POS.s6pm_r__gumpzen2 = { dx: 12.018020629882812, dy: -6.4715576171875,  sc: 1   };
        PM_LOCKED_POS.s6pm_c           = { dx: 0,                   dy: 0,                   sc: 1   };
        PM_LOCKED_POS.s6pm_box         = { dx: 0,                   dy: 0,                   sc: 1   };
      }
    } catch (e) { /* ถ้า PM_LOCKED_POS ยังไม่โหลด (โหลดไฟล์ช้า) ก็ข้ามไป — ค่า default จะถูกใช้ */ }
  })();

  /* ---------- Asset filenames ---------- */
  var IMG = {
    gump:      'Gumpzen2.webp',
    jo:        'Jo.webp',
    eyeJo:     'EyeJo.webp',
    mayaSad:   'Mayasad.webp',
    maya:      'Maya11.webp',
    mayaHand:  'Mayahand.webp',
    cow:       'Buff1.webp'
  };

  var CSS_ID = 'ch6PhoneCSS';

  /* ---------- Inject styles once ---------- */
  function injectCSS() {
    if (document.getElementById(CSS_ID)) return;
    var st = document.createElement('style');
    st.id = CSS_ID;
    st.textContent = [
      '.ch6-phone-ov{position:fixed;inset:0;z-index:9999;background:#000;',
        'display:flex;align-items:center;justify-content:center;opacity:0;',
        'animation:ch6Fade .35s ease .05s forwards;}',
      '.ch6-phone-stage{position:relative;width:100vw;max-width:480px;height:100dvh;',
        'overflow:hidden;background:#050b08;isolation:isolate;}',
      '.ch6-phone-bg{position:absolute;inset:0;width:100%;height:100%;',
        'object-fit:cover;object-position:center;opacity:.92;z-index:0;}',

      '.ch6-screen{position:absolute;left:22%;right:38%;top:17%;bottom:40%;',
        'z-index:4;padding:14px 14px 12px;border-radius:14px;',
        'background:rgba(3,12,8,.94);',
        'box-shadow:0 0 32px rgba(74,255,160,.28),inset 0 0 22px rgba(74,255,160,.08),',
          '0 0 0 1px rgba(74,255,160,.32);',
        'font-family:"Courier New",monospace;color:#4affa0;',
        'font-size:clamp(10px,2.55vw,13.5px);line-height:1.55;',
        'letter-spacing:.02em;text-shadow:0 0 6px rgba(74,255,160,.55);',
        'display:flex;flex-direction:column;}',
      '.ch6-head{display:flex;justify-content:space-between;align-items:center;',
        'font-size:.85em;color:#6affb8;padding-bottom:5px;margin-bottom:7px;',
        'border-bottom:1px solid rgba(74,255,160,.32);}',
      '.ch6-line{white-space:pre-wrap;min-height:1.55em;',
        'opacity:0;transform:translateX(-6px);',
        'transition:opacity .35s ease,transform .35s ease;}',
      '.ch6-line.in{opacity:1;transform:translateX(0);}',
      '.ch6-rec{color:#b6ffcf;',
        'transition:opacity .35s ease,transform .35s ease,text-shadow .45s ease;}',
      '.ch6-rec.glow{text-shadow:0 0 12px #4affa0,0 0 26px #4affa0,0 0 4px #fff;}',
      '.ch6-rec.flicker{animation:ch6Flicker .12s steps(2) 6;}',
      '@keyframes ch6Flicker{0%{opacity:1}100%{opacity:.25}}',
      '.ch6-rec #ch6RecWord{transition:text-shadow .3s,color .3s;}',
      '.ch6-rec #ch6RecWord.warn{color:#ff5566;',
        'text-shadow:0 0 10px #ff3355,0 0 20px #ff3355;}',
      '.ch6-dots{opacity:0;color:#6affb8;font-size:1.4em;letter-spacing:.4em;',
        'margin-top:2px;transition:opacity .35s ease;min-height:1.4em;}',
      '.ch6-dots.show{opacity:1;animation:ch6Dots 1s ease-in-out infinite;}',
      '@keyframes ch6Dots{0%,100%{opacity:.35}50%{opacity:1}}',
      '.ch6-send{margin-top:auto;align-self:flex-end;padding:5px 14px;',
        'border-radius:5px;background:rgba(74,255,160,.14);border:1px solid #4affa0;',
        'color:#d5ffe6;font-family:inherit;font-size:.9em;letter-spacing:.14em;',
        'font-weight:700;cursor:pointer;opacity:0;transform:translateY(4px);',
        'transition:opacity .35s ease,transform .35s ease,background .15s ease;}',
      '.ch6-send.show{opacity:1;transform:translateY(0);}',
      '.ch6-send:hover{background:rgba(74,255,160,.32);}',

      '.ch6-cow{position:absolute;left:1%;top:8%;width:30%;z-index:3;',
        'filter:drop-shadow(0 6px 16px rgba(0,0,0,.7));',
        'animation:ch6Up .55s ease .55s both;}',
      '.ch6-cow img{width:100%;height:auto;display:block;position:relative;z-index:2;}',
      '.ch6-cow span{font-size:clamp(40px,8vw,64px);line-height:1;}',
      '.ch6-cow.twitch{animation:ch6Up .55s ease .55s both,',
        'ch6Twitch .18s steps(2) .1s 5;}',
      '.ch6-cow-glow{position:absolute;inset:-12%;border-radius:50%;z-index:1;',
        'background:radial-gradient(circle,rgba(255,180,90,.65) 0,',
          'rgba(255,180,90,0) 62%);opacity:0;',
        'transition:opacity .55s ease;pointer-events:none;}',
      '.ch6-cow.pulse .ch6-cow-glow{opacity:1;',
        'animation:ch6CowPulse 1.6s ease-in-out infinite;}',
      '.ch6-cow.nod{animation:ch6Up .55s ease .55s both,ch6Nod .5s ease 0s;}',

      '@keyframes ch6Up{from{opacity:0;transform:translateY(14px) scale(.94);}',
        'to{opacity:1;transform:translateY(0) scale(1);}}',
      '@keyframes ch6Twitch{',
        '0%{transform:translateX(0)}',
        '25%{transform:translateX(-3px) rotate(-1.5deg)}',
        '75%{transform:translateX(3px) rotate(1.5deg)}',
        '100%{transform:translateX(0)}}',
      '@keyframes ch6CowPulse{',
        '0%,100%{opacity:.55;transform:scale(1)}',
        '50%{opacity:1;transform:scale(1.12)}}',
      '@keyframes ch6Nod{',
        '0%{transform:translateY(0) rotate(0)}',
        '40%{transform:translateY(-4px) rotate(-4deg)}',
        '100%{transform:translateY(0) rotate(0)}}',

      '.ch6-maya{position:absolute;right:-4%;top:4%;width:34%;z-index:3;',
        'filter:drop-shadow(0 8px 18px rgba(0,0,0,.7)) brightness(.92);opacity:0;',
        'animation:ch6Up .55s ease .35s forwards;}',
      '.ch6-maya img{width:100%;height:auto;display:block;}',

      '.ch6-voice{position:absolute;top:2%;right:30%;max-width:70%;',
        'padding:8px 14px;border-radius:14px 14px 4px 14px;',
        'background:linear-gradient(135deg,rgba(255,138,216,.22),rgba(255,180,90,.14));',
        'border:1.5px solid rgba(255,180,90,.5);',
        'color:#ffe8c8;font-size:13px;font-style:italic;line-height:1.5;',
        'text-align:right;',
        'text-shadow:0 2px 8px rgba(0,0,0,.7),0 0 10px rgba(255,180,90,.35);',
        'box-shadow:0 6px 20px rgba(0,0,0,.55);',
        'opacity:0;pointer-events:none;transform:translateY(-8px);',
        'transition:opacity .35s ease,transform .35s ease;z-index:7;}',
      '.ch6-voice.show{opacity:1;transform:translateY(0);}',

      '.ch6-sent{position:absolute;inset:0;z-index:6;',
        'display:flex;align-items:center;justify-content:center;',
        'background:rgba(0,18,10,.94);font-family:"Courier New",monospace;',
        'color:#4affa0;font-size:clamp(20px,5.2vw,28px);letter-spacing:.22em;',
        'font-weight:700;text-shadow:0 0 16px #4affa0,0 0 30px #4affa0;',
        'opacity:0;animation:ch6Fade .4s ease .05s forwards;}',

      '.ch6-fade{position:fixed;inset:0;background:#000;z-index:10000;',
        'opacity:0;transition:opacity 2s ease;pointer-events:none;}',

      '@keyframes ch6Fade{to{opacity:1;}}'
    ].join('');
    document.head.appendChild(st);
  }

  /* ---------- Phone scene ---------- */
  function playPhoneScene(done) {
    injectCSS();

    var ov = document.createElement('div');
    ov.className = 'ch6-phone-ov';
    ov.innerHTML =
      '<div class="ch6-phone-stage">' +
        '<img class="ch6-phone-bg" src="' + IMG.mayaHand + '" alt="" ' +
             'onerror="this.style.opacity=\'.15\';this.style.background=\'#041a10\'">' +

        '<div class="ch6-screen" id="ch6Screen">' +
          '<div class="ch6-head"><span>⚡ KAI SECURE</span><span>87%</span></div>' +
          '<div class="ch6-line ch6-line-1">SUBJECT: ' + playerName().toUpperCase() + '</div>' +
          '<div class="ch6-line ch6-line-2">SYNC: INCOMPLETE</div>' +
          '<div class="ch6-line ch6-line-3">CORE RESPONSE: RISING (+80%)</div>' +
          '<div class="ch6-line ch6-rec" id="ch6Rec">RECOMMEND: <span id="ch6RecWord">RETRIEVE</span></div>' +
          '<div class="ch6-dots" id="ch6Dots">···</div>' +
          '<button class="ch6-send" id="ch6Send" type="button">SEND ▶</button>' +
        '</div>' +

        '<div class="ch6-cow" id="ch6Cow">' +
          '<img src="' + IMG.cow + '" alt="" onerror="this.parentNode.remove()">' +
          '<span class="ch6-cow-glow"></span>' +
        '</div>' +

        '<div class="ch6-maya">' +
          '<img src="' + IMG.mayaSad + '" alt="" onerror="this.parentNode.remove()">' +
        '</div>' +

        '<div class="ch6-voice" id="ch6Voice"></div>' +
      '</div>';

    document.body.appendChild(ov);

    var rec   = document.getElementById('ch6Rec');
    var word  = document.getElementById('ch6RecWord');
    var send  = document.getElementById('ch6Send');
    var cow   = document.getElementById('ch6Cow');
    var voice = document.getElementById('ch6Voice');
    var dots  = document.getElementById('ch6Dots');

    function say(text, dur, cb) {
      voice.textContent = text;
      voice.classList.add('show');
      setTimeout(function () {
        voice.classList.remove('show');
        if (cb) setTimeout(cb, 300);
      }, dur || 1600);
    }

    setTimeout(function () { document.querySelector('.ch6-line-1').classList.add('in'); }, 200);
    setTimeout(function () { document.querySelector('.ch6-line-2').classList.add('in'); }, 550);
    setTimeout(function () { document.querySelector('.ch6-line-3').classList.add('in'); }, 900);
    setTimeout(function () { rec.classList.add('in'); }, 1250);

    setTimeout(function () {
      rec.classList.add('glow');
      if (cow) cow.classList.add('twitch');
    }, 2800);

    setTimeout(function () {
      say('(...ตุ๊กตาตัวนี้...นายให้ฉันตอนนั้น)', 2000, function () {

        setTimeout(function () {
          if (cow) {
            cow.classList.remove('twitch');
            cow.classList.add('pulse');
          }
          rec.classList.add('flicker');
          word.classList.add('warn');
          setTimeout(function () {
            rec.classList.remove('flicker');
            setTimeout(function () { word.classList.remove('warn'); }, 700);
          }, 900);

          setTimeout(function () {
            say('(ถ้าฉันส่ง...)', 1500, function () {
              setTimeout(function () {
                say('(...แล้วเขาจะถูกนำกลับ)', 1900, function () {

                  setTimeout(function () {
                    var full = 'RECOMMEND: RETRIEVE';
                    var recTextNode = document.createTextNode('');
                    rec.innerHTML = '';
                    rec.appendChild(recTextNode);

                    var i = full.length;
                    var step = function () {
                      if (i <= 0) {
                        recTextNode.textContent = '';
                        rec.classList.remove('glow');

                        if (dots) dots.classList.add('show');

                        setTimeout(function () {
                          if (dots) dots.classList.remove('show');
                          if (send) send.classList.add('show');

                          setTimeout(function () {
                            if (cow) cow.classList.add('nod');
                          }, 300);

                          var pressed = false;
                          var doPress = function () {
                            if (pressed) return;
                            pressed = true;
                            var stage = document.querySelector('.ch6-phone-stage');
                            if (stage) stage.insertAdjacentHTML('beforeend',
                              '<div class="ch6-sent">REPORT SENT.</div>');
                            setTimeout(function () {
                              ov.style.transition = 'opacity 1.1s ease';
                              ov.style.opacity = '0';
                              setTimeout(function () {
                                if (ov.parentNode) ov.remove();
                                done();
                              }, 1150);
                            }, 1100);
                          };
                          if (send) {
                            send.addEventListener('click', doPress, { once: true });
                            send.addEventListener('pointerdown', doPress, { once: true });
                          }
                          setTimeout(doPress, 1800);
                        }, 1000);
                        return;
                      }
                      i--;
                      recTextNode.textContent = full.slice(0, i);
                      setTimeout(step, 110);
                    };
                    step();

                  }, 1300);
                });
              }, 500);
            });
          }, 800);
        }, 800);
      });
    }, 3600);
  }

  /* ---------- Fade to black ---------- */
  function fadeToBlack(done) {
    injectCSS();
    var f = document.createElement('div');
    f.className = 'ch6-fade';
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
  window.startPostChapter6 = function (next) {
    injectCSS();

    showPostMatch([
      { who: null, r: [IMG.gump], sp: 'r', text: '...', tag: 'หอบแฮ่กๆ' },

      { who: 'โจ', l: [IMG.jo], r: [IMG.gump], sp: 'l', text: 'เหอะ! ผ่านมาได้ก็ดีไป' },
      { who: 'โจ', sp: 'l', text: 'แต่ก็ยังเลี้ยงตะลุยอยู่ดีนั่นแหละ' },
      { who: 'โจ', sp: 'l', text: '...ไปละ หมั่นไส้ทำเท่ห์อยู่คนเดียว' },
      { who: 'โจ', l: [IMG.eyeJo, IMG.jo], sp: 'l', text: '...',
        tag: 'มอง' + playerName() + 'แวบ 1 วิ' },
      { who: null, sp: 'l', text: '(หันหลัง · เดินออก)' },

      { who: 'มายา', r: [IMG.mayaSad], l: null, sp: 'r', text: '...',
        tag: 'หน้านิ่ง · ลังเล' },
      { who: 'มายา', sp: 'r', text: '(มือถือในมือ · แสงจอส่องหน้า)' }
    ], function () {

      playPhoneScene(function () {

        showPostMatch([
          { who: 'มายา', l: [IMG.maya], sp: 'l', text: '...', tag: 'มองหน้าจอ' },
          { who: 'มายา', sp: 'l', text: 'ฉันไม่รู้ว่าควรบอก' + playerName() + 'ไหม' },
          { who: 'มายา', sp: 'l', text: 'แต่... ยังไม่ถึงเวลา' }
        ], function () {
          fadeToBlack(next);
        }, 's6pm');

      });

    }, 's6pm');
  };

})();
