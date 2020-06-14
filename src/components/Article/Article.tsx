import React, { useState } from 'react';
import './Article.css';
import Tea from './tea.jpg';
import Visibility from './visibility.svg';
import VisibilityOff from './visibility-off.svg';
import Modify from './modify.svg';
import Delete from './delete.svg';
import { useHistory, Link } from 'react-router-dom';
import ArticleInfo from './ArticleInfo';
import axios from 'axios';
import { message } from 'antd';

export default function Article(props: ArticleInfo) {
	const [visibility, setVisibility] = useState(props.vi);
	const history = useHistory();

	const toggleVisibility = () => {
		axios
			.get(`http://localhost:8080/api/vi/${props.aid}`, {
				params: {
					vi: !visibility,
				},
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					Accept: 'plain/text',
				},
			})
			.then(function (response) {
				if (response.data === 'DONE') {
					setVisibility(!visibility);
				}
			})
			.catch(function (error) {
				throw error;
			});
	};

	const modify = () => history.push(`/editor/${props.aid}`);

	const deleteArticle = () => {
		axios
			.get(`http://localhost:8080/api/delete-article/${props.aid}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then(function (response) {
				if (response.data === 'DONE') {
					message.success('Deleted');
				} else {
					message.error('Error occurred');
				}
			})
			.catch(function (error) {
				throw error;
			});
	};

	return (
		<div className="article-con">
			<img className="figure" src={Tea} alt="figure"></img>
			<div className="info">
				<Link className="title" to={`/editor/${props.aid}`}>
					{props.title}
				</Link>
				<h5>{props.date}</h5>
				<div className="control-list">
					<div className="icon">
						<img
							src={visibility ? Visibility : VisibilityOff}
							alt="visibility control"
							onClick={toggleVisibility}
						/>
					</div>
					<div className="icon">
						<img src={Modify} alt="modify" onClick={modify} />
					</div>
					<div className="icon">
						<img src={Delete} alt="delete" onClick={deleteArticle} />
					</div>
				</div>
			</div>
		</div>
	);
}
