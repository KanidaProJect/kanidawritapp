// js/episodeMatrix.js

import { loadProject, saveProject } from "./projectManager.js";

// ฟังก์ชันหลักที่ render ฟอร์ม
export function renderEpisodeForm(projectName, episodeIndex) {
  const project = loadProject(projectName);
  if (!project) {
    alert("ไม่พบโปรเจกต์");
    return;
  }

  const ep = project.episodes[episodeIndex];
  if (!ep) {
    alert("ไม่พบตอนที่ระบุ");
    return;
  }

  const formHTML = `
    <div class="form-box">
      <h3>${ep.title} <span style="font-weight: normal; color: #555;">(${ep.timeframe})</span></h3>

      <label>พระ-นาง:</label>
      <textarea id="input-couple">${ep.strings.couple}</textarea>

      <label>ตัวรอง:</label>
      <textarea id="input-sub">${ep.strings.sub}</textarea>

      <label>ตัวเสริม:</label>
      <textarea id="input-extra">${ep.strings.extra}</textarea>

      <label>บรรยากาศ:</label>
      <textarea id="input-tone">${ep.strings.tone}</textarea>

      <label>เวลา (ในเรื่อง):</label>
      <textarea id="input-time">${ep.strings.time}</textarea>

      <label>สถานที่:</label>
      <textarea id="input-setting">${ep.strings.setting}</textarea>

      <button id="save-episode">💾 บันทึก</button>
    </div>
  `;

  const container = document.getElementById("episodeForm");
  if (!container) {
    alert("❌ ไม่พบ container ชื่อ episodeForm ในหน้า HTML");
    return;
  }

  container.innerHTML = formHTML;

  document.getElementById("save-episode").onclick = () => {
    ep.strings.couple = document.getElementById("input-couple").value.trim();
    ep.strings.sub = document.getElementById("input-sub").value.trim();
    ep.strings.extra = document.getElementById("input-extra").value.trim();
    ep.strings.tone = document.getElementById("input-tone").value.trim();
    ep.strings.time = document.getElementById("input-time").value.trim();
    ep.strings.setting = document.getElementById("input-setting").value.trim();

    saveProject(projectName, project);
    alert("💾 บันทึกตอนนี้เรียบร้อยแล้ว");
  };
}

// ✅ เพิ่ม editEpisode สำหรับเรียกแบบง่ายจาก index.html
export function editEpisode() {
  const projectName = prompt("📂 ชื่อโปรเจกต์ที่ต้องการแก้:");
  const episodeIndex = parseInt(prompt("🔢 หมายเลขตอน (เริ่มจาก 0):"));
  if (projectName && !isNaN(episodeIndex)) {
    renderEpisodeForm(projectName.trim(), episodeIndex);
  } else {
    alert("❌ ต้องกรอกชื่อและหมายเลขตอนให้ถูกต้อง");
  }
}
