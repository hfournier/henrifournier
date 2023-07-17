<script lang="ts">
	import { fade } from 'svelte/transition';
	import { closeModal, modal } from '$lib/stores/modal';
</script>

<div
	class="fixed inset-0 z-10 rounded-md p-0"
	aria-modal="true"
	aria-labelledby="modal-title"
	transition:fade
>
	<!-- Overlay -->
	<div class="fixed inset-0 bg-stone-700/90" aria-hidden="true" />
	<!-- Panel -->
	<div
		class="relative flex h-full w-full items-center justify-center"
		on:click={() => {
			closeModal();
		}}
		on:keypress={() => {
			closeModal();
		}}
	>
		<!-- Dialog -->
		<div
			role="document"
			class="mx-2 max-w-lg divide-y-[1px] divide-stone-300 rounded-md border border-stone-200 bg-stone-200 text-stone-900 shadow-lg dark:divide-stone-700 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-200 sm:mx-0"
			on:click|stopPropagation
			on:keypress|stopPropagation
		>
			<!-- header -->
			{#if $$slots.title}
				<div class="flex items-center justify-between p-4">
					<h2 id="modal-title" class="text-lg font-bold text-stone-900 dark:text-stone-100">
						<slot name="title" />
					</h2>
					<button
						type="button"
						class="text-2xl font-bold"
						on:click={() => {
							closeModal();
						}}
						tabIndex="-1"
						aria-hidden="true"
						aria-label="Close modal dialog">&times;</button
					>
				</div>
			{/if}

			<!-- body -->
			<div
				class="bg-stone-100 p-4 dark:bg-stone-700 {$$slots.footer
					? ''
					: 'rounded-b-md'} {$$slots.title ? '' : 'rounded-t-md'}"
			>
				{#if !$$slots.title}
					<div class="-mr-1 -mt-4 flex justify-end">
						<button
							class="hover:rotate-18 text-2xl font-bold hover:origin-bottom"
							on:click={() => closeModal()}
							tabIndex="-1"
							aria-label="Close modal dialog">&times;</button
						>
					</div>
				{/if}
				<slot />
			</div>

			<!-- footer -->
			{#if $$slots.footer}
				<slot name="footer" />
			{/if}
		</div>
	</div>
</div>
