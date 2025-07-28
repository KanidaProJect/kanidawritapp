// inputPanel.js – ระบบกรอกข้อมูลทีละตอน ทีละเส้น
import { saveToMemory, getMemory } from './memoryStore.js';
import { getCurrentProject } from './projectManager.js';

const container = document.getElementById('input-panel-container');
let currentLine = 'hero'; // เริ่มจากเส้นตัวเอก
let episodeCount = 3; // เริ่มต้น 3 ตอนแรก

// 🔁 ฟังก์ชันหลัก: สร้างกล่องกรอกข้อมูล
export function renderInputPanel(lineName = 'hero', count = 3) {
  currentLine = lineName;
  episodeCount = count;
  container.innerHTML = ''; // เคลียร์ก่อน

  const title = document.createElement('h3');
  title.textContent = `🧵 กำลังเล่าเส้น: ${lineLabel(lineName)} (${count} ตอน)`;
  container.appendChild(title);

  for (let i = 1; i <= count; i++) {
    const episodeBox = createEpisodeBox(i);
    container.appendChild(episodeBox);
  }

  const controlRow = createControlButtons();
  container.appendChild(controlRow);
}

// 🧱 สร้างช่องกรอก 1 ตอน
function createEpisodeBox(episodeNum) {
  const wrapper = document.createElement('div');
  wrapper.className = 'episode-box';
  wrapper.style.marginBottom = '1.5rem';

  const label = document.createElement('label');
  label.textContent = `ตอนที่ ${episodeNum}`;
  label.style.fontWeight = 'bold';

  const textarea = document.createElement('textarea');
  textarea.placeholder = '📝 เล่าเหตุการณ์ที่เกิดกับตัวเอกในตอนนี้...';
  textarea.rows = 4;
  textarea.style.width = '100%';

  // โหลดค่าที่เคยบันทึกไว้
  const old = getMemory(getCurrentProject(), currentLine, `ตอนที่ ${episodeNum}`);
  if (old) textarea.value = old;

  const saveBtn = document.createElement('button');
  saveBtn.textContent = '💾 บันทึก';
  saveBtn.style.marginTop = '0.5rem';
  saveBtn.onclick = () => {
    const content = textarea.value.trim();
    saveToMemory(getCurrentProject(), currentLine, `ตอนที่ ${episodeNum}`, content);
    alert(`✅ บันทึกตอนที่ ${episodeNum} แล้วครับ`);
  };

  const skipBtn = document.createElement('button');
  skipBtn.textContent = '⏭️ ข้ามตอนนี้';
  skipBtn.style.marginLeft = '0.5rem';
  skipBtn.onclick = () => {
    alert(`ℹ️ ข้ามตอนที่ ${episodeNum} ไว้ก่อนครับ`);
  };

  wrapper.appendChild(label);
  wrapper.appendChild(textarea);
  wrapper.appendChild(saveBtn);
  wrapper.appendChild(skipBtn);

  return wrapper;
}

// 🧩 ปุ่มควบคุม เพิ่ม/ลด ตอน
function createControlButtons() {
  const row = document.createElement('div');
  row.style.marginTop = '1rem';

  const addBtn = document.createElement('button');
  addBtn.textContent = '➕ เพิ่มตอน';
  addBtn.onclick = () => {
    episodeCount++;
    renderInputPanel(currentLine, episodeCount);
  };

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '➖ ลบตอนท้าย';
  removeBtn.style.marginLeft = '1rem';
  removeBtn.onclick = () => {
    if (episodeCount > 1) {
      episodeCount--;
      renderInputPanel(currentLine, episodeCount);
    }
  };

  row.appendChild(addBtn);
  row.appendChild(removeBtn);
  return row;
}

// 🔤 แปลงรหัสเส้นให้เด็กอ่านง่าย
function lineLabel(key) {
  const map = {
    'hero': 'ตัวเอก',
    'villain': 'ตัวร้าย',
    'support': 'ตัวรอง',
    'subplot': 'ตัวเสริม',
    'twist': 'เหตุการณ์พลิกผัน',
    'setting': 'สถานที่หลัก'
  };
  return map[key] || key;
}
