<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';
	import Prism from './prism.svelte';

	export let portableText: CustomBlockComponentProps<{
		code: string;
		language: string;
	}>;

	$: ({ value } = portableText);
	$: ({ language } = value);
</script>

<Prism content={value.code} {language} type="block" />
