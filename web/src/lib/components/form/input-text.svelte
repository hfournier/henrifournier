<script lang="ts">
	import type { Form } from '$lib/utils/forms';
	import type { Writable } from 'svelte/store';
	import { validateControl } from '../../utils/validation';

	export let form: Writable<Form>;
	export let formControlName: string;
	export let focus = false;
	let input;

	function focusElement(node) {
		// the node has been mounted in the DOM
		if (focus) {
			node.focus();
		}

		return {
			destroy() {
				// the node has been removed from the DOM
			}
		};
	}
</script>

<div class="relative grow">
	<input
		class="focus:border-secondary-600 dark:focus:border-secondary-300 peer h-10 w-full rounded border-2 border-stone-400 bg-stone-50 px-3.5 text-stone-900 
		placeholder-transparent valid:border-stone-300 focus:outline-none aria-[invalid]:border-red-600 dark:bg-stone-700 dark:text-stone-100 dark:aria-[invalid]:border-red-300"
		id="input-{$form.controls[formControlName].name}"
		name={$form.controls[formControlName].name}
		type={$form.controls[formControlName].type}
		placeholder={$form.controls[formControlName].label}
		required={$form.controls[formControlName].validators?.required}
		aria-required={$form.controls[formControlName].validators?.required ? 'true' : null}
		aria-invalid={$form.controls[formControlName].errors ? 'true' : null}
		aria-errormessage={$form.controls[formControlName].errors
			? $form.controls[formControlName].errorMessage
			: null}
		value={$form.controls[formControlName].value}
		on:blur={() => {
			$form.controls[formControlName].touched = true;
			validateControl(form, $form.controls[formControlName].name, input.value);
		}}
		on:input={() => {
			validateControl(form, $form.controls[formControlName].name, input.value);
		}}
		bind:this={input}
		use:focusElement
	/>
	<label
		for="input-{$form.controls[formControlName].name}"
		class="peer-focus:text-secondary-700 dark:peer-focus:text-secondary-300 pointer-events-none absolute left-2 -top-2.5 rounded bg-stone-50 px-2 text-sm text-stone-600 
		transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-500 peer-focus:-top-2.5 peer-focus:text-sm 
		dark:bg-stone-700 dark:text-stone-300 dark:peer-placeholder-shown:text-stone-300"
		>{$form.controls[formControlName].label}</label
	>
	{#if $form.controls[formControlName].hint && !$form.controls[formControlName].errors}
		<div class="absolute -bottom-4 left-2 text-xs text-stone-700 dark:text-stone-300">
			{$form.controls[formControlName].hint}
		</div>
	{/if}
	{#if $form.controls[formControlName].validators?.required}
		<div
			class="absolute -bottom-4 left-2 text-xs text-red-600 dark:text-red-300"
			class:hidden={!$form.controls[formControlName].errors?.required}
		>
			{$form.controls[formControlName].errorMessage}
		</div>
	{/if}
	{#if $form.controls[formControlName].validators?.email}
		<div
			class="absolute -bottom-4 left-2 text-xs text-red-600 dark:text-red-300"
			class:hidden={!(
				$form.controls[formControlName].errors?.email &&
				!$form.controls[formControlName].errors?.required
			)}
		>
			{$form.controls[formControlName].errorMessage}
		</div>
	{/if}
</div>
