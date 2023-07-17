import type { Writable } from 'svelte/store';
import type { Form } from './forms';

var EMAIL_REGEXP =
	/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const isEmptyInputValue = (value) => {
	// we don't check for string here so it also works with arrays
	return value == null || value.length === 0;
};

export type ValidationErrors = Record<string, boolean>;

export type Validators = Record<string, boolean>;

const Validators = (function () {
	function Validators() {}

	Validators.required = function (value): ValidationErrors | null {
		return isEmptyInputValue(value?.trim()) ? { required: true } : null;
	};

	Validators.email = function (value: string): ValidationErrors | null {
		return value && !EMAIL_REGEXP.test(value) ? { email: true } : null;
	};
	return Validators;
})();

export function validateForm(formStore: Writable<Form>, formData): Form {
	let f: Form;
	formStore.update((form) => {
		Object.keys(formData).forEach((key) => {
			if (form.controls[key]) {
				validateControl(formStore, form.controls[key].name, formData[key].toString());
			}
		});

		f = form;
		return form;
	});

	return f;
}

export function validateControl(formStore: Writable<Form>, name: string, value: string) {
	formStore.update((form) => {
		form.controls[name].valid = true;
		form.controls[name].errors = null;
		form.controls[name].errorMessage = null;
		form.controls[name].value = value;

		if (form.controls[name].validators) {
			Object.keys(form.controls[name].validators).forEach((key) => {
				if (key === 'required') {
					const error = Validators.required(form.controls[name].value);
					if (error) {
						form.controls[name].errors = form.controls[name].errors
							? Object.assign(form.controls[name].errors, error)
							: error;
						form.controls[name].errorMessage = `${form.controls[name].label} is required`;
						form.controls[name].valid = false;
					}
				} else if (key === 'email') {
					const error = Validators.email(form.controls[name].value);
					if (error) {
						form.controls[name].errors = form.controls[name].errors
							? Object.assign(form.controls[name].errors, error)
							: error;
						form.controls[
							name
						].errorMessage = `${form.controls[name].label} requires a valid email address`;
						form.controls[name].valid = false;
					}
				}
			});
		}

		let formValid = true;
		Object.keys(form.controls).forEach((key) => {
			if (!form.controls[key].valid) {
				formValid = false;
			}
		});

		form.valid = formValid;

		return form;
	});
}
