<script lang="ts">
	import Logo from './logo.svelte';
	import DarkLight from './dark-light.svelte';

	import Nav from './nav.svelte';
</script>

<Logo />

<div class="flex w-full items-center justify-end gap-4 lg:flex-row-reverse lg:justify-start">
	<!-- Dark mode toggle -->
	<DarkLight />
	<Nav />
</div>
