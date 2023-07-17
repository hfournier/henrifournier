<script lang="ts">
	import { toast } from '$lib/stores/toast';

	const quotes = [
		'Well... that worked out nicely.',
		"I'm an idiot. You're an idiot!",
		"Oh right, that's REALLY mature...",
		"I'm all toasty inside. And I'm leaking.",
		"HELP ME... I'm FEELING.",
		'Whew... ha! Almost lost my *cool* there.',
		'What is the deal?',
		"That is not a chew toy. You have no idea where it's been.",
		"What's the matter with you, you some kind of wild animal?",
		"It's because I'm green isn't it?",
		"Be it ever so heinous, there's no place like home.",
		'I guess I could use a little... social interaction.',
		"Even if I wanted to go, my schedule wouldn't allowed it.",
		'But what would I wear?',
		'Can I use your finger for a sec?',
		'Nice kid... baaad judge of character.',
		'Kids today. So desensitized by movies and television.',
		"What's that stench? It's fantastic.",
		"One man's toxic sludge is another man's potpourri.",
		"In don't know it's some kind of soup.",
		"Too late. That'll be mine.",
		"We did our worst and that's all that matters."
	];

	const removeToast = () => {
		$toast = null;
	};
</script>

<div
	class="toast grid"
	on:animationend={(e) => (e.animationName.includes('pop-down') ? removeToast() : null)}
>
	<div
		class="bg-primary-200 border-primary-700 relative mx-auto -ml-[1%] aspect-[1/0.25] w-[102%] rounded-b-xl rounded-t-[50%_80%] border-x-4 border-t-4
		before:absolute before:inset-0 before:-z-10 before:rounded-b-lg before:rounded-t-[50%_80%] before:bg-stone-900"
		class:bg-opacity-100={$toast.index < 3}
		class:bg-opacity-95={$toast.index === 3}
		class:bg-opacity-90={$toast.index === 4}
		class:bg-opacity-80={$toast.index === 5}
		class:bg-opacity-75={$toast.index === 6}
		class:bg-opacity-70={$toast.index === 7}
		class:bg-opacity-60={$toast.index === 8}
		class:bg-opacity-50={$toast.index === 9}
		class:bg-opacity-40={$toast.index === 10}
		class:bg-opacity-30={$toast.index === 11}
		class:bg-opacity-25={$toast.index === 12}
		class:bg-opacity-20={$toast.index === 13}
		class:bg-opacity-10={$toast.index === 14}
		class:bg-opacity-5={$toast.index === 15}
		class:bg-opacity-0={$toast.index >= 16}
		aria-hidden="true"
	/>
	<div
		class="bg-primary-200 border-primary-700 relative aspect-[1/0.6] max-h-[50vh] max-w-sm rounded-xl border-x-4 border-b-4
        before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-stone-900"
		class:bg-opacity-100={$toast.index < 3}
		class:bg-opacity-95={$toast.index === 3}
		class:bg-opacity-90={$toast.index === 4}
		class:bg-opacity-80={$toast.index === 5}
		class:bg-opacity-75={$toast.index === 6}
		class:bg-opacity-70={$toast.index === 7}
		class:bg-opacity-60={$toast.index === 8}
		class:bg-opacity-50={$toast.index === 9}
		class:bg-opacity-40={$toast.index === 10}
		class:bg-opacity-30={$toast.index === 11}
		class:bg-opacity-25={$toast.index === 12}
		class:bg-opacity-20={$toast.index === 13}
		class:bg-opacity-10={$toast.index === 14}
		class:bg-opacity-5={$toast.index === 15}
		class:bg-opacity-0={$toast.index >= 16}
	>
		<output
			class="m-auto grid h-full place-items-center px-6 text-center text-lg"
			class:text-stone-900={$toast.index <= 6}
			class:text-stone-200={$toast.index > 6}
			class:text-stone-50={$toast.index > 10}
		>
			<figure class="text-lg">
				<blockquote
					class="font-bubblegum text-xl before:text-4xl before:content-[open-quote] after:text-4xl after:content-[close-quote] sm:text-2xl"
					cite="https://imagine-entertainment.com/film/how-the-grinch-stole-christmas/"
				>
					{quotes[$toast.index]}
				</blockquote>
				<figcaption class="text-sm">
					<cite>The Grinch</cite>, by Imagine Entertainment
				</figcaption>
			</figure>
			{#if $toast.message}
				{$toast.message}
			{:else if $toast.index >= 16}
				Oh no! You burnt the toast!
			{/if}
		</output>
	</div>
</div>

<style>
	.toast {
		animation: pop-up 1s cubic-bezier(1, 0, 1, 1) forwards, pop-down 500ms ease-out 4s forwards;
	}

	@keyframes pop-up {
		0% {
			transform: translateY(125%);
		}
		50% {
			transform: translateY(-5%) rotate(-3deg) translateX(-2%);
		}
		60% {
			transform: translateY(4%) rotate(5deg);
		}
		70% {
			transform: translateY(-3%) rotate(-2deg) translateX(2%);
		}
		80% {
			transform: translateY(2%);
		}
		90% {
			transform: translateY(-1%);
		}
		100% {
			transform: translateY(0%);
		}
	}

	@keyframes pop-down {
		to {
			transform: translateY(125%);
		}
	}
</style>
