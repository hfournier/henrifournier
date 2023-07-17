<script lang="ts">
	export let side: string;
	export let rowClass: string;
</script>

<div
	class="hidden border-stone-300 p-6 sm:p-12 md:block {rowClass} {side !== 'left'
		? 'col-start-1 border-r-[1px]'
		: 'col-start-2 border-l-[1px]'}"
	aria-hidden="true"
/>

<div
	class="border-stone-300 p-6 before:absolute before:left-[1px] before:mt-1 before:-ml-3 before:h-[1.3rem] before:w-6 before:outline before:outline-8 before:outline-stone-50 before:content-hexagon dark:before:outline-stone-900 sm:p-12 md:before:left-1/2 {rowClass} {side ===
	'left'
		? 'col-start-1 border-l-2 md:border-l-0 md:border-r-[1px]'
		: 'col-start-1 md:col-start-2 border-l-2 md:border-l-[1px]'}"
	aria-hidden="true"
>
	<slot />
</div>
