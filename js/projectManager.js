// js/projectManager.js

const STORAGE_KEY = "kanida_projects";

export function getProjects() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

export function saveProject(name) {
  const projects = getProjects();
  if (!name || projects[name]) return false;

  projects[name] = {
    projectName: name,
    strings: {
      protagonist: {},
      antagonist: {},
      support: {},
      emotion: {},
      twist: {},
      setting: {}
    }
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  return true;
}

export function deleteProject(name) {
  const projects = getProjects();
  if (!projects[name]) return false;

  delete projects[name];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  return true;
}
