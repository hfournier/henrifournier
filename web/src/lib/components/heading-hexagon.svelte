<script lang="ts">
	import { onMount } from 'svelte';

	let expand = false;
	let hexExpand;

	onMount(() => {
		let hexOnScroll: IntersectionObserver;

		const hexOptions: IntersectionObserverInit = {
			threshold: 0,
			rootMargin: '0px 0px -100px 0px'
		};
		hexOnScroll = new IntersectionObserver((entries, hexOnScroll) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					expand = true;
					hexOnScroll.unobserve(entry.target);
				}
			});
		}, hexOptions);

		hexOnScroll.observe(hexExpand);
	});
</script>

<div
	class="hex-container group relative mx-auto mb-8 grid place-items-center"
	bind:this={hexExpand}
	class:expand
>
	<h2
		class="text-center text-2xl font-medium opacity-0 motion-safe:group-[.expand]:animate-[fadeIn_250ms_ease-in-out_1000ms_forwards] motion-reduce:opacity-100 sm:text-3xl md:text-4xl"
	>
		<slot />
	</h2>
	<div
		class="pointer-events-none absolute inset-0 w-full motion-safe:group-[.expand]:animate-[fadeOut_500ms_ease-in-out_forwards] motion-reduce:opacity-0"
	>
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 1050 916.0254"
			class="pointer-events-none absolute inset-0 mx-auto w-16"
		>
			<g>
				<path
					class="stroke-primary-600 stroke-[70px]"
					fill="none"
					d="m 525 25 h 250 l 250 433.0127 l -250 433.0127 h -500 l -250 -433.0127 l 250 -433.0127 z"
				/>
			</g>
		</svg>
	</div>
	<div
		class="pointer-events-none absolute inset-0 w-full motion-safe:group-[.expand]:animate-[expandL_500ms_ease-in-out_750ms_forwards] motion-reduce:translate-x-[calc(-50%_+_16px)]"
	>
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 1050 916.0254"
			class="pointer-events-none absolute inset-0 mx-auto w-16"
		>
			<g>
				<path
					class="hex-l-bracket stroke-primary-600 stroke-[70px]"
					fill="none"
					d="m 525 25 h 250 l 250 433.0127 l -250 433.0127 h -500 l -250 -433.0127 l 250 -433.0127 z"
				/>
			</g>
		</svg>
	</div>
	<div
		class="pointer-events-none absolute inset-0 w-full motion-safe:group-[.expand]:animate-[expandR_500ms_ease-in-out_750ms_forwards] motion-reduce:translate-x-[calc(50%_-_16px)]"
	>
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 1050 916.0254"
			class="pointer-events-none absolute inset-0 mx-auto w-16"
		>
			<g>
				<path
					class="hex-r-bracket stroke-primary-600 stroke-[70px]"
					fill="none"
					d="m 525 25 h 250 l 250 433.0127 l -250 433.0127 h -500 l -250 -433.0127 l 250 -433.0127 z"
				/>
			</g>
		</svg>
	</div>
	<div
		class="pointer-events-none absolute inset-0 w-full motion-safe:group-[.expand]:animate-[expandTR_500ms_ease-in-out_750ms_forwards] motion-reduce:translate-x-16 motion-reduce:-translate-y-16 motion-reduce:opacity-0"
	>
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 1050 916.0254"
			class="pointer-events-none absolute inset-0 mx-auto w-16"
		>
			<g>
				<path
					class="hex-tr-bracket stroke-primary-600 stroke-[70px]"
					fill="none"
					d="m 525 25 h 250 l 250 433.0127 l -250 433.0127 h -500 l -250 -433.0127 l 250 -433.0127 z"
				/>
			</g>
		</svg>
	</div>
	<div
		class="pointer-events-none absolute inset-0 w-full motion-safe:group-[.expand]:animate-[expandBR_500ms_ease-in-out_750ms_forwards] motion-reduce:translate-x-16 motion-reduce:translate-y-16 motion-reduce:opacity-0"
	>
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 1050 916.0254"
			class="pointer-events-none absolute inset-0 mx-auto w-16"
		>
			<g>
				<path
					class="hex-br-bracket stroke-primary-600 stroke-[70px]"
					fill="none"
					d="m 525 25 h 250 l 250 433.0127 l -250 433.0127 h -500 l -250 -433.0127 l 250 -433.0127 z"
				/>
			</g>
		</svg>
	</div>
	<div
		class="pointer-events-none absolute inset-0 w-full motion-safe:group-[.expand]:animate-[expandBL_500ms_ease-in-out_750ms_forwards] motion-reduce:-translate-x-16 motion-reduce:translate-y-16 motion-reduce:opacity-0"
	>
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 1050 916.0254"
			class="pointer-events-none absolute inset-0 mx-auto w-16"
		>
			<g>
				<path
					class="hex-bl-bracket stroke-primary-600 stroke-[70px]"
					fill="none"
					d="m 525 25 h 250 l 250 433.0127 l -250 433.0127 h -500 l -250 -433.0127 l 250 -433.0127 z"
				/>
			</g>
		</svg>
	</div>
	<div
		class="pointer-events-none absolute inset-0 w-full motion-safe:group-[.expand]:animate-[expandTL_500ms_ease-in-out_750ms_forwards] motion-reduce:-translate-x-16 motion-reduce:-translate-y-16 motion-reduce:opacity-0"
	>
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 1050 916.0254"
			class="pointer-events-none absolute inset-0 mx-auto w-16"
		>
			<g>
				<path
					class="hex-tl-bracket stroke-primary-600 stroke-[70px]"
					fill="none"
					d="m 525 25 h 250 l 250 433.0127 l -250 433.0127 h -500 l -250 -433.0127 l 250 -433.0127 z"
				/>
			</g>
		</svg>
	</div>
</div>

<style>
	.hex-container {
		height: calc(64px * 0.8660254);
	}

	.hex-l-bracket {
		stroke-dasharray: 0 2025 450 500;
	}

	.hex-r-bracket {
		stroke-dasharray: 0 525 450 2000;
	}

	.hex-tr-bracket {
		stroke-dasharray: 0 25 450 2500;
	}

	.hex-br-bracket {
		stroke-dasharray: 0 1025 450 1000;
	}

	.hex-bl-bracket {
		stroke-dasharray: 0 1525 450 500;
	}

	.hex-tl-bracket {
		stroke-dasharray: 0 2525 450 0;
	}
</style>
