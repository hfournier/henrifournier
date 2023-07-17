import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	changeTheme: async ({ cookies, url }) => {
		if (url.searchParams.has('theme')) {
			const theme = url.searchParams.get('theme');
			if (theme === 'dark' || theme === 'light') {
				cookies.set('theme', theme, { path: '/', maxAge: 60 * 60 * 24 * 365 });
			}
		}

		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo');
			throw redirect(303, redirectTo.startsWith('/') ? redirectTo : '/');
		}
	}
};
