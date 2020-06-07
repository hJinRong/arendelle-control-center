import React, { useState } from 'react';
import './Article.css';
import Tea from './tea.jpg';
import Visibility from './visibility.svg';
import VisibilityOff from './visibility-off.svg';
import Modify from './modify.svg';
import { useHistory } from 'react-router-dom';
import ArticleInfo from './ArticleInfo';
import axios from 'axios';

export default function Article(props: ArticleInfo) {
	const [visibility, setVisibility] = useState(props.vi);
	const history = useHistory();

	const toggleVisibility = () => {
		axios
			.post(
				`http://localhost:8080/vi/${props.aid}`,
				{},
				{
					params: {
						vi: !visibility,
					},
				}
			)
			.then(function (response) {
				if (response.data.res === 'DONE') {
					setVisibility(!visibility);
				}
			})
			.then(function (error) {
				throw error;
			});
	};

	const modify = () => history.push('/editor/');

	return (
		<div className="article-con">
			<img className="figure" src={Tea} alt="figure"></img>
			<div className="info">
				<a className="title" href={'.'}>
					{props.title}
				</a>
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
				</div>
			</div>
		</div>
	);
}
