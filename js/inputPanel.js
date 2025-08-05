// public/js/inputPanel.js
import { saveProject, getCurrentProjectName, getCurrentProjectData } from './projectManager.js';

const container = document.getElementById('input-panel-container');
let currentLine = 'hero';
let episodeCount = 3;

export function renderInputPanel(lineName = 'hero', count = 3) {
  const currentProjectName = getCurrentProjectName();
  if (!currentProjectName) {
    container.innerHTML = '<p>⚠️ กรุณาสร้างหรือเปิดโปรเจกต์ก่อนเริ่มเขียนพล็อต</p>';
    return;
  }

  const projectData = getCurrentProjectData();
  if (projectData && projectData.totalEpisodes) {
    episodeCount = projectData.totalEpisodes;
  }

  currentLine = lineName;
  container.innerHTML = '';

  const title = document.createElement('h3');
  title.textContent = `🧵 กำลังเล่าเส้น: ${lineLabel(lineName)} (${episodeCount} ตอน)`;
  container.appendChild(title);

  for (let i = 0; i < episodeCount; i++) { // แก้ไข loop ให้เริ่มจาก 0
    const episodeBox = createEpisodeBox(i);
    container.appendChild(episodeBox);
  }

  // ลบปุ่มเพิ่ม/ลบตอนออก เพราะตอนนี้จำนวนตอนถูกกำหนดจาก storySetup
  // const controlRow = createControlButtons();
  // container.appendChild(controlRow);
}

function createEpisodeBox(episodeNum) {
  const wrapper = document.createElement('div');
  wrapper.className = 'episode-box';
  wrapper.style.marginBottom = '1.5rem';

  const label = document.createElement('label');
  label.textContent = `ตอนที่ ${episodeNum + 1}`; // แสดงผลเป็น ตอนที่ 1, 2, 3...
  label.style.fontWeight = 'bold';

  const textarea = document.createElement('textarea');
  textarea.placeholder = '📝 เล่าเหตุการณ์ที่คุณต้องการใส่ในพล็อตที่นี่...';
  textarea.rows = 4;
  textarea.style.width = '100%';

  const projectData = getCurrentProjectData();
  const oldContent = projectData?.episodes?.[episodeNum]?.strings?.[currentLine] || ''; // แก้ไขการเข้าถึงข้อมูล
  if (oldContent) textarea.value = oldContent;

  const saveBtn = document.createElement('button');
  saveBtn.textContent = '💾 บันทึก';
  saveBtn.style.marginTop = '0.5rem';
  saveBtn.onclick = () => {
    const content = textarea.value.trim();
    saveToProject(episodeNum, content);
    alert(`✅ บันทึกตอนที่ ${episodeNum + 1} แล้วครับ`);
  };

  const skipBtn = document.createElement('button');
  skipBtn.textContent = '⏭️ ข้ามตอนนี้';
  skipBtn.style.marginLeft = '0.5rem';
  skipBtn.onclick = () => {
    alert(`ℹ️ ข้ามตอนที่ ${episodeNum + 1} ไว้ก่อนครับ`);
  };

  wrapper.appendChild(label);
  wrapper.appendChild(textarea);
  wrapper.appendChild(saveBtn);
  wrapper.appendChild(skipBtn);

  return wrapper;
}

function saveToProject(episodeNum, content) {
  const currentProjectName = getCurrentProjectName();
  const projectData = getCurrentProjectData();
  
  if (projectData && projectData.episodes) {
    if (!projectData.episodes[episodeNum]) {
      // สร้างตอนใหม่ถ้ายังไม่มี
      projectData.episodes[episodeNum] = {
        title: `ตอนที่ ${episodeNum + 1}`,
        timeframe: "",
        strings: {
          couple: "",
          sub: "",
          extra: "",
          tone: "",
          time: "",
          setting: ""
        }
      };
    }
    
    // บันทึกข้อมูลตามเส้นเรื่องที่เลือก
    projectData.episodes[episodeNum].strings[currentLine] = content;

    saveProject(currentProjectName, projectData);
    return true;
  }
  return false;
}

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
