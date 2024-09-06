import { writable, get } from 'svelte/store';

export const people = writable([]);
export const projectName = writable('');
export const appInfo = writable({ version: '', author: { name: '', url: '' } });

export async function loadData(file) {
  const data = await file.text();
  const jsonData = JSON.parse(data);
  people.set(jsonData.people);
  projectName.set(jsonData.projectName);
}

async function loadAppInfo() {
  const response = await fetch('/about.json');
  const data = await response.json();
  appInfo.set(data);
}

function loadFromLocalStorage() {
	const savedPeople = localStorage.getItem('people');

	if (savedPeople) {
		people.set(JSON.parse(savedPeople));
	}
}

async function initialize() {
	loadFromLocalStorage();

	if (get(people).length === 0) {
		const response = await fetch('/data.json');
		const data = await response.json();
		people.set(data.people);
	}

	loadAppInfo();
}

people.subscribe(value => {
	if (value.length > 0) {
		localStorage.setItem('people', JSON.stringify(value));
	}
});


initialize();