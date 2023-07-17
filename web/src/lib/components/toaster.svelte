<script lang="ts">
	import Toast from '$lib/components/toast.svelte';
	import { toast } from '$lib/stores/toast';

	let activeToast = null;

	$: {
		if ($toast && $toast.show) {
			activeToast = Toast;
			setTimeout(() => {
				$toast = null;
			}, 5500);
		} else {
			activeToast = null;
		}
	}
</script>

<section
	class="pointer-events-none fixed inset-x-0 bottom-0 z-50 grid place-items-center px-2 pb-8"
>
	<svelte:component this={activeToast} />
</section>
