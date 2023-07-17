<script lang="ts">
	import { contactForm, resetFormContact } from '$lib/stores/contact';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import Heading1 from '$lib/components/heading1.svelte';
	import InputText from '$lib/components/form/input-text.svelte';
	import InputTextarea from '$lib/components/form/input-textarea.svelte';
	import { toast } from '$lib/stores/toast';
	import type { ActionResult } from '@sveltejs/kit';
	import { validateForm } from '../../lib/utils/validation';
	import { page } from '$app/stores';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { clearSnapshot, restoreSnapshot, takeSnapshot } from '$lib/utils/forms';

	const snapshotKey = 'contactForm';

	$: {
		if ($page.form) {
			if ($page.form.poptoast) {
				popToast();
			} else {
				if ($page.form.actionForm) {
					$contactForm = $page.form.actionForm;
				}
				if ($page.status === 200) {
					clearSnapshot(snapshotKey);
					$toast = { index: 0, message: "Thank you. We'll be in touch ASAP.", show: true };
				} else if ($page.status === 400) {
					$toast = { index: 1, message: 'Sorry. Something went terribly wrong.', show: true };
				}
			}
		}
	}

	afterNavigate(({ type }) => {
		restoreSnapshot(snapshotKey, contactForm);
	});

	beforeNavigate(({ type }) => {
		takeSnapshot(snapshotKey, $contactForm);
	});

	let formElement: HTMLFormElement;

	// show toast on * key press
	const handleKeyPress = (event: KeyboardEvent) => {
		// console.log('pressed the star key');
		if (event && event.key === '*') {
			popToast();
		}
	};

	const popToast = () => {
		if (!$toast) {
			$toast = { index: 2, show: true };
		} else {
			if ($toast.index < 2 || $toast.index > 20) {
				$toast.index = 2;
			} else {
				$toast.index = $toast.index + 1;
			}
			$toast.show = true;
		}
	};

	const submit: SubmitFunction = ({ form, data, cancel }) => {
		const formData = Object.fromEntries(data.entries());
		validateForm(contactForm, formData);

		// cancel submission if form data is invalid
		if (!$contactForm.valid) {
			cancel();
		}

		return async ({ result, update }) => {
			switch ((result as ActionResult).type) {
				case 'success':
					resetFormContact();
					form.reset();
					break;

				case 'failure':
					await applyAction(result);
					break;

				default:
					console.log('Send mail error');
					await applyAction(result);
					break;
			}

			await update();
		};
	};
</script>

<svelte:head>
	<title>Henri Fournier | Contact</title>
	<meta
		name="description"
		content="Please leave me a message and I will reply shortly. Thank you."
	/>
</svelte:head>
<svelte:window on:keypress={handleKeyPress} />

<section class="mx-auto grid place-content-center px-2 md:px-8 lg:px-12" aria-label="Contact form">
	<Heading1 justify="text-left">Contact Me</Heading1>
	<p>Like what you see? Let's talk.</p>
	<form
		class="group mt-8 w-full min-w-[18rem] space-y-6 rounded-lg border-2 border-stone-400 bg-stone-50 p-6 text-left dark:bg-stone-700 md:min-w-[24rem] md:max-w-md lg:min-w-[30rem] lg:max-w-lg lg:space-y-8 lg:p-8"
		method="post"
		action="?/send"
		bind:this={formElement}
		use:enhance={submit}
	>
		<InputText
			form={contactForm}
			formControlName={$contactForm?.controls?.name.name}
			focus={true}
		/>
		<InputText form={contactForm} formControlName={$contactForm?.controls?.email.name} />
		<InputText form={contactForm} formControlName={$contactForm?.controls?.subject.name} />
		<InputTextarea
			form={contactForm}
			formControlName={$contactForm?.controls?.message.name}
			rows={4}
		/>

		<section>
			<div class="flex gap-4">
				<button
					class="bg-primary-700 dark:bg-primary-600 rounded px-4 py-2 font-bold uppercase text-stone-50 disabled:cursor-not-allowed disabled:opacity-50"
					type="submit">Send</button
				>
				<button
					class="rounded border border-stone-500 px-4 py-2 dark:border-stone-400"
					type="button"
					on:click={() => {
						clearSnapshot(snapshotKey);
						formElement.reset();
						formElement.checkValidity;
						resetFormContact();
						formElement.getElementsByTagName('input')[0].focus();
					}}
				>
					Clear
				</button>
			</div>
		</section>
		<div class="flex w-full justify-center gap-2">
			<div class="text-sm">For fax, press the</div>
			<button
				class="font-bubblegum text-6xl text-lime-500 dark:text-lime-400"
				formaction="?/poptoast"
				formnovalidate
				on:click|preventDefault={popToast}>*</button
			>
			<div class="text-sm">key.</div>
		</div>
	</form>
</section>
