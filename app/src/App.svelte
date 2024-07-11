<script>
	import PersonList from './components/PersonList.svelte';
	import HamburgerMenu from './components/HamburgerMenu.svelte';
	import { people, projectName, webhookUrl } from './store.js';
	import { get } from 'svelte/store';

	let report = '';
	let nameOfProject = get(projectName);

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
		});
	}

</script>

<main>

	<HamburgerMenu />

	<div style="display: flex; flex-direction: column; align-items: center;">
        <input
			class="project-input"
			id="projectName"
			type="text"
			placeholder="Name of project.."
			bind:value={nameOfProject}
			/>
	</div>

	<PersonList />
	<div class="container">
		<button class="btn-generate" on:click={generateReport}>Generate Report</button>
	</div>

	<pre>{report}</pre>
</main>
<style>
	.project-input {
        margin: 20px;
		color: #010101;
		background-color: rgb(197, 193, 190);
		border-radius: 10px;
		transition: border 0.1s;
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