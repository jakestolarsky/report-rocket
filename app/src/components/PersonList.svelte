<script>
    import { people } from '../store.js';
    import { onMount } from 'svelte';

    export let isEditMode = false;

    function loadFromLocalStorage() {
      const savedPeople = localStorage.getItem('people');
      if (savedPeople) {
        people.set(JSON.parse(savedPeople));
		  }
	  }

    function updateTask(personIndex, event) {
      people.update(p => {
        p[personIndex].tasks = event.target.value;
        saveToLocalStorage(p);
        return p;
      });
      resizeTextarea(event.target);
    }

    function clearTasks() {
      people.update(p => {
        p.forEach(person => {
          person.tasks = '';
        });
        saveToLocalStorage(p);
        return p;
      });
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
      <button class="clear-button" on:click={clearTasks}>
        <svg width="15px" height="15px" viewBox="0 0 800 800" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
            <g>
                <g transform="matrix(0.904869,0,0,0.904869,48.3418,27.7688)">
                    <path fill="rgb(197,193,190)" d="M432.76,290.722C432.623,289.741 432.549,288.746 432.538,287.744C432.473,281.524 434.895,275.536 439.266,271.111L705.868,1.189C707.271,-0.232 708.85,-1.466 710.568,-2.484C743.327,-21.904 777.696,-15.322 799.649,4.486C821.436,24.145 832.057,57.579 815.029,94.207C813.891,96.656 812.336,98.888 810.433,100.805L541.879,371.378C533.787,379.53 521.152,380.465 512.02,374.107L432.76,290.722Z"/>
                </g>
                <g transform="matrix(0.904869,0,0,0.904869,27.6616,48.449)">
                    <path fill="rgb(197,193,190)" d="M349.608,287.775C372.633,275.242 396.77,275.145 422.048,292.487C423.143,293.238 424.171,294.081 425.123,295.007L471.802,340.45C471.877,340.523 471.952,340.596 472.025,340.67L472.628,341.272L515.481,382.957C515.608,383.081 515.735,383.206 515.859,383.333C541.015,408.95 546.411,437.563 532.728,469.112L406.949,798.999C402.892,809.638 391.746,815.793 380.581,813.559C140.435,765.517 -25.645,593.992 -23.322,332.865C-23.257,325.559 -19.771,318.705 -13.905,314.349C-8.039,309.993 -0.471,308.637 6.542,310.687C124.593,345.187 238.383,358.22 338.461,294.92L338.467,294.916C341.718,292.464 345.037,290.31 348.355,288.448C348.499,288.368 348.644,288.288 348.79,288.21C348.79,288.21 349.54,287.81 349.608,287.775C349.614,287.772 349.615,287.771 349.608,287.775Z"/>
                </g>
            </g>
        </svg>

      </button>
	  {/if}

    {#each $people as person, personIndex}
      <div class="card-person">
        {#if isEditMode}
          <div class="top-bar-buttons">
            <button class="move-button up" on:click={() => movePersonUp(personIndex)}>▲</button>
            <button class="remove-button" on:click={() => removePerson(personIndex)}>x</button>
          </div>
			  {/if}
        <p
          class="card-name {isEditMode ? 'edit-mode' : ''}"
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
        {#if isEditMode}
          <button class="move-button down" on:click={() => movePersonDown(personIndex)}>▼</button>
        {/if}
      </div>
    {/each}

    {#if isEditMode}
      <button class="add-button" on:click={addPerson}>+</button>
    {/if}
  </main>

  <style>
    button {
      margin: 5px;
      background-color: #e96e26;
      color: rgb(197, 193, 190);
      border: none;
      border-radius: 50%;
      width: 30px;
      height: 30px;
	  }
    .add-button, .clear-button {
        display: block;
        margin: 20px auto;
        width: 35px;
        height: 35px;
    }
    .top-bar-buttons{
      display: flex;
      justify-content: center;
      position: relative;
      width: 100%;
    }
    .remove-button{
      position: absolute;
      top: -10px;
      right: -10px;
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
      padding: 5px;
    }
    .card-name:focus {
      border: 3px solid #e96e26;
      outline: none;
      border-radius: 10px;
    }
    .card-name.edit-mode {
        border: 3px solid #e96e26;
        border-radius: 10px;
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