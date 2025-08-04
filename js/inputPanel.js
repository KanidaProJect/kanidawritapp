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

  currentLine = lineName;
  episodeCount = count;
  container.innerHTML = '';

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

  const projectData = getCurrentProjectData();
  const oldContent = projectData?.episodes?.[episodeNum]?.strings?.hero || '';
  if (oldContent) textarea.value = oldContent;

  const saveBtn = document.createElement('button');
  saveBtn.textContent = '💾 บันทึก';
  saveBtn.style.marginTop = '0.5rem';
  saveBtn.onclick = () => {
    const content = textarea.value.trim();
    saveToProject(episodeNum, content);
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

function saveToProject(episodeNum, content) {
  const currentProjectName = getCurrentProjectName();
  const projectData = getCurrentProjectData();
  
  if (projectData && projectData.episodes) {
    if (!projectData.episodes[episodeNum]) {
      projectData.episodes[episodeNum] = {
        title: `ตอนที่ ${episodeNum}`,
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
    
    // บันทึกข้อมูลตามเส้นเรื่องที่เลือก (ในที่นี้คือ 'hero')
    // ถ้าต้องการบันทึกเส้นอื่น ต้องปรับโค้ดให้รองรับ
    projectData.episodes[episodeNum].strings.hero = content;

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
