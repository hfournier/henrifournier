import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const getColorPreference = () => {
	if (browser) {
		return document.documentElement.classList.contains('dark');
	} else {
		return false;
	}
};

const setColorPreference = (prefersDark: boolean) => {
	if (browser) {
		if (prefersDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
};

export const dark = writable<boolean>(getColorPreference());

dark.subscribe((value) => {
	setColorPreference(value);
});
