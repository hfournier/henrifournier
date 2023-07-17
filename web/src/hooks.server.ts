import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	type themeType = 'dark' | 'light';
	let theme: themeType = null;

	const newTheme = event.url.searchParams.get('theme') as themeType;
	const cookietheme = event.cookies.get('theme') as themeType;

	try {
		if (newTheme) {
			theme = newTheme;
		} else if (cookietheme) {
			theme = cookietheme;
		}

		if (theme) {
			return await resolve(event, {
				transformPageChunk: ({ html }) =>
					html.replace('changeThemeClass', theme === 'dark' ? theme : '')
				// .replace('prism-okaidia', theme === 'dark' ? 'prism-vsc-dark-plus' : 'prism-one-light')
			});
		} else {
			return await resolve(event);
		}
	} catch (error) {
		console.log(error);
		return await resolve(event);
	}
};
