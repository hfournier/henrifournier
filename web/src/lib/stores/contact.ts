import { writable } from 'svelte/store';
import { addControl, resetForm, type Form } from '$lib/utils/forms';

const initForm = () => {
	const form: Form = {
		valid: false,
		controls: {
			name: addControl('name', 'Your Name', 'text', { validators: { required: true } }),
			email: addControl('email', 'Email', 'email', { validators: { required: true, email: true } }),
			subject: addControl('subject', 'Subject Line', 'text', { validators: { required: true } }),
			message: addControl('message', 'Message', 'textarea', { validators: { required: true } })
		}
	};

	return form;
};

export const contactForm = writable<Form>(initForm());

export const resetFormContact = () => {
	resetForm(contactForm);
};
