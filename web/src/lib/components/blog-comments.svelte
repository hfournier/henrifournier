<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Comment } from '../../routes/blog/model';
	import { formatBlogDate } from '$lib/utils/dates';
	import BlogReplies from './blog-replies.svelte';

	export let comments: Comment[];
</script>

{#each comments as comment}
	<div class="flex flex-col gap-3 rounded-lg bg-stone-200 p-4 dark:bg-stone-700" in:fade>
		<div class="flex justify-between text-xs text-stone-700 dark:text-stone-300">
			<span>
				{formatBlogDate(comment.createdAt)}
				{comment.name ? comment.name : 'someone'} wrote:
			</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-6 w-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z M12 7v6m3-3H9"
				/>
			</svg>
		</div>
		<div class="text-sm text-stone-900 dark:text-stone-100">
			{comment.comment}
		</div>
		{#if comment.replies}
			<BlogReplies replies={comment.replies} />
		{/if}
	</div>
{/each}
