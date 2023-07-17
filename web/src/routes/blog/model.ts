export interface Author {
	_id: string;
	bio?: any[];
	image?: { asset: {} };
	name: string;
	slug: { current: string };
	title: string;
}

export interface Category {
	_id: string;
	title: string;
}

export interface Comment {
	_id: string;
	name: string;
	email: string;
	comment: string;
	createdAt: string;
	replies: Reply[];
}

export interface Reply {
	_key: string;
	name: string;
	email: string;
	comment: string;
	createdAt: string;
}

export interface Post {
	_id: string;
	author: Author;
	body: any[];
	categories: Category[];
	commentCount: number;
	comments?: Comment[];
	excerpt: string;
	headings: any[];
	publishedAt: string;
	slug: { current: string };
	title: string;
	related?: {
		slug: { current: string };
		title: string;
	}[];
}
