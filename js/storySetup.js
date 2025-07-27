import { saveProject, setCurrentProject } from './projectManager.js';

// ฟังก์ชันสำหรับตั้งค่าพล็อตเรื่องใหม่
export function setupStory() {
  const name = prompt("📘 ตั้งชื่อโปรเจกต์นิยาย:");
  if (!name) return;

  const duration = prompt("🕰️ เรื่องนี้กินเวลากี่วัน/เดือน/ปี?");
  if (!duration) return;

  const totalEpInput = prompt("🎬 จำนวนตอนทั้งหมด (เช่น 5, 10):");
  const totalEpisodes = parseInt(totalEpInput, 10);
  if (isNaN(totalEpisodes) || totalEpisodes <= 0) {
    alert("❌ ต้องใส่ตัวเลขจำนวนตอนให้ถูกต้อง");
    return;
  }

  // โครงสร้างข้อมูลโปรเจกต์เริ่มต้น
  const projectData = {
    duration: duration,
    totalEpisodes: totalEpisodes,
    episodes: {} // ยังไม่มีตอนใด ๆ
  };

  // บันทึกลง storage
  saveProject(name, projectData);

  // บอกระบบว่าเรากำลังใช้โปรเจกต์นี้
  setCurrentProject(name);

  alert(`✅ สร้างโปรเจกต์ "${name}" สำเร็จแล้ว\n📌 ความยาวเรื่อง: ${duration}\n📄 จำนวนตอน: ${totalEpisodes}`);
}
 window.setupStory = setupStory;
