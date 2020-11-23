import React, { useState } from 'react';
import './Article.css';
import Tea from './tea.jpg';
import Visibility from './visibility.svg';
import VisibilityOff from './visibility-off.svg';
import Modify from './modify.svg';
import Delete from './delete.svg';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { message, Popconfirm } from 'antd';
import { ArticleInfo, ExternalControl } from './ArticleProps';

export default function Article(props: ArticleInfo & ExternalControl) {
	const [visibility, setVisibility] = useState(props.vi);
	const history = useHistory();

	const toggleVisibility = () => {
		axios
			.get(`https://arendelle.tech/api/vi/${props.aid}`, {
				params: {
					vi: !visibility,
				},
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					Accept: 'plain/text',
				},
			})
			.then((response) => {
				if (response.data === 'DONE') {
					setVisibility(!visibility);
				}
			})
			.catch((error) => {
				throw error;
			});
	};

	const modify = () => history.push(`/editor/${props.aid}`);

	const deleteArticle = () => {
		axios
			.get(`https://arendelle.tech/api/delete-article/${props.aid}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					Accept: 'plain/text'
				},
			})
			.then((response) => {
				if (response.data === 'DONE') {
					message.success('Deleted');
					props.removeArticleItem(props.aid);
				} else {
					message.error('Error occurred');
				}
			})
			.catch((error) => {
				throw error;
			});
	};

	return (
		<div className="article-con">
			<img
				className="figure"
				src={
					props.figure
						? `https://arendelle.tech/api/get-figure/${props.figure}`
						: Tea
				}
				alt="figure"
			></img>
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
					<Popconfirm
						title="Are you sure to delete the article?"
						okText="Sure"
						cancelText="Cancel"
						placement="right"
						onConfirm={deleteArticle}
					>
						<div className="icon">
							<img src={Delete} alt="delete" />
						</div>
					</Popconfirm>
				</div>
			</div>
		</div>
	);
}
