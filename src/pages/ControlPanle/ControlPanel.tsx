import React, { useEffect, useState } from 'react';
import Article from '../../components/Article/Article';
import './ControlPanel.css';
import Axios from 'axios';
import ArticleInfo from '../../components/Article/ArticleInfo';

export default function ControlPanel() {
	const tmp: ArticleInfo[] = [];

	const [articles, setArticles] = useState(tmp);

	useEffect(() => {
		if (articles === tmp) {
			Axios.get('http://localhost:8080/api/my-articles', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					Accept: 'application/json',
				},
			})
				.then(function (response) {
					setArticles(response.data);
				})
				.catch(function (error) {
					throw error;
				});
		}
	});

	return (
		<>
			{articles.map((i) => (
				<Article key={i.aid.toString()} {...i} />
			))}
		</>
	);
}
