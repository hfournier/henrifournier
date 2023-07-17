<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import { dark } from '$lib/stores/theme';

	const submitForm: SubmitFunction = () => {
		$dark = !$dark;
	};
</script>

<form
	method="post"
	action="/?/changeTheme&theme={!$dark ? 'dark' : 'light'}&redirectTo={$page.url.pathname}"
	use:enhance={submitForm}
>
	<button
		class="focus-visible:outline-primary-600 dark:focus-visible:outline-primary-500 h-6 w-6 touch-manipulation rounded-full focus:outline-none focus-visible:outline-offset-2 md:h-7 md:w-7"
		title="Toggles light and dark"
		aria-label={$dark ? 'dark' : 'light'}
	>
		<svg
			class="text-primary-600 dark:text-primary-500 hover:text-primary-700 dark:hover:text-primary-400 bg-transparent"
			stroke-linecap="round"
			aria-hidden="true"
			viewBox="0 0 24 24"
		>
			<mask class="origin-center" id="moon-mask">
				<rect class="h-full w-full fill-white" x="0" y="0" />
				<circle
					class="fill-black transition-transform duration-[250ms] ease-[cubic-bezier(0,0,0,1)] motion-reduce:transition-none dark:-translate-x-2 dark:delay-[250ms] dark:duration-500"
					cx="25"
					cy="10"
					r="6"
				/>
			</mask>
			<circle
				id="sun"
				class="origin-center fill-current transition-transform duration-500 ease-[cubic-bezier(.5,1.25,.75,1.25)] motion-reduce:transition-none dark:scale-[1.75] dark:duration-500 dark:ease-[cubic-bezier(.25,0,.3,1)]"
				cx="12"
				cy="12"
				r="6"
				mask="url(#moon-mask)"
			/>
			<g
				class="transition-opacity duration-500 ease-[cubic-bezier(.25,0,.3,1)] motion-reduce:transition-none dark:opacity-0"
			>
				<g
					class="origin-center stroke-current stroke-2 transition-transform duration-500 ease-[cubic-bezier(.5,1.5,.75,1.25)] motion-reduce:transition-none dark:-rotate-[25deg] dark:duration-150"
					id="sun-beams"
				>
					<line x1="12" y1="1" x2="12" y2="3" />
					<line x1="12" y1="21" x2="12" y2="23" />
					<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
					<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
					<line x1="1" y1="12" x2="3" y2="12" />
					<line x1="21" y1="12" x2="23" y2="12" />
					<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
					<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
				</g></g
			>
		</svg>
	</button>
</form>
