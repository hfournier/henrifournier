import { writable } from 'svelte/store';

interface Toast {
	index: number;
	message?: string;
	show: boolean;
}

export const toast = writable<Toast>(null);
