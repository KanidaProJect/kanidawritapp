// js/uiBinder.js
import { getProjects, saveProject, deleteProject } from "./projectManager.js";

export function initUI() {
  document.getElementById("createBtn").onclick = () => {
    const name = prompt("ชื่อโปรเจกต์ใหม่:");
    if (saveProject(name)) {
      alert("สร้างโปรเจกต์สำเร็จ");
      renderProjectList();
    } else {
      alert("ไม่สามารถสร้างโปรเจกต์ (อาจชื่อซ้ำหรือว่าง)");
    }
  };

  document.getElementById("loadBtn").onclick = () => {
    renderProjectList();
  };

  document.getElementById("deleteBtn").onclick = () => {
    const name = prompt("ลบโปรเจกต์ชื่ออะไร:");
    if (deleteProject(name)) {
      alert("ลบแล้ว");
      renderProjectList();
    } else {
      alert("ไม่พบโปรเจกต์นี้");
    }
  };
}

function renderProjectList() {
  const list = document.getElementById("projectList");
  const projects = getProjects();
  list.innerHTML = Object.keys(projects)
    .map(name => `<li>${name}</li>`)
    .join("");
}
