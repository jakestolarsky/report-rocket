import { writable } from 'svelte/store';

export const people = writable([]);
export const webhookUrl = writable('');
export const projectName = writable('');
export const appInfo = writable({ version: '', author: { name: '', url: '' } });

export async function loadData(file) {
  const data = await file.text();
  const jsonData = JSON.parse(data);
  people.set(jsonData.people);
  webhookUrl.set(jsonData.webhookUrl);
  projectName.set(jsonData.projectName);
}

async function loadAppInfo() {
  const response = await fetch('/about.json');
  const data = await response.json();
  appInfo.set(data);
}

async function initialize() {
  const response = await fetch('/data.json');
  const data = await response.json();
  people.set(data.people);
  webhookUrl.set(data.webhookUrl);
  projectName.set(data.projectName);
  loadAppInfo();
}

initialize();