import React, { useCallback, useEffect, useState } from 'react';
import { Article } from '../../components/Article/Article';
import './ControlPanel.css';
import axios from 'axios';
import Pen from './pen.svg';
import SignOut from './sign-out.svg';
import { useHistory } from 'react-router-dom';
import { ArticleInfo } from '../../components/Article/ArticleProps';

export default function ControlPanel() {
	const [articles, setArticles] = useState<ArticleInfo[]>();

	const history = useHistory();

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			history.push('/login');
		}
	});

	useEffect(() => {
		document.title = 'Arendelle control center';
	});

	useEffect(() => {
		axios
			.get('https://arendelle.tech/api/my-articles')
			.then((response) => {
				setArticles(response.data);
			})
			.catch((error) => {
				throw error;
			});
	}, []);

	const newArticle = () => {
		axios
			.get('https://arendelle.tech/api/request-new-aid')
			.then((response) => {
				let aid = response.data;
				history.push({
					pathname: `/editor/${aid}`,
					state: {
						new: true,
					},
				});
			})
			.catch((error) => {
				throw error;
			});
	};

	const signOut = () => {
		localStorage.removeItem('token');
		history.replace('/login');
	};

	const removeArticleCallback = useCallback(
		(aid: string) => {
			setArticles(articles?.filter((item) => item.aid !== aid));
		},
		[articles]
	);

	return (
		<>
			{articles?.map((i) => (
				<Article
					key={i.aid.toString()}
					{...i}
					removeArticleItem={removeArticleCallback}
				/>
			))}
			<div className="ctr-btn">
				<div className="signout" title="Sign out" onClick={signOut}>
					<img src={SignOut} alt="Sign out" />
				</div>
				<div className="new" title="New article" onClick={newArticle}>
					<img src={Pen} alt="New article" />
				</div>
			</div>
		</>
	);
}
