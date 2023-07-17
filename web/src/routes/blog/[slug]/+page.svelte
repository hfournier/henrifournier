<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { PortableText } from '@portabletext/svelte';
	import BlogComments from '$lib/components/blog-comments.svelte';
	import Button from '$lib/components/form/button.svelte';
	import CustomCode from '$lib/components/portable-text/custom-code.svelte';
	import CustomHeadings from '$lib/components/portable-text/custom-headings.svelte';
	import CustomInlineCode from '$lib/components/portable-text/custom-inline-code.svelte';
	import CustomList from '$lib/components/portable-text/custom-list.svelte';
	import CustomListItem from '$lib/components/portable-text/custom-list-item.svelte';
	import InputText from '$lib/components/form/input-text.svelte';
	import InputTextarea from '$lib/components/form/input-textarea.svelte';
	import SanityImage from '$lib/components/sanity-image.svelte';
	import TocHeadings from '$lib/components/portable-text/toc-headings.svelte';
	import { commentForm, resetFormComment } from '$lib/stores/comment';
	import { toast } from '$lib/stores/toast.js';
	import { clearSnapshot, restoreSnapshot, takeSnapshot } from '$lib/utils/forms';
	import { validateForm } from '$lib/utils/validation.js';

	const snapshotKey = 'commentForm';
	let formElement: HTMLFormElement;

	export let data;
	$: ({ post } = data);
	$: {
		if ($page.form) {
			// console.log($page.form);
			if ($page.form.success && $page.form.comments) {
				post.comments = $page.form.comments;
			}
			if ($page.form.action === 'add') {
				if ($page.form.success) {
					clearSnapshot(snapshotKey);
					$toast = {
						index: 0,
						message: "Thank you for commenting. We'll review it ASAP.",
						show: true
					};
				} else {
					$toast = {
						index: 1,
						message: 'Something went wrong. Please try again later.',
						show: true
					};
				}
			}
		}
	}

	afterNavigate(({ type }) => {
		restoreSnapshot(snapshotKey, commentForm);
	});

	beforeNavigate(({ type }) => {
		takeSnapshot(snapshotKey, $commentForm);
	});

	const submit: SubmitFunction = ({ form, data, cancel }) => {
		const formData = Object.fromEntries(data.entries());
		validateForm(commentForm, formData);

		// cancel submission if form data is invalid
		if (!$commentForm.valid) {
			cancel();
		}

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					console.log('Comment added');
					resetFormComment();
					form.reset();
					break;

				case 'failure':
					console.log('Comment failed');
					await applyAction(result);
					break;

				default:
					console.log('Comment error');
					await applyAction(result);
					break;
			}

			await update();
		};
	};
</script>

