// js/projectManager.js

const STORAGE_KEY = "kanida_projects";

// 📦 โหลดโปรเจกต์ทั้งหมดในเครื่อง
export function getProjects() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

// 📝 สร้างและบันทึกโปรเจกต์ใหม่
export function saveProject(name, data) {
  const all = getProjects();
  all[name] = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

// 📥 โหลดโปรเจกต์เดียวตามชื่อ
export function loadProject(name) {
  const all = getProjects();
  return all[name] || null;
}

// 🗑️ ลบโปรเจกต์ตามชื่อ
export function deleteProject(name) {
  const all = getProjects();
  if (all[name]) {
    delete all[name];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return true;
  }
  return false;
}

// 🔎 ตรวจสอบว่าโปรเจกต์นี้มีอยู่หรือยัง
export function projectExists(name) {
  const all = getProjects();
  return !!all[name];
}

// 📃 ดึงรายชื่อโปรเจกต์ทั้งหมด (array)
export function listProjectNames() {
  return Object.keys(getProjects());
}
