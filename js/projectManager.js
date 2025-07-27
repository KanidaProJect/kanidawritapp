const STORAGE_KEY = "kanida_projects";

// 🧠 โปรเจกต์ที่กำลังใช้งาน
let currentProjectName = null;

//
// 📦 โหลดโปรเจกต์ทั้งหมด
//
export function getProjects() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

//
// 📝 บันทึกโปรเจกต์ใหม่หรืออัปเดต
//
export function saveProject(name, data) {
  const all = getProjects();
  all[name] = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

//
// 📥 โหลดโปรเจกต์เดียว
//
export function loadProject(name) {
  const all = getProjects();
  return all[name] || null;
}

//
// 🗑️ ลบโปรเจกต์
//
export function deleteProject(name) {
  const all = getProjects();
  if (all[name]) {
    delete all[name];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    // ถ้าลบโปรเจกต์ที่กำลังใช้งาน → ล้าง
    if (currentProjectName === name) {
      currentProjectName = null;
    }
    return true;
  }
  return false;
}

//
// 🔎 ตรวจสอบว่าโปรเจกต์นี้มีอยู่ไหม
//
export function projectExists(name) {
  const all = getProjects();
  return !!all[name];
}

//
// 📃 รายชื่อโปรเจกต์ทั้งหมด
//
export function listProjectNames() {
  return Object.keys(getProjects());
}

//
// 🎯 เซ็ตโปรเจกต์ที่ใช้งานอยู่
//
export function setCurrentProject(name) {
  currentProjectName = name;
}

//
// 🎯 ดูชื่อโปรเจกต์ปัจจุบัน
//
export function getCurrentProjectName() {
  return currentProjectName;
}

//
// 📥 โหลดข้อมูลโปรเจกต์ปัจจุบัน
//
export function getCurrentProjectData() {
  if (!currentProjectName) return null;
  return loadProject(currentProjectName);
}

//
// 💾 บันทึกตอน (episode) ลงในโปรเจกต์ปัจจุบัน
//
export function saveEpisodeToCurrentProject(epNum, epData) {
  if (!currentProjectName) {
    alert("ยังไม่ได้เลือกโปรเจกต์");
    return false;
  }

  const project = loadProject(currentProjectName);
  if (!project) {
    alert("ไม่พบข้อมูลโปรเจกต์");
    return false;
  }

  if (!project.episodes) project.episodes = {};
  project.episodes[epNum] = epData;

  saveProject(currentProjectName, project);
  return true;
}
