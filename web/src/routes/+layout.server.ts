export const load = async ({ cookies }) => {
	const theme = cookies.get('theme');
	return { theme };
	// return { theme: theme ?? 'dark' }; // if you want default to be dark
};
