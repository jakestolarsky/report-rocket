<script>
    import { loadData, appInfo } from '../store.js';
    import { onMount } from 'svelte';

    let showMenu = false;
    let info = { version: "", author: { name: "", url: "" } };
    let inputWebhook = "";

    function handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        loadData(file);
        showMenu = false;
      }
    }

    onMount(() => {
      inputWebhook = localStorage.getItem("savedInput") || "";
      appInfo.subscribe(value => {
        info = value;
      });
    });

    function handleInput(event){
      inputWebhook = event.target.value;
      localStorage.setItem("savedInput", inputWebhook);
    }

</script>

<main>
    <div>
      <button class="menu-toggle" on:click={() => showMenu = !showMenu}>&#9776;</button>
      <div class="menu" class:hidden={!showMenu}>
        <button class="menu-close" on:click={() => showMenu = false}>
          X
        </button>
        <input
          type="text"
          bind:value={inputWebhook}
          on:input={handleInput}
          placeholder="Paste slack webhook here.."
        />
        <!-- <label class="upload-label">
          Upload data with people and webhook in JSON:
          <input type="file" accept=".json" on:change={handleFileUpload}>
        </label> -->

        <div class="info">
          <strong>About</strong>
          <p>version: {info.version}</p>
          <p>author: <a href={info.author.url} target="_blank">{info.author.name}</a></p>
        </div>
      </div>
    </div>
</main>

<style>
    .menu {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      color: #010101;
      background: rgb(147, 139, 238);
      padding: 10px;
      box-shadow: 0 2px 10px #e96e26;
    }

    .menu-toggle, .menu-close {
      cursor: pointer;
      color: rgb(197, 193, 190);
      padding: 10px;
      border: none;
      background: none;
      font-size: 1.5em;
      transition: all 0.1s;
    }

    .menu-toggle:hover {
      color: rgb(147, 139, 238);
      font-size: 1.6em;
    }

    .hidden {
      display: none;
    }

    .upload-label {
      width: 100%;
      margin-bottom: 10px;
    }

    .upload-label input {
      width: 100%;
      box-sizing: border-box;
      align-items: center;
    }
    p {
        margin: 0;
    }
    .info {
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
</style>