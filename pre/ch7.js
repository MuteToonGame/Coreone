// ประกาศฟังก์ชันให้ index.html เรียกใช้เมื่อเริ่มด่าน 7
window.startPreChapter7 = function(onComplete) {
  
  // 1. สร้าง HTML โครงสร้างฉากแทรกลงใน #app (เพื่อให้ทับ UI ของเกมได้พอดี)
  const html = `
  <div class="modal s2p-modal" id="s7Modal">
    <div class="s2p-stage" id="s2pStage" onclick="s7Tap()">
      <img class="s2p-art" src="Troom.webp" alt="" onerror="this.style.background='linear-gradient(165deg,#1a1226,#0a0614)'">
      <div class="s2p-box" id="s2pBox"></div>
      <button class="s2p-skip" onclick="event.stopPropagation();s7Skip()">ข้าม ▶</button>
    </div>
  </div>`;
  document.getElementById('app').insertAdjacentHTML('beforeend', html);

  // 2. พิกัดและบทพูดเดิมของคุณ (ไม่ปรับแก้ใดๆ)
  const S7_PRE_POS = {
    coach: { x: 13.4, y: 30 },
    jo:    { x: 0,    y: 50 },
    maya:  { x: 10,   y: 40 },
    gump:  { x: 38,   y: 40 }
  };

  const S7_PRE = [
    {k:'coach', who:'โค้ชวิค', text:'สเปนเล่นติกี-ตากาแบบใหม่... มีคนคิดให้'},
    {k:'jo',    who:'โจ',      text:'ใคร?'},
    {k:'coach', who:'โค้ชวิค', text:'...'},
    {k:'maya',  who:'มายา',    text:'มันจะล็อคท่าที่เราใช้บ่อย'},
    {k:'gump',  who:null, say:true, text:'ต้องสลับท่า'},
    {k:'maya',  who:'มายา',    text:'ใช่'},
    {k:'coach', who:'โค้ชวิค', text:'สเปนรวม 11 คนเป็นหนึ่งเดียว'},
    {k:'coach', who:'โค้ชวิค', text:'เอ็ง... กัมป์'},
    {k:'coach', who:'โค้ชวิค', text:'ต้องยิงให้ได้', cut:'eye'},
    {k:'jo',    who:'โจ',      text:'หา?! แล้วผม...'},
    {k:'coach', who:'โค้ชวิค', text:'ถอย'},
    {k:'coach', who:'โค้ชวิค', text:'ป้องกัน'},
    {k:'jo',    who:'โจ',      text:'โค้ช! นี่มัน...'},
    {k:'coach', who:'โค้ชวิค', text:'กระสุนมีไว้ยิง'},
    {k:'jo',    who:'โจ',      text:'...'},
    {k:'coach', who:'โค้ชวิค', text:'ไปเตรียมตัว'},
    {k:'gump',  who:null, text:'(.....กระสุน!?)'}
  ];

  let idx = 0;

  // 3. ฟังก์ชัน Render ของเดิม
  function render() {
    const d = S7_PRE[idx];
    if(!d) return window.s7Skip();

    const b     = document.getElementById('s2pBox');
    const stage = document.getElementById('s2pStage');
    if(!b || !stage) return;

    const pos   = S7_PRE_POS[d.k] || {x:20, y:40};

    clearTimeout(window.__s7CutT);

    b.className = 's2p-box s2p-' + d.k;
    b.style.left = pos.x + '%';
    b.style.top  = pos.y + '%';

    const nm = d.who || ('กัมป์' + (d.say ? '' : ' (ในใจ)'));
    b.innerHTML = '<span class="s2p-nm">'+nm+'</span><p>'+d.text+'</p>'+
                  '<div class="s2p-tap"><span>แตะเพื่อไปต่อ ▶</span></div>';

    stage.querySelectorAll('.s7cutfx, .s7cut').forEach(x => x.remove());

    if(d.cut === 'eye'){
      stage.insertAdjacentHTML('beforeend',
        '<div class="s7cutfx"></div>' +
        '<div class="s7cut"><img src="Eyecod3.webp" alt="" draggable="false" ' +
        'onerror="this.parentElement.remove()"></div>');

      b.classList.add('s7-cut-wait');
      window.__s7CutT = setTimeout(() => {
        b.classList.add('s7-ready');
      }, 780);
    }
  }

  // 4. ผูกคำสั่งคลิกและข้าม (แยกเป็น global เพื่อให้ปุ่ม HTML หาเจอ)
  window.s7Tap = function() { 
    idx++; 
    if(idx >= S7_PRE.length) return window.s7Skip(); 
    render(); 
  };

  window.s7Skip = function() { 
    const m = document.getElementById('s7Modal'); 
    if(m) m.remove(); 
    
    if(onComplete) onComplete(); // ส่งสัญญาณให้เกมเปิดกระดานเริ่มสู้
    delete window.s7Tap;
    delete window.s7Skip;
  };

  // เริ่มวาดบทสนทนาแรก
  render();
};
