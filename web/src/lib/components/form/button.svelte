<script lang="ts">
	export let cssClasses: string = null;
	export let formaction: string = null;
	export let name: string = null;
	export let type: 'submit' | 'reset' | 'button' = 'submit';
	export let value: string = null;
	export let preventDefault: 'true' | 'false' = 'false';
</script>

{#if preventDefault === 'true'}
	<button
		class="hover:border-secondary-600 hover:text-secondary-700 dark:hover:text-secondary-400 hover:shadow-secondary-500/50 ring-secondary-500 flex items-center gap-2 rounded-md border-2 border-stone-500 px-4 py-2 outline-none ring-offset-2 ring-offset-stone-200 hover:shadow focus:ring-2 dark:ring-offset-stone-700 {cssClasses}"
		{type}
		{formaction}
		{name}
		{value}
		on:click|preventDefault
	>
		<slot />
	</button>
{:else}
	<button
		class="hover:border-secondary-600 hover:text-secondary-700 dark:hover:text-secondary-400 hover:shadow-secondary-500/50 ring-secondary-500 flex items-center gap-2 rounded-md border-2 border-stone-500 px-4 py-2 outline-none ring-offset-2 ring-offset-stone-200 hover:shadow focus:ring-2 dark:ring-offset-stone-700 {cssClasses}"
		{type}
		{formaction}
		{name}
		{value}
		on:click
	>
		<slot />
	</button>
{/if}
