/* ============================================================
   post/ch8.js — ฉากจบด่าน 8 (LOCKED POSITIONS · FINAL v2)
   - ล็อคพิกัด/ขนาดจาก [s8pm]
   - maya11: sc = 1.22 (แก้จาก 1.16 — ชดเชย outline padding)
   - ตัดระบบ edit/localStorage/drag ออกทั้งหมด
   - เรียกใช้: window.startPostChapter8(next)
   ============================================================ */
(function () {
  'use strict';

  /* ---------- inject CSS ---------- */
  if (!document.getElementById('ch8PostCSS')) {
    var st = document.createElement('style');
    st.id = 'ch8PostCSS';
    st.textContent = [
      '.speechbox{background:linear-gradient(165deg,#2a1a3a,#150c22);',
        'border:1.5px solid rgba(255,180,80,.4);',
        'border-radius:16px 16px 16px 4px;padding:16px 18px;position:relative;',
        'box-shadow:0 0 0 1px rgba(0,0,0,.4),0 12px 32px rgba(0,0,0,.55)}',
      '.speechbox::before{content:\'\';position:absolute;left:26px;top:-9px;width:16px;height:16px;',
        'background:linear-gradient(165deg,#2a1a3a,#150c22);',
        'border-left:1px solid rgba(255,180,80,.4);',
        'border-top:1px solid rgba(255,180,80,.35);transform:rotate(45deg)}',
      '.spkname{font-family:"Kanit",sans-serif;font-weight:900;color:#ff8a3d;',
        'font-size:14px;letter-spacing:.4px}',

      '.pm-ov{position:fixed;inset:0;z-index:9999;background:transparent;',
        'display:flex;flex-direction:column;',
        'justify-content:flex-end;align-items:center;',
        'padding:14px 14px calc(18px + env(safe-area-inset-bottom,0px));',
        'cursor:pointer;opacity:0;animation:pmFade .25s ease forwards;',
        'user-select:none;-webkit-user-select:none}',
      '.pm-stage{position:relative;flex:1;min-height:0;width:100%;max-width:560px;overflow:hidden}',
      '.pm-slot{position:absolute;bottom:0;height:100%;width:52%;',
        'display:flex;align-items:flex-end;pointer-events:none}',
      '.pm-slot.l{left:0;justify-content:flex-start}',
      '.pm-slot.r{right:0;justify-content:flex-end}',
      '.pm-slot.c{left:0;width:100%;justify-content:center;transform:translateX(20px);}',
      '.pm-port{max-height:62vh;max-width:100%;object-fit:contain;',
        'filter:drop-shadow(0 10px 26px rgba(0,0,0,.6));',
        'animation:pmInL .35s ease-out both;transition:filter .2s;',
        'transform-origin:50% 100%;touch-action:none}',
      '.pm-slot.r .pm-port,.pm-port.r{animation-name:pmInR}',
      '.pm-port.dim{filter:drop-shadow(0 10px 26px rgba(0,0,0,.6)) brightness(.72)}',
      '.pm-box{width:min(560px,100%);flex:none;margin-top:14px;position:relative;',
        'transform-origin:50% 100%;}',
      '.pm-box[data-anchor="r"]::before{left:auto;right:26px}',
      '.pm-box[data-anchor="c"]::before{left:50%;margin-left:-8px}',
      '.pm-box[data-anchor="none"]::before{display:none}',
      '.pm-box p{margin-top:8px;line-height:1.7}',
      '.pm-tap{margin-top:8px;font-size:12px;opacity:.6;text-align:right}',
      '@keyframes pmFade{to{opacity:1}}',
      '@keyframes pmInL{from{opacity:0;transform:translate(calc(-36px + var(--pmx,0px)),var(--pmy,0px)) scale(var(--pms,1))}to{opacity:1;transform:translate(var(--pmx,0px),var(--pmy,0px)) scale(var(--pms,1))}}',
      '@keyframes pmInR{from{opacity:0;transform:translate(calc(36px + var(--pmx,0px)),var(--pmy,0px)) scale(var(--pms,1))}to{opacity:1;transform:translate(var(--pmx,0px),var(--pmy,0px)) scale(var(--pms,1))}}',

      '.ch8-fade{position:fixed;inset:0;background:#000;z-index:10000;',
        'opacity:0;transition:opacity 2s ease;pointer-events:none;}'
    ].join('');
    document.head.appendChild(st);
  }

  /* ---------- util ---------- */
  function playerName(){ return 'กัมป์'; }

  /* ============================================================
     PM_LOCKED_POS — FINAL
     - maya11: sc = 1.22 (ชดเชย padding รอบตัวจาก outline)
     ============================================================ */
  var PM_LOCKED_POS = {
    's8pm_l__gump4':   { dx:-1.7777786254882812, dy:9.17327880859375,     sc:0.84 },
    's8pm_r__jo':      { dx:9.545150756835938,   dy:1.63580322265625,    sc:0.92 },
    's8pm_r__vik1224': { dx:-10.776519775390625, dy:34.5882568359375,    sc:1.72 },
    's8pm_l__gump5':   { dx:0,                   dy:0,                    sc:0.84 },
    's8pm_r__vik12':   { dx:-13.1156005859375,   dy:30.475799560546875,  sc:1.64 },
    's8pm_r__maya6':   { dx:11.893402099609375,  dy:7.431243896484375,   sc:1.16 },
    's8pm_r__maya11':  { dx:11.893402099609375,  dy:7.431243896484375,   sc:1.22 },  /* ← +5% */
    's8pm_r__maya12':  { dx:13.4600830078125,    dy:11.9822998046875,    sc:1.24 },
    's8pm_c':          { dx:0, dy:0, sc:1 },
    's8pm_box':        { dx:0, dy:0, sc:1 }
  };

  function pmKey(slot,imgId){ return (window.__pmScene||'pm')+'_'+slot+(imgId?('__'+imgId):''); }
  function pmImgId(img){ return img?(''+img).split('/').pop().replace(/\.[^.]+$/,'').toLowerCase():''; }
  function pmCurImg(slot){ var p=(window.__pmPorts||{})[slot]; return p&&p[0]; }
  function pmPos(slot){
    var id=pmImgId(pmCurImg(slot));
    return PM_LOCKED_POS[pmKey(slot,id)]
        || PM_LOCKED_POS[pmKey(slot)]
        || {dx:0,dy:0,sc:1};
  }

  function pmApplyPos(){
    var ov=document.querySelector('.pm-ov'); if(!ov)return;
    ['l','c','r'].forEach(function(s){
      var slot=ov.querySelector('.pm-slot.'+s), im=slot&&slot.querySelector('.pm-port'); if(!im)return;
      var p=pmPos(s);
      im.style.setProperty('--pmx', p.dx+'px');
      im.style.setProperty('--pmy', p.dy+'px');
      im.style.setProperty('--pms', p.sc);
    });
    var box=ov.querySelector('.pm-box');
    if(box){
      var p=pmPos('box');
      box.style.transform='translate('+p.dx+'px,'+p.dy+'px) scale('+p.sc+')';
    }
  }

  /* ============================================================
     Post-match renderer
     ============================================================ */
  function showPostMatch(script,next,cls){
    var old=document.querySelector('.pm-ov'); if(old)old.remove();
    window.__pmIdx=0;
    window.__pmNext=next;
    window.__pmScript=script;
    window.__pmScene=cls||'pm';
    document.getElementById('app').insertAdjacentHTML('beforeend',
      '<div class="pm-ov'+(cls?' '+cls:'')+'" onclick="pmTap()">'+
        '<div class="pm-stage">'+
          '<div class="pm-slot l"></div>'+
          '<div class="pm-slot c"></div>'+
          '<div class="pm-slot r"></div>'+
        '</div>'+
        '<div class="pm-box speechbox"></div>'+
      '</div>');
    pmRender();
  }

  function pmRender(){
    var ov=document.querySelector('.pm-ov'); if(!ov)return;
    var d=(window.__pmScript||[])[window.__pmIdx]; if(!d)return;
    window.__pmAt=Date.now();

    var P = window.__pmIdx===0
      ? (window.__pmPorts={l:null,c:null,r:null})
      : (window.__pmPorts||(window.__pmPorts={l:null,c:null,r:null}));
    ['l','c','r'].forEach(function(s){ if(d[s]!==undefined) P[s]=d[s]; });

    ['l','c','r'].forEach(function(s){
      var slot=ov.querySelector('.pm-slot.'+s), imgs=P[s], key=imgs?imgs.join('|'):'';
      if(slot.dataset.k!==key){
        slot.dataset.k=key;
        slot.innerHTML = imgs
          ? '<img class="pm-port'+(d.cr&&s==='c'?' r':'')+'"'+
              ' src="'+imgs[0]+'" alt="" draggable="false"'+
              ' data-alt="'+imgs.slice(1).join('|')+'"'+
              ' onerror="pmImgFail(this)">'
          : '';
      }
      var im=slot.firstElementChild;
      if(im) im.classList.toggle('dim', !!d.sp && d.sp!==s);
    });

    pmApplyPos();

    var box=ov.querySelector('.pm-box');
    var nm=d.who||(playerName()+(d.tag?' ('+d.tag+')':''));
    var isGumpWho=!d.who||d.who.indexOf(playerName())===0;

    box.style.borderColor = (d.think||isGumpWho) ? 'rgba(61,242,255,.35)' : '';
    box.style.borderStyle = d.think ? 'dashed' : '';
    box.dataset.anchor    = d.sp||'c';

    var spkCol = isGumpWho ? '#3df2ff'
               : d.who.indexOf('มายา')===0 ? '#ff8ad8'
               : d.who.indexOf('โจ')===0    ? '#ff9a3d'
               : (d.who.indexOf('โค้ช')===0||d.who.indexOf('วิค')>=0) ? '#ff334b'
               : '';
    box.innerHTML =
      '<span class="spkname"'+(spkCol?' style="color:'+spkCol+'"':'')+'>'+nm+'</span>'+
      '<p>'+d.text+'</p>'+
      '<div class="pm-tap">แตะหน้าจอเพื่อไปต่อ ▶</div>';
  }

  function pmImgFail(img){
    try{ console.warn('[PM] โหลดรูปไม่สำเร็จ:', img.getAttribute('src'),
      '| scene:', window.__pmScene, '| idx:', window.__pmIdx); }catch(_){}
    var a=(img.dataset.alt||'').split('|').filter(Boolean);
    if(a.length){ img.dataset.alt=a.slice(1).join('|'); img.src=a[0]; }
    else img.remove();
  }

  function pmTap(){
    if(Date.now()-(window.__pmAt||0)<280) return;
    window.__pmIdx++;
    if(window.__pmIdx>=(window.__pmScript||[]).length){
      var ov=document.querySelector('.pm-ov'); if(ov)ov.remove();
      var n=window.__pmNext; window.__pmNext=null; if(n)n();
      return;
    }
    pmRender();
  }

  window.pmTap     = pmTap;
  window.pmImgFail = pmImgFail;

  /* ---------- fade to black ---------- */
  function fadeToBlack(done){
    var f=document.createElement('div');
    f.className='ch8-fade';
    document.body.appendChild(f);
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){ f.style.opacity='1'; });
    });
    setTimeout(function(){
      if(f.parentNode) f.remove();
      if(typeof done==='function') done();
    },2100);
  }

  /* ============================================================
     post/ch8 — เนื้อเรื่อง
     ============================================================ */
  var IMG = {
    jo:        'Jo.webp',
    maya6:     'Maya6.webp',
    maya11:    'Maya11.webp',
    maya12:    'Maya12.webp',
    gump4:     'Gump4.webp',
    gump5:     'Gump5.webp',
    vik1224:   'Vik1224.webp',
    gumpTired: 'watermarked_img_2602130333836877845.png',
    vik:       'Vik.webp',
    vik12:     'Vik12.webp'
  };

  window.startPostChapter8 = function (next) {
    showPostMatch([
      { who: 'กัมป์', tag: 'หอบ 💦',          l: [IMG.gump4],     sp: 'l', text: '...' },
      { who: 'โจ',                            r: [IMG.jo],        sp: 'r', text: 'แกไม่ทำตามวิคเลย ' },
      { who: 'กัมป์',                         l: [IMG.gump4],     sp: 'l', text: 'ผมอยากเล่นกับทุกคน...' },
      { who: 'โจ',                            r: [IMG.jo],        sp: 'r', text: '...ไอ้เวร 😒' },
      { who: 'โจ',                            r: [IMG.jo],        sp: 'r', text: 'กูเข้าใจแล้ว ' },
      { who: 'วิค',   tag: 'เดินเข้ามา',        r: [IMG.vik1224],   sp: 'r', text: 'ทำไมไม่ทำตามข้า 😡' },
      { who: 'กัมป์',                         l: [IMG.gump5],     sp: 'l', text: 'ผมไม่ได้อยากเป็นอาวุธ ' },
      { who: 'วิค',   tag: 'กำหมัดแน่น 💢',     r: [IMG.vik12],     sp: 'r', text: '...' },
      { who: 'วิค',   tag: 'ปล่อยมือ ',         r: [IMG.vik12],     sp: 'r', text: '...' },
      { who: 'วิค',   tag: 'ถอนหายใจ 😮‍💨',    r: [IMG.vik12],     sp: 'r', text: '...' },
      { who: 'วิค',                            r: [IMG.vik12],     sp: 'r', text: 'เอ็งเป็นนักบอล ⚽' },
      { who: 'วิค',   tag: 'หันหลังเดินออก ',   r: [IMG.vik12],     sp: 'r', text: '...' },
      { who: 'มายา',  tag: 'มือถือสั่น, กดปิด 📳', r: [IMG.maya6], sp: 'r', text: '...' },
      { who: 'มายา',                          r: [IMG.maya11],    sp: 'r', text: '...ไม่เปิด 📵' },
      { who: 'มายา',                          r: [IMG.maya12],    sp: 'r', text: '(...ฉันอยากเป็นตัวเองบ้าง) ✨', think: true },
      { who: 'กัมป์',                         l: [IMG.gump4],     sp: 'l', text: '(...ผมเลือกเอง) ', think: true }
    ], function () {
      fadeToBlack(next);
    }, 's8pm');
  };
})();
