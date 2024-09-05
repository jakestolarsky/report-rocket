<script>
    import { people } from '../store.js';
    import { onMount } from 'svelte';

    export let isEditMode = false;

    function updateTask(personIndex, event) {
      people.update(p => {
        p[personIndex].tasks = event.target.value;
        saveToLocalStorage(p);
        return p;
      });
      resizeTextarea(event.target);
    }

    function updatePersonName(personIndex, event) {
		people.update(p => {
			p[personIndex].name = event.target.textContent.trim();
			saveToLocalStorage(p);
			return p;
		});
	  }

    function removePerson(index) {
      people.update(p => {
        p.splice(index, 1);
        saveToLocalStorage(p);
        return p;
      });
    }

    function addPerson() {
		people.update(p => {
			p.push({ name: 'New person', tasks: '' });
			saveToLocalStorage(p);
			return p;
		});
	}

	function movePersonUp(index) {
		if (index > 0) {
			people.update(p => {
				[p[index - 1], p[index]] = [p[index], p[index - 1]];
				saveToLocalStorage(p);
				return p;
			});
		}
	}

	function movePersonDown(index) {
		people.update(p => {
			if (index < p.length - 1) {
				[p[index], p[index + 1]] = [p[index + 1], p[index]];
				saveToLocalStorage(p);
			}
			return p;
		});
	}

	function saveToLocalStorage(peopleData) {
		localStorage.setItem('people', JSON.stringify(peopleData));
	}

	function loadFromLocalStorage() {
		const savedPeople = localStorage.getItem('people');
		if (savedPeople) {
			people.set(JSON.parse(savedPeople));
		}
	}

    function resizeTextarea(textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }

    onMount(() => {
      loadFromLocalStorage();
      document.querySelectorAll('textarea').forEach(resizeTextarea);
    });
  </script>

  <main>
    {#if isEditMode}
		  <button on:click={addPerson}>Dodaj pracownika</button>
	  {/if}

    {#each $people as person, personIndex}
      <div class="card-person">
        {#if isEditMode}
          <button on:click={() => removePerson(personIndex)}>x</button>
          <button on:click={() => movePersonUp(personIndex)}>▲</button>
          <button on:click={() => movePersonDown(personIndex)}>▼</button>
			  {/if}
        <p class="card-name"
          contenteditable={isEditMode}
          on:blur={(event) => updatePersonName(personIndex, event)}>
            {person.name}
          </p>
        <textarea
          class="card-textarea"
          bind:value={person.tasks}
          on:input={(event) => updateTask(personIndex, event)}
          placeholder="is working on.."
        ></textarea>
      </div>
    {/each}
  </main>

  <style>
    button {
		  margin: 5px;
	  }
    .card-person {
      margin: 20px;
      padding: 18px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
      background-color: rgb(147, 139, 238);
      border-style: solid;
      border-color: rgb(147, 139, 238);
      border-width: thin;
      border-radius: 10px;
    }
    .card-name {
      text-transform: uppercase;
      margin-bottom: 5px;
      margin-top: 0px;
      font-weight: bolder;
      font-size: x-large;
      color: #010101;
    }
    .card-textarea {
      color: #010101;
      margin: 0;
      width: calc(100% - 20px);
      background-color: rgb(197, 193, 190);
      resize: vertical;
      width: 100%;
      transition: border 0.1s;
      min-height: 50px;
      overflow: hidden;
      border-radius: 5px;
      font-family: "Source Code Pro", monospace;
    }
    .card-textarea:focus {
      border: 5px solid #e96e26;
    }
  </style>