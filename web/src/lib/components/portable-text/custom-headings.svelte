<!-- CustomHeading (blockStyle) -->
<script lang="ts">
	import { toPlainText, type BlockComponentProps } from '@portabletext/svelte';

	export let portableText: BlockComponentProps;

	$: ({ value } = portableText);
	$: ({ style } = value);

	$: anchorId = `heading-${toPlainText(value)}`
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '');
</script>

<div id={anchorId} class="group flex gap-2">
	{#if style === 'h1'}
		<h1 class="text-4xl">
			<slot />
		</h1>
	{:else if style === 'h2'}
		<h2 class="text-3xl">
			<slot />
		</h2>
	{:else if style === 'h3'}
		<h3 class="text-xl">
			<slot />
		</h3>
	{:else}
		<h4 class="text-lg">
			<slot />
		</h4>
	{/if}
	<a class="text-start text-sm no-underline opacity-0 group-hover:opacity-100" href="#{anchorId}">
		<span class="sr-only opacity-100">Link to this heading</span>
		🔗
	</a>
</div>
