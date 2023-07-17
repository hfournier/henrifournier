import { fail } from '@sveltejs/kit';
import { validateForm } from '../../lib/utils/validation';
import { contactForm } from '$lib/stores/contact';

export const actions = {
	send: async ({ request, fetch }) => {
		// console.log(request);
		const formData = Object.fromEntries(await request.formData());

		try {
			// validate form data
			let actionForm = validateForm(contactForm, formData);

			// return form data and errors on validation errors
			if (!actionForm.valid) {
				return fail(400, { data: formData, actionForm });
			}

			// send message
			const result = await fetch('/api/sendMail', {
				method: 'POST',
				body: JSON.stringify(formData)
			});
			// console.log('Result: ', res);
			if (result.status == 202) {
				// successfully processed form data
				return { success: true };
			} else {
				const data = await result.json();
				return fail(result.status, { data: formData, error: data.error });
			}
		} catch (error) {
			// console.log(error);
			return fail(400, { data: formData, error: JSON.stringify(error) });
		}
	},
	poptoast: async () => {
		return { poptoast: true };
	}
};
