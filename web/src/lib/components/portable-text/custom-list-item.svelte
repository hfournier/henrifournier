<script lang="ts">
	import type { ListItemComponentProps } from '@portabletext/svelte';

	export let portableText: ListItemComponentProps;
</script>

<li class="pl-2">
	<slot />
</li>
