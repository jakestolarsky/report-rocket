<script>
    import { fade } from 'svelte/transition';

    export let message = '';
    export let type = 'success';
    export let duration = 3000;

    let visible = true;

    setTimeout(() => {
      visible = false;
    }, duration);
  </script>

  {#if visible}
    <div
      transition:fade
      class="toast {type}"
      role="alert"
    >
      {message}
    </div>
  {/if}

  <style>
    .toast {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 10px 20px;
      border-radius: 10px;
      color: white;
      font-weight: bold;
      z-index: 1000;
    }
    .success {
      background-color: #2ecc71;
    }
    .error {
      background-color: #e74c3c;
    }
  </style>