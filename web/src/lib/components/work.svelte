<script lang="ts">
	import Section from './section.svelte';
	import cover2cover from '$lib/assets/gallery/cover-2-cover-360x194.png';
	import intratela from '$lib/assets/gallery/intratela-360x194.png';
	import jrguitar from '$lib/assets/gallery/jr-guitar-360x194.png';
	import thomasfournier from '$lib/assets/gallery/thomas-fournier-360x194.png';
	import mathematizing from '$lib/assets/gallery/mathematizing-360x194.png';
</script>

<Section id="work">
	<svelte:fragment slot="heading">Work</svelte:fragment>

	<p>
		A collection of recent, and sometimes ongoing, work using various technologies. These websites
		demonstrate our expertise in web design, development, and optimization. Whether you need a
		simple landing page or a custom web application, we can help.
	</p>

	<ul
		class="scrollable mt-8 grid snap-x snap-proximity scroll-px-8 auto-cols-[90%] grid-flow-col gap-8 overflow-x-auto overscroll-x-contain rounded bg-stone-300 p-8 dark:bg-stone-700 md:auto-cols-[40%]"
	>
		<li
			class="snap-start rounded bg-stone-200 p-8 shadow-md shadow-stone-600/50 duration-200 hover:scale-105 hover:shadow-lg hover:shadow-stone-700/50 dark:bg-stone-800 dark:shadow-stone-400/50 dark:hover:shadow-stone-300/50"
		>
			<img
				loading="lazy"
				decoding="async"
				src={thomasfournier}
				alt="Thomas Fournier website displayed on 4 types of devices"
			/>
			<h3 class="pt-2 text-2xl">Thomas Fournier</h3>
			<a
				class="text-primary-700 dark:text-primary-100 text-sm no-underline hover:underline"
				href="https://thomas-fournier.netlify.app/">website</a
			>
			<p class="pt-2 text-stone-900 dark:text-stone-100">
				A Toronto based actor/singer/director/playwright requiring a modern professional website
				displaying the breadth and depth of his skills.
			</p>
		</li>
		<li
			class="snap-start rounded bg-stone-200 p-8 shadow-md shadow-stone-600/50 duration-200 hover:scale-105 hover:shadow-lg hover:shadow-stone-700/50 dark:bg-stone-800 dark:shadow-stone-400/50 dark:hover:shadow-stone-300/50"
		>
			<img
				loading="lazy"
				decoding="async"
				src={mathematizing}
				alt="Thomas Fournier website displayed on 4 types of devices"
			/>
			<h3 class="pt-2 text-2xl">Mathematizing 24/7</h3>
			<a
				class="text-primary-700 dark:text-primary-100 text-sm no-underline hover:underline"
				href="https://mathematizing.netlify.app/">website</a
			>
			<p class="pt-2 text-stone-900 dark:text-stone-100">
				Okanagan StartUp Weekend 2023: Designed and developed a calm and welcoming website in less
				than 48 hours [Astro, Tailwind CSS]. Our team was awarded 1st Prize.
			</p>
		</li>
		<li
			class="snap-start rounded bg-stone-200 p-8 shadow-md shadow-stone-600/50 duration-200 hover:scale-105 hover:shadow-lg hover:shadow-stone-700/50 dark:bg-stone-800 dark:shadow-stone-400/50 dark:hover:shadow-stone-300/50"
		>
			<img
				loading="lazy"
				decoding="async"
				src={intratela}
				alt="Intratela website displayed on 4 types of devices"
			/>
			<h3 class="pt-2 text-2xl">Intratela</h3>
			<a
				class="text-primary-700 dark:text-primary-100 text-sm no-underline hover:underline"
				href="https://intratela-astro.netlify.app/">website</a
			>
			<p class="pt-2 text-stone-900 dark:text-stone-100">
				Designed and developed four test websites, identical in appearance, each using a different
				framework to determine the optimal technological option(s) for future development projects
				[11ty, Angular, Astro, SvelteKit and Tailwind CSS].
			</p>
		</li>
		<li
			class="snap-start rounded bg-stone-200 p-8 shadow-md shadow-stone-600/50 duration-200 hover:scale-105 hover:shadow-lg hover:shadow-stone-700/50 dark:bg-stone-800 dark:shadow-stone-400/50 dark:hover:shadow-stone-300/50"
		>
			<img
				loading="lazy"
				decoding="async"
				src={jrguitar}
				alt="JR Guitar website displayed on 4 types of devices"
			/>
			<h3 class="pt-2 text-2xl">JR Guitar</h3>
			<a
				class="text-primary-700 dark:text-primary-100 text-sm no-underline hover:underline"
				href="https://jrguitar-draft-intratela.netlify.app/">website</a
			>
			<p class="pt-2 text-stone-900 dark:text-stone-100">
				Designed and developed a professional website with blog for a local guitar repair shop [11ty
				and Tailwind CSS].
			</p>
		</li>
		<li
			class="snap-start rounded bg-stone-200 p-8 shadow-md shadow-stone-600/50 duration-200 hover:scale-105 hover:shadow-lg hover:shadow-stone-700/50 dark:bg-stone-800 dark:shadow-stone-400/50 dark:hover:shadow-stone-300/50"
		>
			<img
				loading="lazy"
				decoding="async"
				src={cover2cover}
				alt="Cover2Cover website displayed on 4 types of devices"
			/>
			<h3 class="pt-2 text-2xl">Cover 2 Cover</h3>
			<a
				class="text-primary-700 dark:text-primary-100 text-sm no-underline hover:underline"
				href="https://cover2cover-draft-intratela.netlify.app/">website</a
			>
			<p class="pt-2 text-stone-900 dark:text-stone-100">
				Designed and developed a hip website with blog for a local classic rock dance band [11ty and
				Tailwind CSS].
			</p>
		</li>
	</ul>
</Section>
