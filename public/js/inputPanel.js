// inputPanel.js
import { saveToMemory, getMemory } from './memoryStore.js';
import { getCurrentProject } from './projectManager.js';

const container = document.getElementById('input-panel-container');
if (!container) {
  throw new Error('Container #input-panel-container not found.');
}

let currentLine = 'hero';
let episodeCount = 3;

export function renderInputPanel(lineName = 'hero', count = 3) {
  currentLine = lineName;
  episodeCount = count;
  container.innerHTML = '';

  const title = document.createElement('h3');
  title.textContent = `Line: ${lineLabel(lineName)} (${count} episodes)`;
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
  label.textContent = `Episode ${episodeNum}`;
  label.style.fontWeight = 'bold';

  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Describe the main character’s event in this episode...';
  textarea.rows = 4;
  textarea.style.width = '100%';

  const project = getCurrentProject();
  if (!project) return wrapper;

  const old = getMemory(project, currentLine, `ตอนที่ ${episodeNum}`);
  if (old) textarea.value = old;

  const saveBtn = document.createElement('button');
  saveBtn.textContent = '💾 Save';
  saveBtn.style.marginTop = '0.5rem';
  saveBtn.onclick = () => {
    const content = textarea.value.trim();
    saveToMemory(project, currentLine, `ตอนที่ ${episodeNum}`, content);
    alert(`Saved episode ${episodeNum}`);
  };

  const skipBtn = document.createElement('button');
  skipBtn.textContent = '⏭️ Skip';
  skipBtn.style.marginLeft = '0.5rem';
  skipBtn.onclick = () => {
    alert(`Skipped episode ${episodeNum}`);
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
  addBtn.textContent = '➕ Add Episode';
  addBtn.onclick = () => {
    episodeCount++;
    renderInputPanel(currentLine, episodeCount);
  };

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '➖ Remove Last';
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

function lineLabel(key) {
  const map = {
    'hero': 'Main Character',
    'villain': 'Antagonist',
    'support': 'Supporting',
    'subplot': 'Subplot',
    'twist': 'Plot Twist',
    'setting': 'Setting'
  };
  return map[key] || key;
}
