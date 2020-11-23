export interface ArticleInfo {
	aid: string;
	title: string;
	date: string;
	vi: boolean;
	figure: string;
}

export interface ExternalControl {
	removeArticleItem: (aid: string) => void;
}
