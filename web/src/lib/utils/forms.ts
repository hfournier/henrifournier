import type { Writable } from 'svelte/store';
import type { ValidationErrors, Validators } from '../utils/validation';
type ControlType = 'email' | 'text' | 'textarea';

export interface Form {
	controls: Record<string, FormControl>;
	valid: boolean;
}

export interface FormControl {
	errorMessage?: string;
	errors?: ValidationErrors;
	hint?: string;
	label: string;
	name: string;
	touched: boolean;
	type: ControlType;
	valid: boolean;
	validators?: Validators;
	value: string;
}

export const addControl = (
	name: string,
	label: string,
	type: ControlType,
	options?: {
		hint?: string;
		initialValue?: string;
		validators?: Validators;
	}
) => {
	let control: FormControl = {
		name,
		label,
		type,
		value: options?.initialValue ?? '',
		errors: null,
		touched: false,
		valid: false
	};
	if (options?.hint) {
		control.hint = options.hint;
	}

	if (options?.validators) {
		control.validators = options.validators;
	}

	return control;
};

export const takeSnapshot = (key: string, form: Form) => {
	let fv: Record<string, string> = {};
	let valuesFound = false;
	Object.keys(form.controls).forEach((key) => {
		fv[key] = form.controls[key].value;
		if (form.controls[key].value) {
			valuesFound = true;
		}
	});

	if (valuesFound) {
		sessionStorage.setItem(key, JSON.stringify(fv));
	}
};

export const restoreSnapshot = (key: string, formStore: Writable<Form>) => {
	const fv: Record<string, string> = JSON.parse(sessionStorage.getItem(key));

	if (fv) {
		resetForm(formStore, fv);
	}
};

export const clearSnapshot = (key: string) => {
	sessionStorage.removeItem(key);
};

export const resetForm = (formStore: Writable<Form>, fv?: Record<string, string>) => {
	formStore.update((form) => {
		Object.keys(form.controls).forEach((key) => {
			form.controls[key].valid = true;
			form.controls[key].errors = null;
			form.controls[key].errorMessage = null;
			form.controls[key].value = fv && fv[key] ? fv[key] : '';
		});

		return form;
	});
};
