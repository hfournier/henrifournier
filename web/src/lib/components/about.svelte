<script lang="ts">
	import Section from './section.svelte';
	import headshot from '$lib/assets/headshot.png';

	const details = [
		{ label: 'name', content: 'Henri Fournier' },
		{ label: 'experience', content: '36+ years' },
		{ label: 'tech', content: ['Jamstack', 'Full Stack', 'Front-End', 'Back-End'] },
		{ label: 'code', content: ['TypeScript', 'JavaScript', 'C#', 'HTML'] },
		{ label: 'frameworks', content: ['Svelte', 'Astro', '11ty', 'AlpineJS', 'Angular'] },
		{ label: 'data', content: ['Sanity', 'MongoDB', 'JSON', 'SQL Server'] },
		{ label: 'styles', content: ['CSS', 'Tailwind', 'Bootstrap'] },
		{ label: 'speaks', content: ['English', 'Français', 'Grinch', 'Sarcasm'] },
		{ label: 'pronouns', content: ['He', 'Him'] }
	];
</script>

<Section id="about">
	<svelte:fragment slot="heading">About</svelte:fragment>
	<p>
		Hello, my name is Henri Fournier and I'm a Jamstack developer. That means I design and build
		<span
			class="bg-gradient-to-r from-red-500 via-[rgb(249_115_22),_rgb(234_178_8),_rgb(34_197_94),_rgb(6_182_212),_rgb(59_130-246)] to-violet-500 bg-clip-text text-2xl tracking-wide text-transparent"
			>unique</span
		>,
		<span
			class="to-secondary-400 bg-gradient-to-b from-white bg-clip-text text-2xl font-thin tracking-tighter text-transparent"
			>light-weight</span
		>,
		<span
			class="bg-gradient-to-r from-transparent to-black bg-clip-text text-2xl italic tracking-tight text-transparent dark:to-white"
			>fffast</span
		>
		and <span class="text-2xl font-extrabold tracking-[.18em]">effective</span>
		websites. I always strive for everything to be
		<span class="italic text-red-500 line-through">pixle</span> pixel perfect, because that's the way
		it should be. Yeaaah, I'm one of those people.
	</p>
	<div class="mt-8 flex flex-col items-center md:mt-16 md:flex-row md:justify-evenly">
		<div
			class="hexagon from-primary-600 to-secondary-600 mb-8 min-w-fit bg-gradient-to-br p-2 md:mb-0 lg:p-3"
		>
			<img
				class="hexagon w-52 object-cover grayscale hover:grayscale-0 lg:w-64 xl:w-72"
				loading="lazy"
				decoding="async"
				src={headshot}
				alt="Headshot of Henri Fournier"
			/>
		</div>

		<div
			class="before:content-left-curly after:content-right-curly text-xl text-stone-700 before:pr-2 dark:text-stone-400 xl:text-2xl"
		>
			<div
				class="text-secondary-700 after:content-colon dark:text-secondary-500 pl-4 font-semibold after:text-stone-700 dark:after:text-stone-400"
			>
				developer
			</div>
			<ul class="before:content-left-curly after:content-right-curly pl-8">
				{#each details as detail}
					<li class="flex pl-4">
						<div
							class="text-secondary-700 after:content-colon dark:text-secondary-500 font-semibold after:text-stone-700 dark:after:text-stone-400"
						>
							{detail.label}
						</div>
						{#if typeof detail.content === 'string'}
							<div
								class="text-primary-600 after:content-comma dark:text-primary-500 dark:lg:text-primary-600 pl-2 font-bold after:font-normal after:text-stone-700 dark:after:text-stone-400"
							>
								{detail.content}
							</div>
						{:else}
							<ul
								class="before:content-left-square after:last:content-right-square-comma flex flex-col pl-2 md:inline-flex md:flex-row md:flex-wrap md:after:last:pl-2"
							>
								{#each detail.content as item}
									<li class="after:content-comma flex pl-4 after:last:content-none md:pl-2">
										<div
											class="text-primary-600 dark:text-primary-500 dark:lg:text-primary-600 font-bold"
										>
											{item}
										</div>
									</li>
								{/each}
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</Section>
