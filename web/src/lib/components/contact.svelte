<script lang="ts">
	import Modal from './modal.svelte';
	import { closeModal, modal } from '$lib/stores/modal';

	let dialog;
	$: {
		if (dialog) {
			$modal = dialog;
		}
	}

	let inputUsername: HTMLInputElement;
	type InputProp = {
		label: string;
		value: string;
		errorMessage: string;
		blurred: boolean;
		rules: Array<string>;
		errors: Array<string>;
	};

	let errorMsg = false;
	let successMsg = false;
	let username: InputProp = {
		label: 'Name',
		value: '',
		errorMessage: '',
		blurred: false,
		rules: ['required'],
		errors: []
	};
	let email: InputProp = {
		label: 'Email',
		value: '',
		errorMessage: '',
		blurred: false,
		rules: ['required', 'email'],
		errors: []
	};
	let subject: InputProp = {
		label: 'Subject',
		value: '',
		errorMessage: '',
		blurred: false,
		rules: ['required'],
		errors: []
	};
	let message: InputProp = {
		label: 'Message',
		value: '',
		errorMessage: '',
		blurred: false,
		rules: ['required'],
		errors: []
	};
	let formValid = false;

	function isEmail(value: string) {
		return new RegExp('^\\S+@\\S+[\\.][0-9a-z]+$').test(String(value).toLowerCase());
	}

	function isEmpty(value: string) {
		return [null, undefined, ''].includes(value);
	}

	function isValid(prop: InputProp) {
		let valid = true;
		if (prop.rules) {
			prop.rules.forEach((rule) => {
				switch (rule) {
					case 'required':
						if (!isEmpty(prop.value)) {
							if (prop.errors.indexOf('required') >= 0) {
								prop.errors.splice(prop.errors.indexOf('required'), 1);
							}
							prop.errorMessage = '';
						} else {
							if (!prop.errors.includes('required')) {
								prop.errors.push('required');
							}
							prop.errorMessage = `${prop.label} is required`;
							valid = false;
						}
						break;

					case 'email':
						if (isEmail(prop.value)) {
							if (prop.errors.indexOf('email') >= 0) {
								prop.errors.splice(prop.errors.indexOf('email'), 1);
							}
							prop.errorMessage = '';
						} else {
							if (!prop.errors.includes('email')) {
								prop.errors.push('email');
							}
							prop.errorMessage = `${prop.label} requires a valid email addess`;
							valid = false;
						}
						break;

					default:
						break;
				}
			});
		}
		return valid;
	}

	function validateForm() {
		formValid = isValid(username) && isValid(email) && isValid(subject) && isValid(message);
	}

	function reset(prop: InputProp): InputProp {
		prop.value = '';
		prop.blurred = false;
		prop.errorMessage = '';

		return prop;
	}

	function resetForm() {
		username = reset(username);
		email = reset(email);
		subject = reset(subject);
		message = reset(message);

		formValid = false;
	}

	function sendMsg() {
		sendMail({
			name: username.value,
			email: email.value,
			subject: subject.value,
			message: message.value
		}).then(
			(result) => {
				resetForm();
				successMsg = true;
				setTimeout(() => {
					successMsg = false;
				}, 3500);
			},
			(reason) => {
				console.log(reason);
				errorMsg = true;
				setTimeout(() => {
					errorMsg = false;
				}, 3500);
			}
		);
	}

	async function sendMail(params: any) {
		// console.log(params);
		// const result = await fetch('/.netlify/functions/sendgrid', {
		const res = await fetch('/sendgrid', {
			method: 'POST',

			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
		});

		const json = await res.json();
		let result = JSON.stringify(json);
		return result;
	}
</script>

