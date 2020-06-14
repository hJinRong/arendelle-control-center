import React, { useEffect, useState } from 'react';
import Article from '../../components/Article/Article';
import './ControlPanel.css';
import axios from 'axios';
import ArticleInfo from '../../components/Article/ArticleInfo';
import Pen from './pen.svg';
import { useHistory } from 'react-router-dom';

export default function ControlPanel() {
	const tmp: ArticleInfo[] = [];
	const [articles, setArticles] = useState(tmp);

	const history = useHistory();

	useEffect(() => {
		document.title = 'Arendelle control center';
	});

	useEffect(() => {
		if (articles === tmp) {
			axios
				.get('http://localhost:8080/api/my-articles', {
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

	const newArticle = () => {
		axios
			.get('http://localhost:8080/api/request-new-aid')
			.then(function (response) {
				let aid = response.data;
				history.push({
					pathname: `/editor/${aid}`,
					state: {
						new: true,
					},
				});
			})
			.catch(function (error) {
				throw error;
			});
	};

	return (
		<>
			{articles.map((i) => (
				<Article key={i.aid.toString()} {...i} />
			))}
			<div className="new" onClick={newArticle}>
				<img src={Pen} alt="new" />
			</div>
		</>
	);
}
