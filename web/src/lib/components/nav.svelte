<script lang="ts">
	import MenuToggle from './menu-toggle.svelte';
	import { page } from '$app/stores';

	let mainMenu = 'main-nav';
	let navOpen = false;
	interface MenuItem {
		label: string;
		link: string;
	}
	const navItems: MenuItem[] = [
		{ label: 'About', link: '/#about' },
		{ label: 'Work', link: '/#work' },
		{ label: 'Meet the Team', link: '/#team' },
		{ label: 'Experience', link: '/#experience' },
		{ label: 'Blog', link: '/blog' },
		{ label: 'Contact', link: '/contact' }
	];
</script>

<nav class="relative flex" aria-label="Main menu">
	<!-- Hamburger Menu -->
	<MenuToggle bind:navOpen bind:navId={mainMenu} />

	<ul
		id={mainMenu}
		class="absolute right-0 top-0 gap-4 transition-all lg:translate-y-0 {navOpen
			? 'shadow-primary-500/30 z-20 flex translate-y-10 flex-col bg-stone-100/95 p-4 shadow-md duration-500 dark:bg-stone-800/95'
			: 'translate-x-52 translate-y-12 flex-row duration-300 lg:static lg:flex lg:translate-x-0 lg:translate-y-0'}"
	>
		{#each navItems as navItem}
			<li class="relative">
				<a
					aria-current={$page.url.pathname === navItem.link ? 'page' : null}
					class="text-primary-700 dark:text-primary-500 md:text-primary-600 whitespace-nowrap text-right text-lg font-bold aria-[current='page']:underline md:text-xl {navOpen
						? ''
						: 'hidden lg:block'}"
					href={navItem.link}
					on:click={() => (navOpen = false)}>{navItem.label}</a
				>
			</li>
		{/each}
	</ul>
</nav>
