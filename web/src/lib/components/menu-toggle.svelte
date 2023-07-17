<script lang="ts">
	export let navId: string;
	export let navOpen: boolean;
</script>

<button
	aria-controls={navId}
	aria-expanded={navOpen ? 'true' : 'false'}
	aria-label="Main navigation"
	class="focus-visible:outline-primary-600 dark:focus-visible:outline-primary-500 rounded-sm focus:outline-none focus-visible:outline-offset-2 lg:hidden"
	on:click={() => (navOpen = !navOpen)}
>
	<svg
		viewBox="0 0 100 100"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="stroke-primary-600 dark:stroke-primary-500 h-6 w-6 stroke-[8px]"
		aria-hidden="true"
	>
		<path class="top-line" d="m 20 25 h 60 a 10 10 0 0 1 0 25 h -30" />
		<path class="middle-line" d="m 20 50 h 60" />
		<path class="bottom-line" d="m 80 75 h -60 a 10 10 0 0 1 0 -25 h 30" />
	</svg>
	<span class="sr-only">Menu</span>
</button>

<style>
	:root {
		--transition-duration: 400ms;
	}

	svg {
		transition: transform var(--transition-duration);
	}

	.top-line {
		stroke-dasharray: 60 100;
		transition: stroke-dashoffset var(--transition-duration);
	}

	.middle-line {
		transform-origin: 50%;
		transition: transform var(--transition-duration);
	}

	.bottom-line {
		stroke-dasharray: 60 100;
		transition: stroke-dashoffset var(--transition-duration);
	}

	[aria-expanded='true'] {
		transform: rotate(45deg);
	}

	[aria-expanded='true'] .top-line,
	[aria-expanded='true'] .bottom-line {
		stroke-dashoffset: -99px;
	}

	[aria-expanded='true'] .middle-line {
		transform: rotate(90deg);
	}
</style>
