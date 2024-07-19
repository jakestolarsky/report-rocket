import { writable } from 'svelte/store';

function createToastStore() {
  const { subscribe, update } = writable([]);

  return {
    subscribe,
    add: (toast) => {
      update(toasts => [...toasts, toast]);
      setTimeout(() => {
        update(toasts => toasts.filter(t => t !== toast));
      }, toast.duration);
    }
  };
}

export const toasts = createToastStore();