<dialog bind:this={dialog} aria-label="Contact form to send a message">
	<Modal>
		<svelte:fragment slot="title">Send me a message</svelte:fragment>
		<div class="w-full min-w-[18rem] space-y-6 rounded-lg text-left lg:space-y-8">
			<div class="relative">
				<input
					class="focus:border-secondary-600 dark:focus:border-secondary-300 peer h-10 w-full rounded border-2 border-stone-400 bg-stone-50 px-3.5 text-stone-900 placeholder-transparent valid:border-stone-300 focus:outline-none dark:bg-stone-700 dark:text-stone-50"
					id="username"
					name="username"
					type="username"
					placeholder="username"
					required
					aria-required="true"
					bind:this={inputUsername}
					bind:value={username.value}
					on:blur={() => {
						username.blurred = true;
						validateForm();
					}}
					on:input={() => validateForm()}
					class:border-red-600={username.blurred && username.errors.includes('required')}
					class:dark:border-red-300={username.blurred && username.errors.includes('required')}
				/>
				<label
					for="username"
					class="peer-focus:text-secondary-700 dark:peer-focus:text-secondary-300 absolute left-2 -top-2.5 bg-stone-50 px-2 text-sm text-stone-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-500 peer-focus:-top-2.5 peer-focus:text-sm dark:bg-stone-700 dark:text-stone-300 dark:peer-placeholder-shown:text-stone-300"
					>{username.label}</label
				>
				<div
					class="absolute -bottom-4 left-2 text-xs text-red-600 dark:text-red-300"
					class:hidden={!(username.blurred && username.errors.includes('required'))}
				>
					{username.errorMessage}
				</div>
			</div>

			<div class="relative">
				<input
					class="focus:border-secondary-600 dark:focus:border-secondary-300 peer h-10 w-full rounded border-2 border-stone-400 bg-stone-50 px-3.5 text-stone-900 placeholder-transparent valid:border-stone-300 focus:outline-none dark:bg-stone-700 dark:text-stone-50"
					id="email"
					name="email"
					type="email"
					placeholder="email"
					required
					aria-required="true"
					bind:value={email.value}
					on:blur={() => {
						email.blurred = true;
						validateForm();
					}}
					on:input={() => validateForm()}
					class:border-red-600={email.blurred &&
						(email.errors.includes('required') || email.errors.includes('email'))}
					class:dark:border-red-300={email.blurred &&
						(email.errors.includes('required') || email.errors.includes('email'))}
				/>
				<label
					for="email"
					class="peer-focus:text-secondary-700 dark:peer-focus:text-secondary-300 absolute left-2 -top-2.5 bg-stone-50 px-2 text-sm text-stone-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-500 peer-focus:-top-2.5 peer-focus:text-sm dark:bg-stone-700 dark:text-stone-300 dark:peer-placeholder-shown:text-stone-300"
					>{email.label}</label
				>
				<div
					class="absolute -bottom-4 left-2 text-xs text-red-600 dark:text-red-300"
					class:hidden={!(
						email.blurred &&
						(email.errors.includes('required') || email.errors.includes('email'))
					)}
				>
					{email.errorMessage}
				</div>
			</div>

			<div class="relative">
				<input
					class="focus:border-secondary-600 dark:focus:border-secondary-300 peer h-10 w-full rounded border-2 border-stone-400 bg-stone-50 px-3.5 text-stone-900 placeholder-transparent valid:border-stone-300 focus:outline-none dark:bg-stone-700 dark:text-stone-50"
					id="subject"
					name="subject"
					type="text"
					placeholder="subject"
					required
					aria-required="true"
					bind:value={subject.value}
					on:blur={() => {
						subject.blurred = true;
						validateForm();
					}}
					on:input={() => validateForm()}
					class:border-red-600={subject.blurred && subject.errors.includes('required')}
					class:dark:border-red-300={subject.blurred && subject.errors.includes('required')}
				/>
				<label
					for="subject"
					class="peer-focus:text-secondary-700 dark:peer-focus:text-secondary-300 absolute left-2 -top-2.5 bg-stone-50 px-2 text-sm text-stone-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-500 peer-focus:-top-2.5 peer-focus:text-sm dark:bg-stone-700 dark:text-stone-300 dark:peer-placeholder-shown:text-stone-300"
					>{subject.label}</label
				>
				<div
					class="absolute -bottom-4 left-2 text-xs text-red-600 dark:text-red-300"
					class:hidden={!(subject.blurred && subject.errors.includes('required'))}
				>
					{subject.errorMessage}
				</div>
			</div>

			<div class="relative">
				<textarea
					class="focus:border-secondary-600 dark:focus:border-secondary-300 peer h-40 w-full rounded border-2 border-stone-400 bg-stone-50 px-3.5 pt-2 text-stone-900 placeholder-transparent valid:border-stone-300 focus:outline-none dark:bg-stone-700 dark:text-stone-50"
					id="message"
					name="message"
					placeholder="message"
					rows="4"
					required
					aria-required="true"
					bind:value={message.value}
					on:blur={() => {
						message.blurred = true;
						validateForm();
					}}
					on:input={() => validateForm()}
					class:border-red-600={message.blurred && message.errors.includes('required')}
					class:dark:border-red-300={message.blurred && message.errors.includes('required')}
				/>
				<label
					for="message"
					class="peer-focus:text-secondary-700 dark:peer-focus:text-secondary-300 absolute left-2 -top-2.5 bg-stone-50 px-2 text-sm text-stone-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-500 peer-focus:-top-2.5 peer-focus:text-sm dark:bg-stone-700 dark:text-stone-300 dark:peer-placeholder-shown:text-stone-300"
					>{message.label}</label
				>
				<div
					class="absolute -bottom-4 left-2 text-xs text-red-600 dark:text-red-300"
					class:hidden={!(message.blurred && message.errors.includes('required'))}
				>
					{message.errorMessage}
				</div>
			</div>

			<button
				class="rounded border border-stone-500 px-4 py-2 dark:border-stone-400"
				on:click={() => {
					resetForm();
					inputUsername.focus();
				}}
			>
				Clear
			</button>
			<div
				class="fixed top-0 left-1/2 z-10 max-w-sm -translate-x-1/2 -translate-y-80 transform rounded-2xl border-2 border-solid border-transparent bg-white/90 bg-clip-padding p-4 text-center opacity-0 shadow-lg backdrop-blur backdrop-filter transition-all duration-500 ease-in-out [@supports(backdrop-filter:blur(0px))]:bg-white/30"
				class:opacity-100={successMsg}
				class:translate-y-80={successMsg}
			>
				Your message was sent successfully.<br />We'll be in touch ASAP.
			</div>
			<div
				class="fixed top-0 left-1/2 z-10 max-w-sm -translate-x-1/2 -translate-y-80 transform rounded-2xl border border-solid border-transparent bg-red-700/90 bg-clip-padding p-4 text-center text-white opacity-0 shadow-lg backdrop-blur backdrop-filter transition-all duration-500 ease-in-out [@supports(backdrop-filter:blur(0px))]:bg-red-700/80"
				class:opacity-100={errorMsg}
				class:translate-y-80={errorMsg}
			>
				Something went wrong.<br />Please try again later.
			</div>
		</div>
		<svelte:fragment slot="footer">
			<menu class="flex justify-end space-x-2 rounded-b-md p-4">
				<li>
					<button
						class="bg-primary-700 dark:bg-primary-600 rounded px-4 py-2 font-bold uppercase text-stone-50 disabled:cursor-not-allowed disabled:opacity-50"
						type="button"
						disabled={!formValid}
						on:click={() => sendMsg()}>Send</button
					>
				</li>
				<li>
					<button
						class="rounded border border-stone-600 px-4 py-2"
						on:click={() => {
							closeModal();
						}}>Close</button
					>
				</li>
			</menu>
		</svelte:fragment>
	</Modal>
</dialog>
