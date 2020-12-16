import React from 'react';
import './Article.css';
import Tea from './tea.webp';
import Modify from './modify.svg';
import { useHistory, Link } from 'react-router-dom';
import { ArticleInfo, ExternalControl } from './ArticleProps';
import { DelButton } from '../CtrlButtons/DelButton/DelButton';
import { VisibilityToggleButton } from '../CtrlButtons/VisibilityToggleButton/VisibilityToggleButton';

function ArticleMemo(props: ArticleInfo & ExternalControl) {
	const history = useHistory();

	const modify = () => history.push(`/editor/${props.aid}`);

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
					<VisibilityToggleButton {...props} />
					<div className="icon">
						<img src={Modify} alt="modify" onClick={modify} />
					</div>
					<DelButton {...props} />
				</div>
			</div>
		</div>
	);
}

export const Article = React.memo(ArticleMemo);