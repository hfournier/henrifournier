<script lang="ts">
	import type { MarkComponentProps } from '@portabletext/svelte';
	import Prism from './prism.svelte';

	export let portableText: MarkComponentProps;

	$: content = portableText.plainTextContent;
	$: ({ value } = portableText);
	$: ({ language } = value);
	$: lang = language as string;
</script>

{#if false}<slot />{/if}
<Prism {content} language={lang} type="inline" />
