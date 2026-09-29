/* ============================================================================
   pre8.js — Stage 8 Pre-Match Cutscene (Argentina)
   ----------------------------------------------------------------------------
   • พิกัดตัวละคร + กล่องข้อความ ถูกล็อคตายตัว (ไม่มี edit / drag / resize)
   • ไม่มีหางกล่องข้อความ (speech tail)
   • รูปภาพมี guard: ถ้าไฟล์ปลายทางไม่มี จะคงภาพเดิม ไม่ทำให้ตัวละครหาย
   • ใช้งาน: <script src="pre8.js"></script>
   ============================================================================ */
(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     🔒 พิกัดล็อค (จากที่จัดไว้)
     -------------------------------------------------------------------------- */
  const POSE = {
    chars: {
      jo:    { dx:   9.0434, dy:   -1.8368, sc: 1.08 },
      coach: { dx:  16.4184, dy: -178.6059, sc: 1.48 },
      gump:  { dx:   0,      dy:    0,      sc: 0.84 },
      maya:  { dx:  75.7559, dy: -146.7427, sc: 1.00 }
    },
    boxes: {
      coach: { lx: 35.8229, ly: 20.1584, sc: 1 },
      jo:    { lx:  1.3883, ly: 54.6632, sc: 1 },
      gump:  { lx: 57.9442, ly: 54.9530, sc: 1 },
      maya:  { lx: 56.9847, ly: 16.4415, sc: 1 }
    }
  };

  const NAME = { coach: 'โค้ชวิค', jo: 'โจ', gump: 'กัมป์', maya: 'มายา' };

  /* --------------------------------------------------------------------------
     🎬 บทพูด
     -------------------------------------------------------------------------- */
  const S8_PRE = [
    /* Beat 1 · Vik สั่ง */
    { k: 'coach', text: 'อาร์เจนตินาเล่นด้วยสัญชาตญาณ', vik: 'Vik.webp',    flip: false },
    { k: 'coach', text: 'แต่ข้าอ่านพวกมันออก',           vik: 'Vik.webp',    flip: false },

    /* Beat 1 · Vik หันมากัมป์ */
    { k: 'coach', text: 'กัมป์',             focus: 'gump', vik: 'Vik122.webp',  flip: true, swap: { gump: 'Gump5.webp' } },
    { k: 'coach', text: 'เอ็งต้องเชื่อข้า',   focus: 'gump', vik: 'Vik122.webp',  flip: true },
    { k: 'coach', text: 'ข้าจะบอกทุกจังหวะ', focus: 'gump', vik: 'Vik122.webp',  flip: true },
    { k: 'coach', text: 'ห้ามคิดเอง',         focus: 'gump', vik: 'Vik122.webp',  flip: true },

    /* Beat 2 · โจค้าน */
    { k: 'jo',    text: 'โค้ช นี่มัน...',      focus: 'jo' },
    { k: 'coach', text: 'เงียบ',               focus: 'jo', vik: 'Vik1224.webp', flip: false },
    { k: 'coach', text: 'เอ็งไม่ได้ลง',         focus: 'jo', vik: 'Vik1224.webp', flip: false, swap: { jo: 'Jo1.webp' } },
    { k: 'jo',    text: 'หา!?',                focus: 'jo' },
    { k: 'coach', text: 'นั่งดูอยู่ข้างสนาม',   focus: 'jo', vik: 'Vik1224.webp', flip: false },
    { k: 'coach', text: 'ดูให้เห็นว่า...',     focus: 'jo', vik: 'Vik1224.webp', flip: false },
    { k: 'coach', text: 'อาวุธที่ดี ต้องเป็นยังไง', focus: 'jo', vik: 'Vik1224.webp', flip: false },
    { k: 'jo',    text: '...', sub: '(กัดฟัน)', focus: 'jo', think: true },

    /* Beat 3 · กัมป์เงียบ (zoom) */
    { k: 'gump',  text: '...',                  focus: 'gump', think: true, zoom: true },
    { k: 'gump',  text: '(...อาวุธ...)',          focus: 'gump', think: true, zoom: true },
    { k: 'gump',  text: '(...เมื่อก่อนกระสุน...)', focus: 'gump', think: true, zoom: true },
    { k: 'gump',  text: '(...ตอนนี้... อาวุธ)',    focus: 'gump', think: true, zoom: true },

    /* Beat 4 · มายา */
    { k: 'maya',  text: 'Data อาร์เจนตินาคือ...',   focus: 'maya' },
    { k: 'coach', text: 'พอ',                     focus: 'maya', vik: 'Vik1223.webp', flip: false, swap: { maya: 'Maya11.webp' } },
    { k: 'coach', text: 'ไปเตรียมตัว',              focus: 'maya', vik: 'Vik1223.webp', flip: false },
    { k: 'maya',  text: '...', sub: '(กดแท็บเล็ตต่อ)', focus: 'maya' },
    { k: 'maya',  text: '(...เขาเปลี่ยนคำอีกแล้ว)', focus: 'maya', think: true },
    { k: 'maya',  text: '(...กระสุน... อาวุธ...)',  focus: 'maya', think: true },
    { k: 'maya',  text: '(...น่าสนใจ)',            focus: 'maya', think: true },

    /* Beat 5 · ปิดฉาก */
    { k: 'gump',  text: '(...ผม...)',              focus: 'gump', think: true, swap: { gump: 'Gump4.webp' } },
    { k: 'gump',  text: '(...ผมอยากเล่น)',          focus: 'gump', think: true },
    { k: 'jo',    text: '(...ไอ้เวร...)',           focus: 'jo',   think: true },
    { k: 'jo',    text: '(...... ทนไม่ไหวแล้วโว้ย)', focus: 'jo',   think: true },

    { end: true }
  ];

  /* --------------------------------------------------------------------------
     🎨 CSS (inject)
     -------------------------------------------------------------------------- */
  const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@500;700;900&family=Rajdhani:wght@600;700&display=swap');

.s8-wrap{
  position:fixed;inset:0;z-index:9999;
  display:flex;justify-content:center;align-items:stretch;
  background:#050308;
  font-family:"Rajdhani","Segoe UI",system-ui,"Noto Sans Thai",sans-serif;
  color:#eaf6f0;
  -webkit-user-select:none;user-select:none;
}
.s8-stage{
  position:relative;width:100%;max-width:480px;height:100dvh;overflow:hidden;
  background:#07101f;isolation:isolate;cursor:pointer;touch-action:none;
}
@media(min-width:600px){
  .s8-wrap{padding:14px}
  .s8-stage{height:min(calc(100dvh - 28px),900px);border-radius:20px 20px 20px 4px;
    border:1.5px solid rgba(255,255,255,.2);
    box-shadow:0 0 0 1px rgba(255,255,255,.06),0 24px 70px rgba(0,0,0,.65)}
}

/* 🖼️ พื้นหลัง */
.s8-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 55%;z-index:0;
  filter:saturate(.9) brightness(.85);background:#07101f}
.s8-scrim{position:absolute;inset:0;z-index:1;pointer-events:none;
  background:linear-gradient(180deg,rgba(6,12,24,.32) 0%,rgba(6,12,24,0) 35%,rgba(4,4,10,.6) 100%)}

/* 👥 ตัวละคร */
.s8-chars{position:absolute;inset:0;z-index:2}
.s8-char{
  position:absolute;bottom:0;pointer-events:none;
  transform:translate(var(--dx,0px), var(--dy,0px)) scale(var(--sc,1));
  transform-origin:50% 100%;
  transition:opacity .3s ease, filter .3s ease, transform .28s cubic-bezier(.2,.8,.2,1);
  will-change:transform;
}
.s8-char.jo    { left:0%;   bottom:0;   width:26%; z-index:3 }
.s8-char.coach { left:32%;  bottom:0;   width:32%; z-index:3 }
.s8-char.gump  { right:0%;  bottom:0;   width:28%; z-index:3 }
.s8-char.maya  { right:23%; bottom:20%; width:22%; z-index:2 }

.s8-char img{
  display:block;width:100%;height:auto;
  filter:drop-shadow(0 10px 22px rgba(0,0,0,.65));
  transition:transform .35s cubic-bezier(.2,.8,.2,1);
  transform-origin:50% 100%;
}
.s8-char.dim{opacity:.42;filter:brightness(.62) saturate(.85)}
.s8-char.focus img{transform:translateY(-4px) scale(1.04)}
.s8-char.zoomed img{transform:translateY(-6px) scale(1.08)}
.s8-char.flip img{transform:scaleX(-1)}
.s8-char.flip.focus img{transform:translateY(-4px) scale(1.04) scaleX(-1)}
.s8-char.flip.zoomed img{transform:translateY(-6px) scale(1.08) scaleX(-1)}
.s8-char.zoomed{z-index:5}

/* 💬 กล่องข้อความ — ไม่มีหาง, แยกของใครของมัน */
.s8-box{
  position:absolute;z-index:20;
  min-width:160px;max-width:230px;
  padding:9px 12px 8px;border-radius:14px;
  background:rgba(12,10,22,.94);border:1.5px solid var(--bc,#ffd54a);color:#fff;
  font-size:13px;line-height:1.55;
  box-shadow:0 8px 22px rgba(0,0,0,.6);
  pointer-events:none;
  opacity:0;visibility:hidden;
  transform:scale(var(--sc,1));
  transform-origin:0% 100%;
  transition:opacity .2s ease, visibility .2s ease, transform .2s ease;
}
.s8-box.show{opacity:1;visibility:visible}
.s8-box.pop{animation:s8Pop .22s ease both}
@keyframes s8Pop{0%{opacity:0}100%{opacity:1}}

.s8-box .nm{display:block;font-family:"Kanit",sans-serif;font-size:11px;font-weight:900;
  letter-spacing:.3px;color:var(--bc);margin-bottom:2px}
.s8-box .tx{display:block}
.s8-box .sub{display:block;opacity:.7;font-size:11px;margin-top:3px;font-style:italic}
.s8-box.think{border-style:dashed;font-style:italic}
.s8-box.think .nm{font-style:normal}
.s8-box.k-coach{--bc:#ff334b}
.s8-box.k-jo   {--bc:#ff9a3d}
.s8-box.k-gump {--bc:#3df2ff}
.s8-box.k-maya {--bc:#ff8ad8}

/* 🎬 เฟดดำปิดฉาก */
.s8-fade{position:absolute;inset:0;z-index:60;pointer-events:none;background:#000;opacity:0;
  transition:opacity 1s ease}
.s8-fade.on{opacity:1}
.s8-fade .title{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);
  text-align:center;font-family:"Kanit",sans-serif;font-weight:900;font-size:22px;
  color:#8fd0ff;letter-spacing:2px;opacity:0;transition:opacity .6s .5s}
.s8-fade.on .title{opacity:1}

/* ปุ่มข้าม */
.s8-skip{position:absolute;top:calc(env(safe-area-inset-top,0px) + 10px);right:12px;z-index:70;
  background:rgba(0,0,0,.6);color:#fff;border:1px solid rgba(255,255,255,.4);
  border-radius:20px;padding:6px 14px;font-size:13px;font-weight:700;cursor:pointer;
  backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}

/* 💡 hint */
.s8-hint{position:absolute;bottom:calc(env(safe-area-inset-bottom,0px) + 10px);right:14px;z-index:25;
  font-size:11px;color:#fff;opacity:.55;letter-spacing:.5px;pointer-events:none;
  animation:s8Hint 1.6s ease-in-out infinite}
@keyframes s8Hint{0%,100%{opacity:.35}50%{opacity:.75}}

@media(max-height:600px){
  .s8-box{font-size:12px;padding:8px 10px 7px}
  .s8-box .nm{font-size:10px}
}
`;

  /* --------------------------------------------------------------------------
     🧱 HTML (inject)
     -------------------------------------------------------------------------- */
  const HTML = `
<div class="s8-wrap">
  <div class="s8-stage" id="s8Stage">
    <img class="s8-bg" src="World.webp" alt="" onerror="this.style.opacity='0'">
    <div class="s8-scrim"></div>

    <div class="s8-chars">
      <div class="s8-char maya"><img src="Maya12.webp" alt="" draggable="false" onerror="this.style.opacity='0'"></div>
      <div class="s8-char jo"   ><img src="Jo.webp"    alt="" draggable="false" onerror="this.style.opacity='0'"></div>
      <div class="s8-char coach"><img src="Vik.webp"   alt="" draggable="false" onerror="this.style.opacity='0'"></div>
      <div class="s8-char gump" ><img src="Gump4.webp" alt="" draggable="false" onerror="this.style.opacity='0'"></div>
    </div>

    <div class="s8-box" data-box="coach"></div>
    <div class="s8-box" data-box="jo"></div>
    <div class="s8-box" data-box="gump"></div>
    <div class="s8-box" data-box="maya"></div>

    <div class="s8-fade"><div class="title">STAGE 8 · 🇦🇷 อาร์เจนตินา</div></div>

    <div class="s8-hint">แตะเพื่อไปต่อ ▶</div>
    <button class="s8-skip">ข้าม ▶</button>
  </div>
</div>
`;

  /* --------------------------------------------------------------------------
     🖼️ IMAGE GUARD — กันภาพหาย
     -------------------------------------------------------------------------- */
  const IMG_OK = {};
  function probeImage(src, cb) {
    if (!src) return cb(false);
    if (IMG_OK[src] !== undefined) return cb(IMG_OK[src]);
    const t = new Image();
    t.onload  = () => { IMG_OK[src] = true;  cb(true);  };
    t.onerror = () => {
      IMG_OK[src] = false;
      console.warn('[S8] image not found:', src);
      cb(false);
    };
    t.src = src;
  }
  function swapImg(root, key, src) {
    const img = root.querySelector('.s8-char.' + key + ' img');
    if (!img || !src) return;
    if (img.getAttribute('src') === src) { img.style.opacity = '1'; return; }
    probeImage(src, ok => {
      if (!ok) return;                 // ❌ ไฟล์ไม่มี → คงภาพเดิมไว้
      img.src = src;
      img.style.opacity = '1';
    });
  }

  /* --------------------------------------------------------------------------
     🚀 BOOT
     -------------------------------------------------------------------------- */
  function boot() {
    /* 1) inject CSS */
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    /* 2) inject HTML */
    const holder = document.createElement('div');
    holder.innerHTML = HTML.trim();
    const wrap  = holder.firstElementChild;
    const stage = wrap.querySelector('#s8Stage');
    document.body.appendChild(wrap);

    /* 3) ใส่พิกัดล็อคลงตัวละคร + กล่องข้อความ */
    Object.keys(POSE.chars).forEach(k => {
      const el = stage.querySelector('.s8-char.' + k);
      if (!el) return;
      const p = POSE.chars[k];
      el.style.setProperty('--dx', p.dx + 'px');
      el.style.setProperty('--dy', p.dy + 'px');
      el.style.setProperty('--sc', p.sc);
    });
    Object.keys(POSE.boxes).forEach(k => {
      const el = stage.querySelector('.s8-box[data-box="' + k + '"]');
      if (!el) return;
      const p = POSE.boxes[k];
      el.style.left = p.lx + '%';
      el.style.top  = p.ly + '%';
      el.style.setProperty('--sc', p.sc);
    });

    /* 4) preload รูปทั้งหมด เพื่อรู้ล่วงหน้าว่าอันไหนหาย */
    const pool = new Set();
    S8_PRE.forEach(b => {
      if (b.vik) pool.add(b.vik);
      if (b.swap) Object.values(b.swap).forEach(s => pool.add(s));
    });
    pool.forEach(src => probeImage(src, () => {}));

    /* 5) helpers */
    const boxEl  = k => stage.querySelector('.s8-box[data-box="' + k + '"]');
    const charEl = k => stage.querySelector('.s8-char.' + k);
    const BOX_KEYS = ['coach', 'jo', 'gump', 'maya'];
    const CHAR_KEYS = ['jo', 'coach', 'gump', 'maya'];

    function fillBox(speaker, d) {
      const box = boxEl(speaker);
      if (!box) return;
      box.className = 's8-box k-' + speaker + (d.think ? ' think' : '');
      const nm = NAME[speaker] + (d.think ? ' (ในใจ)' : '');
      let html = '<span class="nm">' + nm + '</span>' +
                 '<span class="tx">' + d.text + '</span>';
      if (d.sub) html += '<span class="sub">' + d.sub + '</span>';
      box.innerHTML = html;
    }

    function showOnly(speaker) {
      BOX_KEYS.forEach(k => {
        const el = boxEl(k);
        if (!el) return;
        el.classList.toggle('show', k === speaker);
      });
    }

    /* 6) render */
    let idx  = -1;
    let busy = false;

    function render() {
      const d = S8_PRE[idx];
      if (!d) return;
      if (d.end) return finish();

      /* กล่องข้อความของผู้พูด */
      fillBox(d.k, d);
      showOnly(d.k);
      const box = boxEl(d.k);
      box.classList.remove('pop');
      void box.offsetWidth;
      box.classList.add('pop');

      /* Vik เปลี่ยนภาพ + flip */
      if (d.vik) swapImg(stage, 'coach', d.vik);
      const coach = charEl('coach');
      if (coach) coach.classList.toggle('flip', !!d.flip);

      /* เปลี่ยนภาพตัวละครอื่น */
      if (d.swap) Object.keys(d.swap).forEach(k => swapImg(stage, k, d.swap[k]));

      /* โฟกัส + ซูม */
      CHAR_KEYS.forEach(k => {
        const el = charEl(k);
        if (!el) return;
        const isFocus = d.focus === k;
        el.classList.toggle('dim',    k !== 'coach' && !!d.focus && !isFocus);
        el.classList.toggle('focus',  isFocus || k === 'coach');
        el.classList.toggle('zoomed', isFocus && !!d.zoom);
      });
    }

    function tap() {
      if (busy) return;
      busy = true;
      setTimeout(() => { busy = false; }, 160);
      idx++;
      if (idx >= S8_PRE.length) return finish();
      render();
    }

    function finish() {
      const fade = stage.querySelector('.s8-fade');
      const hint = stage.querySelector('.s8-hint');
      if (hint) hint.style.display = 'none';
      if (fade) fade.classList.add('on');
      setTimeout(() => {
        stage.onclick = () => {
          stage.style.transition = 'opacity .4s ease';
          stage.style.opacity = '0';
          setTimeout(() => { wrap.style.display = 'none'; }, 420);
        };
      }, 1200);
    }

    function skipAll() {
      stage.style.transition = 'opacity .3s ease';
      stage.style.opacity = '0';
      setTimeout(() => { wrap.style.display = 'none'; }, 320);
    }

    /* 7) events */
    stage.addEventListener('click', tap);
    const skip = stage.querySelector('.s8-skip');
    if (skip) skip.addEventListener('click', e => { e.stopPropagation(); skipAll(); });

    /* 8) go */
    tap();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
