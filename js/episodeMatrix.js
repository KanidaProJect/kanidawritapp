// js/episodeMatrix.js

import { loadProject, saveProject } from "./memoryStore.js";

// แสดงฟอร์มตอนที่เลือก
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
      <textarea id="input-couple" placeholder="เช่น: พบกันโดยบังเอิญระหว่างเหตุชุลมุนในตลาดดอย...">${ep.strings.couple}</textarea>

      <label>ตัวรอง:</label>
      <textarea id="input-sub" placeholder="เช่น: เพื่อนพระเอกเข้ามาเตือนบางอย่าง / ตัวร้ายเริ่มปรากฏ">${ep.strings.sub}</textarea>

      <label>ตัวเสริม:</label>
      <textarea id="input-extra" placeholder="เช่น: เด็กเล็กในหมู่บ้านถามคำถามชวนฉุกคิด / ชาวบ้านคนเฒ่าพูดเตือนใจ">${ep.strings.extra}</textarea>

      <label>บรรยากาศ:</label>
      <textarea id="input-tone" placeholder="เช่น: เย็นยะเยือก ฝนตกเบา ๆ / อึดอัด แต่แฝงด้วยความหวัง">${ep.strings.tone}</textarea>

      <label>เวลา (ในเรื่อง):</label>
      <textarea id="input-time" placeholder="เช่น: เช้าวันถัดมา / สองวันก่อนถึงพิธี">${ep.strings.time}</textarea>

      <label>สถานที่:</label>
      <textarea id="input-setting" placeholder="เช่น: ข้างกองไฟกลางป่า / โรงเรียนบนดอย / หน้าศาลาเก่า">${ep.strings.setting}</textarea>

      <button id="save-episode">💾 บันทึก</button>
    </div>
  `;

  const container = document.getElementById("episodeForm");
  container.innerHTML = formHTML;

  // บันทึกข้อมูล
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
