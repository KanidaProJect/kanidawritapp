// js/episodeMatrix.js
import { loadProject, saveProject, getCurrentProjectName } from "./projectManager.js";

export function editEpisode() {
  const projectName = getCurrentProjectName();
  if (!projectName) {
    alert("❗ กรุณาเลือกโปรเจกต์ก่อน");
    return;
  }
  const project = loadProject(projectName);
  if (!project) {
    alert("❗ ไม่พบโปรเจกต์ที่เลือก");
    return;
  }
  const episodeCount = Object.keys(project.episodes).length;
  if (episodeCount === 0) {
    alert("❗ โปรเจกต์นี้ยังไม่มีตอน");
    return;
  }

  const episodeIndex = parseInt(prompt(`🔢 หมายเลขตอนที่ต้องการแก้ไข (มีทั้งหมด ${episodeCount} ตอน):`));
  if (!isNaN(episodeIndex) && episodeIndex >= 0 && episodeIndex < episodeCount) {
    renderEpisodeForm(projectName, episodeIndex);
  } else {
    alert("❌ ต้องกรอกหมายเลขตอนให้ถูกต้อง");
  }
}

function renderEpisodeForm(projectName, episodeIndex) {
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

      <label>คู่พระ-นาง:</label>
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

  const container = document.getElementById("episodeFormContainer");
  if (!container) {
    alert("❌ ไม่พบ container ชื่อ episodeFormContainer ในหน้า HTML");
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
