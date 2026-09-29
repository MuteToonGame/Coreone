/* ============================================================
   📌 S5 Post-Match — Locked Script & Positions
   ------------------------------------------------------------
   วิธีใช้ (3 ขั้นตอน):

   1) ใน index.html หา `const S5_POST=[` แล้วแทนที่ด้วย S5_POST ด้านล่าง
   2) ใน index.html หา `const PM_LOCKED_POS={` แล้วอัปเดตค่า s5pm_* ตาม PM_LOCKED_POS_S5PM
   3) ใน pmRender() หาบรรทัด:
        if(d.shake&&d.sp===s)pmTrembleStart(s);else if(PM_TREMBLE&&PM_TREMBLE.slot===s)pmTrembleStop()
      แทนด้วย 3 บรรทัดใน PMRENDER_PATCH ล่างสุด
   ============================================================ */

/* ===== 1) S5_POST — ล็อคชุดบทพูด + shake ครบ ===== */
const S5_POST = [
  {who:null,             c:['Gump4.webp'],   sp:'c', tag:'หอบหนัก', text:'...'},
  {who:'โค้ชวิค',         r:['Eyecod3.webp'], sp:'r', text:'...'},
  {who:'โค้ชวิค (ในใจ)',  r:['Eyecod3.webp'], sp:'r', think:true, text:'(...เจ้านี่ใช้แบบนี้เอง หึหึ...)'},
  {who:'โจ',              r:['Jo.webp'],      sp:'r', text:'เฮ้ย! ยิงอัดจนไอฮีโร่นั่นกระเด็น!'},
  {who:null,                                  sp:'c', text:'เพราะพี่แม็คสอนไว้'},
  {who:'โจ',              r:['Jo.webp'],      sp:'r', shake:'c',  text:'ขาสั่นนะ'},   // ⬅ เพิ่ม shake:'c' (กัมป์สั่น)
  {who:null,                                  sp:'c', shake:true, text:'ช่างมัน'},   // เดิมมีอยู่แล้ว
  {who:'มายา',            l:['Mayasad.webp'], r:null, c:null, sp:'l', text:'...'}
];

/* ===== 2) PM_LOCKED_POS_S5PM — ค่าล็อกจาก editor (วางทับใน PM_LOCKED_POS) ===== */
const PM_LOCKED_POS_S5PM = {
  s5pm_r__jo:      {dx:-189.8312530517578,  dy:-19.520172119140625, sc:0.92},
  s5pm_r__eyecod3: {dx:-85.69233703613281,  dy:-165.7249526977539,  sc:2.12},
  s5pm_l__mayasad: {dx:220.79998016357422,  dy:8.37322998046875,    sc:0.84},
  s5pm_box:        {dx:-0.5513458251953125, dy:1.06671142578125,    sc:1.06},
  s5pm_c:          {dx:94.40690612792969,   dy:-16.818084716796875, sc:0.84},
  s5pm_r:          {dx:-185.38680267333984, dy:-24.71112060546875,  sc:1}
};

/* ===== 3) PMRENDER_PATCH — 3 บรรทัดที่ต้องใช้แทนบรรทัด shake ใน pmRender() =====
   ⚠ ปัญหาเดิม: `d.sp===s` บังคับให้สั่นได้แค่ slot ที่ "คนพูด" ยืนอยู่
   ✅ ใหม่: รองรับ 2 โหมด
        · shake:true     → สั่น slot เดียวกับ d.sp (เดิม)
        · shake:'c'      → สั่น slot ที่ระบุ (แยกจากคนพูดได้)
*/
const PMRENDER_PATCH = [
  "const shkSlot = (d.shake===true) ? d.sp : d.shake;",
  "if(shkSlot && shkSlot===s) pmTrembleStart(s);",
  "else if(PM_TREMBLE && PM_TREMBLE.slot===s) pmTrembleStop();"
].join("\n");

/* ===== debug export (ไม่บังคับ — ลบได้) ===== */
if (typeof window !== 'undefined') {
  window.S5_POST = S5_POST;
  window.PM_LOCKED_POS_S5PM = PM_LOCKED_POS_S5PM;
  console.log('%c📌 s5-post.js loaded', 'color:#ffd54a;font-weight:bold');
  console.log('  • S5_POST → ตัด drag, ล็อคชุดบท, เพิ่ม shake:"c" ที่ "ขาสั่นนะ"');
  console.log('  • PM_LOCKED_POS_S5PM → 6 คีย์ อัปเดตตำแหน่ง s5pm');
  console.log('  • PMRENDER_PATCH → วางแทนบรรทัด shake ใน pmRender()');
}
