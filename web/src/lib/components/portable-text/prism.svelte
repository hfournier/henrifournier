<script lang="ts">
	import * as Prism from 'prismjs';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/components/prism-json';
	import 'prism-svelte';

	// type Language = 'html' | 'css' | 'javascript' | 'typescript' | 'json' | 'svelte';
	export let content: string;
	export let language: string;
	export let type: 'block' | 'inline';
	let highlighted;
	$: {
		// console.log(language);
		highlighted = Prism.highlight(content, Prism.languages[language], language).trim();
	}
</script>

{#if content}
	{#if type === 'block'}
		<pre
			class="scrollable language-{language} my-4 overflow-x-auto rounded-lg p-4">{@html highlighted}</pre>
	{:else}
		<span class="whitespace-nowrap rounded bg-stone-200 px-1 dark:bg-stone-900"
			>{@html highlighted}</span
		>
	{/if}
{/if}
