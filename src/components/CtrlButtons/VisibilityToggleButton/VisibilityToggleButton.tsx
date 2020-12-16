import React, { useState } from 'react';
import axios from 'axios';
import Visibility from './visibility.svg';
import VisibilityOff from './visibility-off.svg';
import '../buttons.css';
import { ArticleInfo } from '../../Article/ArticleProps';

const VisibilityToggleButtonMemo = (props: ArticleInfo) => {
	const [visibility, setVisibility] = useState(props.vi);

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

	return (
		<div className="icon">
			<img
				src={visibility ? Visibility : VisibilityOff}
				alt="visibility control"
				onClick={toggleVisibility}
			/>
		</div>
	);
};

export const VisibilityToggleButton = React.memo(VisibilityToggleButtonMemo);
