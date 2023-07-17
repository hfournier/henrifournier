import { writable } from 'svelte/store';
import { addControl, resetForm, type Form } from '$lib/utils/forms';

const initForm = () => {
	const form: Form = {
		valid: false,
		controls: {
			name: addControl('name', 'Your Name', 'text', { hint: 'Optional' }),
			email: addControl('email', 'Email', 'email', {
				hint: 'Optional - will not be shown/shared',
				validators: { email: true }
			}),
			comment: addControl('comment', 'Comment', 'textarea', { validators: { required: true } })
		}
	};

	return form;
};

export const commentForm = writable<Form>(initForm());

export const resetFormComment = () => {
	resetForm(commentForm);
};
