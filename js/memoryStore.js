// js/memoryStore.js

const STORAGE_KEY = "kanida_projects";

// โหลดโปรเจกต์ทั้งหมดในระบบ
export function loadAllProjects() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

// โหลดโปรเจกต์ตามชื่อ
export function loadProject(name) {
  const all = loadAllProjects();
  return all[name] || null;
}

// บันทึกข้อมูลโปรเจกต์ (ทับชื่อเดิม)
export function saveProject(name, data) {
  const all = loadAllProjects();
  all[name] = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

// ลบโปรเจกต์
export function deleteProject(name) {
  const all = loadAllProjects();
  delete all[name];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

// ตรวจสอบว่าชื่อโปรเจกต์ซ้ำไหม
export function projectExists(name) {
  const all = loadAllProjects();
  return !!all[name];
}
