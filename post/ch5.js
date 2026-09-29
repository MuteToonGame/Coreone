/* ============================================================
   📌 ด่าน 5 — เนื้อเรื่องหลังจบเกม (post/ch5.js)
   โหลดโดย index.html → เรียกผ่าน window.startPostChapter5(next)
   ============================================================ */
(function(){
  const S5_POST = [
    {who:null,             c:['Gump4.webp'],   sp:'c', tag:'หอบหนัก', text:'...'},
    {who:'โค้ชวิค',         r:['Eyecod3.webp'], sp:'r', text:'...'},
    {who:'โค้ชวิค (ในใจ)',  r:['Eyecod3.webp'], sp:'r', think:true, text:'(...เจ้านี่ใช้แบบนี้เอง หึหึ...)'},
    {who:'โจ',              r:['Jo.webp'],      sp:'r', text:'เฮ้ย! ยิงอัดจนไอฮีโร่นั่นกระเด็น!'},
    {who:null,                                  sp:'c', text:'เพราะพี่แม็คสอนไว้'},
    {who:'โจ',              r:['Jo.webp'],      sp:'r', shake:'c',  text:'ขาสั่นนะ'},   // กัมป์สั่น
    {who:null,                                  sp:'c', shake:true, text:'ช่างมัน'},
    {who:'มายา',            l:['Mayasad.webp'], r:null, c:null, sp:'l', text:'...'}
  ];

  // ตำแหน่งตัวละครที่ล็อกจาก editor (ทับค่าใน PM_LOCKED_POS)
  const POS = {
    s5pm_r__jo:      {dx:-189.8312530517578,  dy:-19.520172119140625, sc:0.92},
    s5pm_r__eyecod3: {dx:-85.69233703613281,  dy:-165.7249526977539,  sc:2.12},
    s5pm_l__mayasad: {dx:220.79998016357422,  dy:8.37322998046875,    sc:0.84},
    s5pm_box:        {dx:-0.5513458251953125, dy:1.06671142578125,    sc:1.06},
    s5pm_c:          {dx:94.40690612792969,   dy:-16.818084716796875, sc:0.84},
    s5pm_r:          {dx:-185.38680267333984, dy:-24.71112060546875,  sc:1}
  };
  try{ if(typeof PM_LOCKED_POS!=='undefined') Object.assign(PM_LOCKED_POS, POS); }catch(e){ console.warn('ch5: apply pos failed', e); }

  window.S5_POST = S5_POST;
  window.startPostChapter5 = function(next){
    return showPostMatch(S5_POST, next, 's5pm');
  };
})();
