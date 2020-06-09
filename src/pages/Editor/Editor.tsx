/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import marked from 'marked';
import { useRef, useEffect, useState } from 'react';
import Nav from '../../components/Nav/Nav';
import { useHistory, useParams, Prompt } from 'react-router-dom';
import axios from 'axios';
import './Editor.css';
import Save from './save.svg';
import Download from './download.svg';

const iconCon = css`
	position: absolute;
	bottom: 1em;
	right: 1em;
	z-index: 99;
	& > img {
		float: left;
		margin: 0.2em;
		display: block;
		cursor: pointer;
		background: white;
	}
	& > img:hover {
		border: dotted 1px gray;
	}
`;

const editorCon = css`
	position: absolute;
	display: block;
	width: 100%;
	height: 100%;
	float: left;
`;

const half = css`
	display: block;
	position: relative;
	height: 100%;
	width: 50%;
	float: left;
`;

export default function Editor() {
	const editablePart = useRef<HTMLTextAreaElement>(null);
	const showPart = useRef<HTMLDivElement>(null);
	const history = useHistory();
	const { aid } = useParams();
	const [blocking, setBlocking] = useState(false);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	useEffect(() => {
		if (localStorage.getItem('token') === null) {
			history.push('/login');
		} else {
			axios
				.get(`http://localhost:8080/api/get-article/${aid}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				.then(function (response) {
					const data = response.data;
					setTitle(data.title);
					setContent(data.content);
				})
				.catch(function (error) {
					throw error;
				});
		}
	}, [aid, history]);

	useEffect(() => {
		if (showPart.current && editablePart.current) {
			showPart.current.innerHTML = marked(editablePart.current.value);
		}
	}, [content]);

	const editing = () => {
		setBlocking(true);
		if (editablePart.current) {
			setContent(editablePart.current.value);
		}
	};

	const saveAll = () => {
		axios
			.post(
				`http://localhost:8080/api/save/${aid}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					params: {
						aid: aid,
						title: title,
						content: content,
					},
				}
			)
			.then(function (response) {
				if (response.data === 'DONE') {
					setBlocking(false);
				}
			})
			.catch(function (error) {
				throw error;
			});
	};

	const download = (filename: string, content: string) => {
		let element = document.createElement('a');
		element.setAttribute(
			'href',
			'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
		);
		element.setAttribute('download', filename);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	const downloadToLocal = () => {
		download(title, content);
	};

	return (
		<div>
			<Nav />
			<Prompt
				when={blocking}
				message={(location) =>
					`内容发生改变，是否不保存，立刻前往<${location.pathname}>?`
				}
			/>
			<div
				css={css`
					${editorCon}
				`}
			>
				<div
					css={css`
						${iconCon}
					`}
				>
					<img src={Save} alt="save" onClick={saveAll} />
					<img src={Download} alt="download" onClick={downloadToLocal} />
				</div>
				<textarea
					id="textarea"
					ref={editablePart}
					css={css`
						${half}
						padding: 50px;
						resize: none;
						font-size: larger;
					`}
					onChange={editing}
					value={content}
				></textarea>
				<div
					css={css`
						${half}
						padding: 50px;
					`}
					ref={showPart}
				></div>
			</div>
		</div>
	);
}
