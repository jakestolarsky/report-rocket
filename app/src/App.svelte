<script>
	import PersonList from './components/PersonList.svelte';
	import HamburgerMenu from './components/HamburgerMenu.svelte';
	import ToggleSwitch from './components/ToggleSwitch.svelte';
	import Toast from './components/Toast.svelte';

	import { toasts } from './toastStore.js';
	import { people, projectName } from './store.js';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';

	let report = '';
	let nameOfProject = get(projectName);

	let isEditMode = false;

	function handleEditMode(event){
		isEditMode = event.detail;
	}

	function generateReport() {
		const items = get(people);
		const url = localStorage.getItem("savedWebhook") || "";
		projectName.set(nameOfProject);
		report = items.map(item => `[ ${item.name} ]\n${item.tasks}\n_________`).join('\n');

		const payload = {
		key: report,
		project: nameOfProject
		};

		fetch(url, {
			method: 'POST',
			body: JSON.stringify(payload)
		})
		.then(resp => {
			if (resp.status == 401) {
				toasts.add({
					message: 'Bad webhook. Check again if you entered correctly.',
					type: 'error',
					duration: 4000
				});
			}
			else if(resp.status == 200) {
				toasts.add({
					message: 'Report generated successfully!',
					type: 'success',
					duration: 3000
				});
			}
			})
		.catch((error) => {
			toasts.add({
				message: 'Failed to generate report. Please try again.',
				type: 'error',
				duration: 3000
			});
		});
	}

	$: {
		localStorage.setItem('people', JSON.stringify(get(people)));
	}
	onMount(() => {
		const savedPeople = localStorage.getItem('people');
		if (savedPeople) {
			people.set(JSON.parse(savedPeople));
		}
	});

</script>

<main>

	<div class="top-bar">
		<HamburgerMenu />
		<ToggleSwitch on:isEditModeChange={handleEditMode} />
	</div>


	<div style="display: flex; flex-direction: column; align-items: center;">
        <input
			class="project-input"
			id="projectName"
			type="text"
			placeholder="Name of project.."
			bind:value={nameOfProject}
			/>
	</div>

	<PersonList {isEditMode} />
	<div class="container">
		<button class="btn-generate" on:click={generateReport}>Generate Report</button>
	</div>

	{#each $toasts as toast (toast)}
		<Toast {...toast} />
  	{/each}

	<!--
		<pre>{report}</pre>
	-->
</main>
<style>
	.top-bar{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.project-input {
        margin: 20px;
		color: #010101;
		background-color: rgb(197, 193, 190);
		border-radius: 10px;
		transition: border 0.1s;
		font-family: "Source Code Pro", monospace;
    }
	.project-input:focus {
      border: 5px solid #e96e26;
    }
	.btn-generate {
		width: 200px;
		height: 60px;
		color: #c5c1be;
		background-color: rgba(0, 0, 0, 0);
		border-style: solid;
		border: 3px solid #938bee;
        border-radius: 10px;
		cursor: pointer;
		font-size: 1em;
		font-weight: bold;
		font-family: 'Poppins', sans-serif;
		text-transform: uppercase;
		transition: all 0.1s;
		align-self: center;
	}
	.btn-generate:hover {
		background-color: #938bee;
  		color: #010101;
  		font-size: 1.1em;
	}
	.btn-generate:focus {
		border: 5px solid #e96e26;
		background-color: #938bee;
  		color: #010101;
  		font-size: 1.1em;
	}
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	:global(body) {
		background-color: #010101;
		font-family: "Poppins", sans-serif;
	}
</style>