<svelte:head>
	<title>Henri Fournier | Developer Blog | {post.title}</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<div class="grid min-h-[65vh] gap-8 px-2 md:grid-cols-[minmax(0,_1fr),_auto] md:px-8 lg:px-12">
	<article class="space-y-6 rounded-lg bg-stone-100 p-4 shadow-lg dark:bg-stone-800">
		<h1 class="text-primary-600 py-2 text-2xl font-medium sm:text-3xl md:text-4xl">
			{post.title}
		</h1>
		<div
			class="mb-4 rounded-lg border-2 border-dashed border-stone-300 bg-stone-200 p-4 dark:border-stone-600 dark:bg-stone-700"
		>
			<div class="font-baloo2 text-secondary-800 dark:text-secondary-400 text-sm uppercase">
				Summary
			</div>
			<p class="text-primary-900 dark:text-primary-50">{post.excerpt}</p>
		</div>

		<PortableText
			value={post.body}
			components={{
				block: {
					h1: CustomHeadings,
					h2: CustomHeadings,
					h3: CustomHeadings,
					h4: CustomHeadings
				},
				list: {
					bullet: CustomList
				},
				listItem: {
					bullet: CustomListItem,
					normal: CustomListItem
				},
				marks: {
					inlinecode: CustomInlineCode
				},
				types: {
					code: CustomCode
				}
			}}
			onMissingComponent={(message, context) => {
				console.log(message, context);
			}}
		/>
	</article>
	<aside
		class="flex h-fit flex-col gap-4 divide-y divide-stone-300 rounded-lg bg-stone-100 p-4 shadow-lg dark:divide-stone-700 dark:bg-stone-800 md:max-w-[14rem] lg:max-w-xs"
	>
		<div class="space-y-4 pb-3">
			<div class="flex items-center gap-4 py-4">
				<div
					class="hexagon from-primary-600 to-secondary-600 flex max-w-fit items-center self-center bg-gradient-to-br p-0.5"
				>
					{#if post.author.image}
						<SanityImage
							css="hexagon object-cover"
							src={post.author.image}
							alt={post.author.name}
							options={{ width: 64 }}
						/>
					{:else}
						<div class="hexagon w-16" />
					{/if}
				</div>
				<div class="flex flex-col">
					<div class="font-bold">{post.author.name}</div>
					<div class="text-xs uppercase">{post.author.title}</div>
				</div>
			</div>
			<PortableText
				value={post.author.bio}
				onMissingComponent={(message, context) => {
					console.log(message, context);
				}}
			/>
			<form class="flex flex-col gap-4" method="post" action="/blog?/filterPosts">
				<button
					class="decoration-secondary-600 hover:text-secondary-700 dark:decoration-secondary-500 dark:hover:text-secondary-400 max-w-fit text-xs underline underline-offset-4"
					name="btnA-{post.author.name.replace(/ /g, '-')}"
					type="submit"
					value={post.author.name}>More from this author...</button
				>
			</form>
		</div>

		<div class="space-y-4 pb-2 pt-4">
			<div class="flex items-baseline">
				<div class="basis-[5.5rem] text-sm uppercase text-stone-600 dark:text-stone-400">
					Published
				</div>
				<date>
					{new Date(post.publishedAt).toLocaleDateString('en-CA', {
						month: 'long',
						day: 'numeric',
						year: 'numeric'
					})}
				</date>
			</div>

			<div class="flex items-center">
				<div class="basis-[5.5rem] text-sm uppercase text-stone-600 dark:text-stone-400">Tags</div>
				<form class="flex flex-col gap-4" method="post" action="/blog?/filterPosts">
					<div class="flex flex-wrap gap-4">
						{#each post.categories as category}
							<button
								class="hover:border-secondary-600 hover:text-secondary-600 dark:hover:text-secondary-500 hover:shadow-secondary-600/50 dark:hover:border-secondary-600 rounded-md border border-stone-500 px-1.5 py-0.5 text-xs transition-transform hover:scale-105 hover:shadow-md dark:border-stone-400"
								name="btnC-{category.title.replace(/ /g, '-')}"
								type="submit"
								value={category.title}>{category.title}</button
							>
						{/each}
					</div>
				</form>
			</div>
		</div>

		<div class="flex items-center pb-2 pt-4">
			<div class="basis-[5.5rem] text-sm uppercase text-stone-600 dark:text-stone-400">Share</div>
			<div class="flex items-center gap-4 text-stone-600 dark:text-stone-400">
				<a href={`https://twitter.com/intent/tweet?text=${post.title}&url=${$page.url.href}`}>
					<!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						class="aspect-square w-7 text-stone-400 hover:text-[#1DA1F2] dark:text-stone-600 dark:hover:text-[#1DA1F2]"
					>
						<path
							d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
							fill="currentColor"
						/></svg
					>
				</a>
				<a href={`https://www.facebook.com/sharer.php?u=${$page.url.href}`}>
					<!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						class="aspect-square w-7 text-stone-400 hover:text-[#1877F2] dark:text-stone-600 dark:hover:text-[#1877F2]"
						><path
							d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
							fill="currentColor"
						/></svg
					>
				</a>
				<a href={`https://www.linkedin.com/shareArticle?url=${$page.url.href}`}>
					<svg
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 50 50"
						class="aspect-square w-7 text-stone-400 hover:text-[#2767B1] dark:text-stone-600 dark:hover:text-[#2767B1]"
						style="enable-background:new 0 0 50 50"
						aria-label="LinkedIn icon"
						xml:space="preserve"
						><path
							d="M42.9 2.7H7.1c-2.5 0-4.5 2-4.5 4.5v35.7c0 2.5 2 4.5 4.5 4.5h35.7c2.5 0 4.5-2 4.5-4.5V7.1c0-2.4-2-4.4-4.4-4.4z"
							style="fill-rule:evenodd;clip-rule:evenodd;"
							fill="none"
							stroke-width="3"
							stroke="currentColor"
						/><path
							d="M12.7 9.8c-2.2 0-4.1 1.8-4.1 4.1s1.9 4.1 4.1 4.1c2.2 0 4.1-1.8 4.1-4.1s-1.9-4.1-4.1-4.1zM9.4 40.6h6.7V20.5H9.4v20.1zm23.5-20.3c-2.7 0-4.8 1.2-5.8 2.8v-2.5h-6.6v20.1h6.7v-8.4c0-3.1 1.1-5 3.5-5 1.8 0 3.2 1.2 3.2 4.4v9h6.7V28.5c0-5.8-2.6-8.2-7.7-8.2z"
							style="fill-rule:evenodd;clip-rule:evenodd;"
							fill="currentColor"
						/></svg
					></a
				>
			</div>
		</div>

		<!-- Add in this article section if there any headings -->
		{#if post.headings?.length > 0}
			<div class="flex flex-col pb-4 pt-6 md:gap-4">
				<h4 class="text-primary-700 dark:text-primary-400 text-xl">In this article</h4>
				<ul class="space-y-1">
					<PortableText
						value={post.headings}
						components={{
							block: {
								h1: TocHeadings,
								h2: TocHeadings,
								h3: TocHeadings,
								h4: TocHeadings
							}
						}}
						onMissingComponent={(message, context) => {
							console.log(message, context);
						}}
					/>
				</ul>
			</div>
		{/if}
		<!-- Add related article section if there are any -->
		{#if post.related?.length > 0}
			<div class="flex flex-col pb-4 pt-6 md:gap-4">
				<h4 class="text-primary-700 dark:text-primary-400 text-xl">Related articles</h4>
				<ul class="space-y-3 pl-4">
					{#each post.related as rp}
						<li>
							<a
								class="decoration-secondary-600 hover:text-secondary-700 dark:decoration-secondary-500 dark:hover:text-secondary-400 no-underline hover:underline"
								href="/blog/{rp.slug.current}">{rp.title}</a
							>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</aside>
	<section class="space-y-4 rounded-lg bg-stone-100 px-4 pb-4 pt-3 shadow-lg dark:bg-stone-800">
		<h4 class="text-secondary-700 dark:text-secondary-400 text-xl">Comments</h4>

		{#if !post.comments && post.commentCount > 0}
			<form class="flex justify-center" method="post" action="?/showComments" use:enhance>
				<Button name="btnComment" type="submit" value={post.slug.current}>
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
							d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
						/>
					</svg>
					Show Comments
					<span
						class="group-hover:text-secondary-700 dark:group-hover:text-secondary-200 -mt-1.5 rounded-full bg-stone-200 px-1 py-0.5 text-xs dark:bg-stone-600"
						>{post.commentCount}</span
					></Button
				>
			</form>
		{:else}
			<form
				class="flex flex-col gap-6 rounded-lg bg-stone-200 p-4 dark:bg-stone-700"
				method="post"
				bind:this={formElement}
				use:enhance={submit}
			>
				<div class="flex gap-6">
					<InputText form={commentForm} formControlName={$commentForm?.controls?.name.name} />
					<InputText form={commentForm} formControlName={$commentForm?.controls?.email.name} />
				</div>
				<InputTextarea
					form={commentForm}
					formControlName={$commentForm?.controls?.comment.name}
					rows={3}
				/>
				<input type="hidden" name="postId" value={post._id} />
				<div class="flex gap-6">
					<Button
						cssClasses="grow justify-center"
						name="btnAddComment"
						type="submit"
						formaction="?/addComment"
						value={post.slug.current}
					>
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
								d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
							/>
						</svg>Submit comment
					</Button>
					<Button
						type="reset"
						preventDefault="true"
						on:click={() => {
							clearSnapshot(snapshotKey);
							formElement.reset();
							formElement.checkValidity;
							resetFormComment();
							formElement.getElementsByTagName('input')[0].focus();
						}}
					>
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
								d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>Clear
					</Button>
				</div>
				<div class="text-xs">
					Note: all comments are monitored and will only be approved if they are appropriate and
					respectful. Thank you.
				</div>
			</form>
			{#if post.comments}
				<BlogComments comments={post.comments} />
			{/if}
		{/if}
	</section>
</div>
