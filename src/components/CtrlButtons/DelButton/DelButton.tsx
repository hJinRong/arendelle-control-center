import { message, Popconfirm } from 'antd';
import axios from 'axios';
import React from 'react';
import { ArticleInfo, ExternalControl } from '../../Article/ArticleProps';
import Delete from './delete.svg';
import '../buttons.css';

const DelButtonMemo = (props: ArticleInfo & ExternalControl) => {
	const deleteArticle = () => {
		axios
			.get(`https://arendelle.tech/api/delete-article/${props.aid}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					Accept: 'plain/text',
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
	);
};

export const DelButton =  React.memo(DelButtonMemo);