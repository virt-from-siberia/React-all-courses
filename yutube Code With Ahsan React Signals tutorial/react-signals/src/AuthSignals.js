import { signal, computed } from "@preact/signals-react";

export const userSignal = signal(null);

export const isLoggedInSignal = computed(() => {
  return !!userSignal.value;
});
