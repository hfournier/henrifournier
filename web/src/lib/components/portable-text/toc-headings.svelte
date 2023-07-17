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

{#if style === 'h1'}
	<li>
		<a
			class="decoration-secondary-600 hover:text-secondary-700 dark:decoration-secondary-500 dark:hover:text-secondary-400 no-underline hover:underline"
			href="#{anchorId}"><slot /></a
		>
	</li>
{:else if style === 'h2'}
	<li class="pl-4">
		<a
			class="decoration-secondary-600 hover:text-secondary-700 dark:decoration-secondary-500 dark:hover:text-secondary-400 no-underline hover:underline"
			href="#{anchorId}"><slot /></a
		>
	</li>
{:else if style === 'h3'}
	<li class="pl-8">
		<a
			class="decoration-secondary-600 hover:text-secondary-700 dark:decoration-secondary-500 dark:hover:text-secondary-400 no-underline hover:underline"
			href="#{anchorId}"><slot /></a
		>
	</li>
{:else}
	<li class="pl-12">
		<a
			class="decoration-secondary-600 hover:text-secondary-700 dark:decoration-secondary-500 dark:hover:text-secondary-400 no-underline hover:underline"
			href="#{anchorId}"><slot /></a
		>
	</li>
{/if}
