<script lang="ts">
	import { enhance } from '$app/forms';
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Heading1 from '$lib/components/heading1.svelte';
	import Heading3 from '$lib/components/heading3.svelte';
	import type { Post } from './model';

	export let data;
	const { posts, authors, categories } = data;

	afterNavigate((n) => {
		if (n.to.url.search) {
			goto('/blog');
		}
	});

	let authorFilter: string;
	let categoryFilter: string[];
	let filteredPosts: Post[] = [];

	$: {
		if ($page.form?.success) {
			// console.log('form success');
			if ($page.form) {
				if ($page.form.authorFilter) {
					authorFilter = $page.form.authorFilter;
				} else {
					authorFilter = null;
				}
				if ($page.form.categoryFilter) {
					categoryFilter = [...$page.form.categoryFilter];
				} else {
					categoryFilter = [];
				}
				filterPosts(authorFilter, categoryFilter);
			}
		}
	}

	const filterPosts = (aFilter: string, cFilter: string[]) => {
		if (cFilter?.length > 0 || aFilter) {
			filteredPosts = posts.filter((p) => {
				let notFound = true;
				cFilter.forEach((f) => {
					if (!p.categories.find((c) => f === c.title)) {
						notFound = false;
					}
				});
				if (aFilter && aFilter !== p.author.name) {
					notFound = false;
				}
				return notFound;
			});
		} else {
			filteredPosts = [...posts];
		}
	};

	authorFilter = null;
	categoryFilter = [];
	filterPosts(authorFilter, categoryFilter);
</script>

<svelte:head>
	<title>Henri Fournier | Developer Blog</title>
	<meta
		name="description"
		content="Blog about developing projects using Svelte, 11ty, Angular, TailwindCSS and Sanity on Netlify"
	/>
</svelte:head>

<section
	class="grid min-h-[65vh] gap-8 px-2 md:grid-cols-[minmax(0,_1fr),_auto] md:px-8 lg:gap-12 lg:px-12"
	aria-label="blogs"
>
	<div class="">
		<Heading1 justify="text-left">Blog Posts</Heading1>
		<ul class="flex flex-col gap-10 md:divide-y-2 md:divide-stone-300 dark:md:divide-stone-500">
			{#each filteredPosts as post}
				{#if post.publishedAt}
					<li class="flex flex-col gap-2 pt-4 first:pt-0">
						<div class="text-stone-800 dark:text-stone-100">
							<span class=""
								>{new Date(post.publishedAt).toLocaleDateString('en-CA', {
									month: 'long',
									day: 'numeric',
									year: 'numeric'
								})}</span
							>
						</div>
						<h2>
							<a class="text-lg md:text-xl lg:text-2xl" href="/blog/{post.slug.current}"
								>{post.title}</a
							>
						</h2>
						<div class="text-stone-800 dark:text-stone-100">
							{post.excerpt}
						</div>
						<div class="flex flex-wrap gap-2">
							{#each post.categories as category}
								<span
									class="rounded-full border border-stone-500 px-1.5 py-0.5 text-xs dark:border-stone-400"
									>{category.title}</span
								>
							{/each}
						</div>
					</li>
				{/if}
			{/each}
		</ul>
	</div>

	<aside>
		<form
			class="flex h-fit flex-col rounded-lg bg-stone-100 p-4 py-4 shadow-lg dark:bg-stone-800 md:max-w-[14rem] md:gap-8 md:divide-y-2 md:divide-stone-300 dark:md:divide-stone-500 lg:max-w-xs"
			method="post"
			action="?/filterPosts"
			use:enhance={() => {
				return async ({ update }) => {
					update({ reset: false });
				};
			}}
		>
			<div class="pt-6 md:pt-0">
				<Heading3>Authors</Heading3>
				<fieldset class="mt-4 flex flex-wrap gap-2">
					<legend class="invisible h-0">Authors</legend>
					{#each authors as author}
						<div>
							<input
								type="radio"
								class="peer appearance-none"
								name="rb-author"
								value={author.name}
								checked={authorFilter === author.name}
							/>
							<button
								class="hover:border-secondary-600 peer-checked:bg-secondary-600 peer-checked:border-secondary-600 hover:text-secondary-400 hover:shadow-secondary-500/50 rounded-md border-2 border-stone-500 px-3 py-1 text-sm hover:cursor-pointer hover:shadow peer-checked:text-stone-100"
								name="btnA-{author.name.replace(/ /g, '-')}"
								type="submit"
								value={author.name}>{author.name}</button
							>
						</div>
					{/each}
				</fieldset>
			</div>
			<div class="pt-6">
				<Heading3>Categories</Heading3>
				<div class="mt-4 flex flex-wrap gap-2">
					{#each categories as category}
						<div>
							<input
								name="cb-{category.title.replace(/ /g, '-')}"
								type="checkbox"
								class="peer appearance-none"
								value={category.title}
								checked={categoryFilter?.includes(category.title)}
							/>
							<button
								class="hover:border-secondary-600 peer-checked:bg-secondary-600 peer-checked:border-secondary-600 hover:text-secondary-600 hover:shadow-secondary-500/50 rounded-md border-2 border-stone-500 px-3 py-1 text-sm hover:shadow peer-checked:text-stone-100"
								name="btnC-{category.title.replace(/ /g, '-')}"
								type="submit"
								value={category.title}>{category.title}</button
							>
						</div>
					{/each}
				</div>
			</div>
		</form>
	</aside>
</section>
