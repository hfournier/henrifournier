<script lang="ts">
	import type { ListComponentProps } from '@portabletext/svelte';

	export let portableText: ListComponentProps;

	$: ({ value } = portableText);
	$: ({ listItem } = value);
</script>

{#if listItem === 'number'}
	<ol class="marker:text-primary-600 list-outside pl-8 pb-6"><slot /></ol>
{:else}
	<ul class="marker:text-primary-600 list-outside list-disc pl-8 pb-6">
		<slot />
	</ul>
{/if}
