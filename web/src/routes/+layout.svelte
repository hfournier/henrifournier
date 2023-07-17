<script lang="ts">
	import '../fonts.css';
	import '../tailwind.css';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import GoToTop from '$lib/components/go-to-top.svelte';
	import Toaster from '$lib/components/toaster.svelte';
	import type { LayoutData } from './$types';
	import { dark } from '$lib/stores/theme';

	export let data: LayoutData;

	$: {
		if (data && data.theme) {
			$dark = data.theme === 'light' ? false : true;
		}
	}
</script>

<header
	class="mx-auto flex max-w-7xl items-center justify-between p-4 sm:px-8 sm:py-6 md:py-8 md:px-16 lg:px-20"
	aria-label="Header"
>
	<Header />
</header>
<main class="relative mx-auto max-w-7xl px-4 py-8 md:px-8 lg:py-12" aria-label="Main">
	<slot />
	<!-- Go to top button -->
	<GoToTop />
</main>
<footer
	class="flex flex-col items-center gap-6 bg-stone-700 py-6 text-stone-300"
	aria-label="Footer"
>
	<Footer />
</footer>
<Toaster />
