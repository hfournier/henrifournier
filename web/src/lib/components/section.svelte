<script lang="ts">
	import HeadingHexagon from './heading-hexagon.svelte';

	export let id: string = 'section_id';
</script>

<section
	{id}
	class="grid min-h-screen place-content-center px-2 py-12 md:px-8 lg:px-12"
	aria-label={id}
>
	<HeadingHexagon><slot name="heading">Heading</slot></HeadingHexagon>

	<slot />
</section>
