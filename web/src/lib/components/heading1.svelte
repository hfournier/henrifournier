<script lang="ts">
	export let justify = 'md:text-center';
</script>

<h1
	class="text-primary-600 before:content-left-angle after:content-right-slash-angle pb-2 text-2xl font-medium after:pl-2 sm:py-4 sm:text-3xl md:pb-6 md:text-4xl {justify ||
		''}"
>
	<slot />
</h1>
