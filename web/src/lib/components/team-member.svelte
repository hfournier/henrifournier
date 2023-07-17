<div class="group grid grid-cols-3 grid-rows-3">
	<div
		class="[&:hover~_div:nth-child(10)]:tilt-up [&:hover~_div:nth-child(10)]:tilt-left col-start-1 row-start-1"
	/>
	<div class="[&:hover~_div:nth-child(10)]:tilt-up col-start-2 row-start-1" />
	<div
		class="[&:hover~_div:nth-child(10)]:tilt-up [&:hover~_div:nth-child(10)]:tilt-right col-start-3 row-start-1"
	/>
	<div class="[&:hover~_div:nth-child(10)]:tilt-left col-start-1 row-start-2" />
	<div class="col-start-2 row-start-2" />
	<div class="[&:hover~_div:nth-child(10)]:tilt-right col-start-3 row-start-2" />
	<div
		class="[&:hover~_div:nth-child(10)]:tilt-down [&:hover~_div:nth-child(10)]:tilt-left col-start-1 row-start-3"
	/>
	<div class="[&:hover~_div:nth-child(10)]:tilt-down col-start-2 row-start-3" />
	<div
		class="[&:hover~_div:nth-child(10)]:tilt-down [&:hover~_div:nth-child(10)]:tilt-right col-start-3 row-start-3"
	/>

	<div
		class="tilting-card group-hover:shadow-primary-500/40 pointer-events-none col-span-full row-span-full flex aspect-square h-full w-full flex-col border border-stone-300 bg-stone-100 p-2 group-hover:shadow-lg dark:border-stone-600 dark:bg-stone-700 [&_a]:pointer-events-auto"
	>
		<div class="border border-stone-300 bg-stone-50 dark:border-stone-600 dark:bg-stone-400">
			<slot name="svg" />
		</div>
		<div class="pt-2">
			<h3 class="text-primary-600 dark:text-primary-400 text-xl font-bold">
				<slot name="title" />
			</h3>
			<p class="text-sm text-stone-900 dark:text-stone-200">
				<slot name="description" />
			</p>
		</div>
	</div>
</div>

<style>
	:root {
		--perspective: 400px;
		--rotateX: 0;
		--rotateY: 0;
		--angle: 5deg;
	}

	.tilting-card {
		transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(var(--rotateY));
		transition: transform 350ms ease;
	}
</style>
