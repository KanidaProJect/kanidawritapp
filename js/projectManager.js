// js/projectManager.js

const STORAGE_KEY = "kanida_projects";
let currentProjectName = null;

// 🧠 จัดการสถานะของโปรเจกต์ปัจจุบัน
export function getCurrentProjectName() {
  return currentProjectName;
}

export function setCurrentProject(name) {
  currentProjectName = name;
  // TODO: เพิ่มการเรียกฟังก์ชัน renderUI ที่นี่ เพื่อให้หน้าเว็บรีเฟรชเมื่อเปลี่ยนโปรเจกต์
  // ตัวอย่าง: renderInputPanel('hero', 3);
}

export function getCurrentProjectData() {
  if (!currentProjectName) return null;
  return loadProject(currentProjectName);
}

// 📦 จัดการการบันทึก/โหลดข้อมูลจาก localStorage
export function getProjects() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

export function saveProject(name, data) {
  const all = getProjects();
  all[name] = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function loadProject(name) {
  const all = getProjects();
  return all[name] || null;
}

export function deleteProject(name) {
  const all = getProjects();
  if (all[name]) {
    delete all[name];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    if (currentProjectName === name) {
      currentProjectName = null;
    }
    return true;
  }
  return false;
}

export function projectExists(name) {
  const all = getProjects();
  return !!all[name];
}

export function listProjectNames() {
  return Object.keys(getProjects());
}

// 🎯 ฟังก์ชันสำหรับ UI
export function newProject() {
  const name = prompt("📁 ตั้งชื่อโปรเจกต์ใหม่:");
  if (!name) return;

  if (projectExists(name)) {
    alert("❗ โปรเจกต์นี้มีอยู่แล้ว");
    return;
  }

  const newData = {
    duration: "ยังไม่กำหนด",
    totalEpisodes: 1,
    episodes: {
      0: {
        title: "ตอนที่ 1",
        timeframe: "",
        strings: {
          couple: "",
          sub: "",
          extra: "",
          tone: "",
          time: "",
          setting: ""
        }
      }
    }
  };

  saveProject(name, newData);
  setCurrentProject(name);
  alert(`✅ สร้างโปรเจกต์ "${name}" เรียบร้อยแล้ว`);
}

export function loadProjectUI() {
  const projectNames = listProjectNames();
  if (projectNames.length === 0) {
    alert("❗ ไม่มีโปรเจกต์ที่บันทึกไว้");
    return;
  }

  const choice = prompt(`📂 เลือกโปรเจกต์ที่ต้องการเปิด:\n${projectNames.map((name, i) => `${i + 1}. ${name}`).join('\n')}\n\nกรุณาใส่หมายเลข:`);
  const index = parseInt(choice, 10) - 1;

  if (!isNaN(index) && index >= 0 && index < projectNames.length) {
    const selectedName = projectNames[index];
    setCurrentProject(selectedName);
    alert(`✅ เปิดโปรเจกต์ "${selectedName}" เรียบร้อยแล้ว`);
  } else {
    alert("❌ กรุณาใส่หมายเลขให้ถูกต้อง");
  }
}
