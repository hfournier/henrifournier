import { get, writable } from 'svelte/store';

export const modal = writable(null);

export function closeModal() {
	const m = get(modal);
	if (m) {
		m.close();
		enableScroll();
	}
}

export function openModal() {
	const m = get(modal);
	if (m) {
		disableScroll();
		m.showModal();
	}
}

let prevBodyPosition;
let prevBodyOverflow;
let prevBodyWidth;
let scrollY;

const disableScroll = () => {
	scrollY = window.scrollY;
	prevBodyPosition = document.body.style.position;
	prevBodyOverflow = document.body.style.overflow;
	prevBodyWidth = document.body.style.width;
	document.body.style.position = 'fixed';
	document.body.style.top = `-${scrollY}px`;
	document.body.style.overflow = 'hidden';
	document.body.style.width = '100%';
};

const enableScroll = () => {
	document.body.style.position = prevBodyPosition || '';
	document.body.style.top = '';
	document.body.style.overflow = prevBodyOverflow || '';
	document.body.style.width = prevBodyWidth || '';
	window.scrollTo(0, scrollY);
};
