<script lang="ts">
	import About from '$lib/components/about.svelte';
	import Experience from '$lib/components/experience.svelte';
	import Hero from '$lib/components/hero.svelte';
	import Team from '$lib/components/team.svelte';
	import Work from '$lib/components/work.svelte';
</script>

<svelte:head>
	<title
		>Henri Fournier | Jamstack Developer | Full Stack Developer | Web Developer | Kelowna, BC</title
	>
	<meta
		name="description"
		content="Lighter, faster, better custom Jamstack websites that work for you with Svelte, 11ty, Angular, TailwindCSS and Sanity on Netlify"
	/>
</svelte:head>

<Hero />

<About />

<Work />

<Team />

<Experience />
