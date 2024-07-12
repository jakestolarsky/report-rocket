<script>
    import { people } from '../store.js';
    import { onMount } from 'svelte';

    function updateTask(personIndex, event) {
      people.update(p => {
        p[personIndex].tasks = event.target.value;
        return p;
      });
      resizeTextarea(event.target);
    }

    function removePerson(index) {
      people.update(p => {
        p.splice(index, 1);
        return p;
      });
    }

    function resizeTextarea(textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }

    onMount(() => {
      document.querySelectorAll('textarea').forEach(resizeTextarea);
    });
  </script>

  <main>
    {#each $people as person, personIndex}
      <div class="card-person">
        <p class="card-name">{person.name}</p>
        <!--<button on:click={() => removePerson(personIndex)}>X</button>-->
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
    }
    .card-textarea:focus {
      border: 5px solid #e96e26;
    }
  </style>