<script lang="ts">
	import { openModal } from '$lib/stores/modal';

	const year = new Date().getFullYear().toString();
</script>

<div class="flex gap-8">
	<a href="/contact">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="hover:text-primary-500 h-6 w-6 text-stone-100"
			aria-label="Mail icon"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
			/>
		</svg>
	</a>
	<a href="https://ca.linkedin.com/in/henrifournier">
		<svg
			version="1.1"
			id="Layer_1"
			xmlns="http://www.w3.org/2000/svg"
			x="0"
			y="0"
			viewBox="0 0 50 50"
			class="hover:text-primary-500 h-6 w-6 text-stone-100"
			style="enable-background:new 0 0 50 50"
			aria-label="LinkedIn icon"
			xml:space="preserve"
			><path
				d="M42.9 2.7H7.1c-2.5 0-4.5 2-4.5 4.5v35.7c0 2.5 2 4.5 4.5 4.5h35.7c2.5 0 4.5-2 4.5-4.5V7.1c0-2.4-2-4.4-4.4-4.4z"
				style="fill-rule:evenodd;clip-rule:evenodd;"
				fill="none"
				stroke-width="3"
				stroke="currentColor"
			/><path
				d="M12.7 9.8c-2.2 0-4.1 1.8-4.1 4.1s1.9 4.1 4.1 4.1c2.2 0 4.1-1.8 4.1-4.1s-1.9-4.1-4.1-4.1zM9.4 40.6h6.7V20.5H9.4v20.1zm23.5-20.3c-2.7 0-4.8 1.2-5.8 2.8v-2.5h-6.6v20.1h6.7v-8.4c0-3.1 1.1-5 3.5-5 1.8 0 3.2 1.2 3.2 4.4v9h6.7V28.5c0-5.8-2.6-8.2-7.7-8.2z"
				style="fill-rule:evenodd;clip-rule:evenodd;"
				fill="currentColor"
			/></svg
		></a
	>
	<a href="https://github.com/hfournier">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			version="1.1"
			class="hover:text-primary-500 h-6 w-6 text-stone-100"
			aria-label="Phone icon"
		>
			<path
				fill-rule="evenodd"
				fill="currentColor"
				d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
			/>
		</svg>
	</a>
	<a href="tel:+12503170583">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="hover:text-primary-500 h-6 w-6 text-stone-100"
			aria-label="Phone icon"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
			/>
		</svg>
	</a>
</div>

<div class="text-sm">
	Copyright &copy; {year} Henri Fournier. All rights Reserved.
</div>
