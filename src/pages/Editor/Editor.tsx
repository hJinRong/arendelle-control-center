/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import marked from 'marked';
import { useRef, useEffect, useState } from 'react';
import { useHistory, useParams, Prompt } from 'react-router-dom';
import axios from 'axios';
import './Editor.css';
import Save from './save.svg';
import Download from './download.svg';
import Home from './home.svg';
import keyboardJS from 'keyboardjs';

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
	padding: 60px 50px 0;
`;

interface New {
	new?: boolean;
}

export default function Editor(props: any) {
	const editablePart = useRef<HTMLTextAreaElement>(null);
	const showPart = useRef<HTMLDivElement>(null);
	const history = useHistory();
	const { aid } = useParams();
	const [blocking, setBlocking] = useState(false);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	useEffect(() => {
		keyboardJS.bind('tab', (e) => {
			if (editablePart.current) {
				editablePart.current.focus();
				let startPos = editablePart.current.selectionStart;
				const front = editablePart.current.value.substring(0, startPos);
				const back = editablePart.current.value.substring(
					startPos,
					editablePart.current.value.length
				);
				editablePart.current.value = front + '\t' + back;
				editablePart.current.focus();
				editablePart.current.selectionStart = editablePart.current.value.length;
			}
		});
	}, []);

	useEffect(() => {
		document.title = title;
	});

	useEffect(() => {
		if (localStorage.getItem('token') === null) {
			history.push('/login');
		} else if (history.location.state) {
			let obj: New = history.location.state;
			obj.new === true &&
				axios.post(
					`http://localhost:8080/api/new-article/${aid}`,
					{},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				);
		} else {
			axios
				.get(`http://localhost:8080/api/get-article/${aid}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				.then(function (response) {
					const data = response.data;
					setTitle(data?.title);
					setContent(data?.content);
				})
				.catch(function (error) {
					throw error;
				});
		}
	}, [aid, history]);

	useEffect(() => {
		if (showPart.current) {
			showPart.current.innerHTML = marked(content);
		}
	}, [content]);

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
			<input
				type="text"
				name="title"
				value={title}
				onChange={(e) => {
					setBlocking(true);
					setTitle(e.target.value);
				}}
				css={css`
					width: 100%;
					height: 45px;
					border: solid 1px black;
					padding: 0 0.3em;
					font-size: 28px;
					position: absolute;
					z-index: 100;
				`}
			/>
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
					<img
						src={Home}
						alt="home"
						onClick={() => history.push('/control-panel')}
					/>
				</div>
				<textarea
					ref={editablePart}
					css={css`
						${half}
						resize: none;
						font-size: larger;
					`}
					onChange={(e) => {
						setBlocking(true);
						setContent(e.target.value);
					}}
					value={content}
				></textarea>
				<div
					css={css`
						${half}
						border-left: dotted 1px gray;
					`}
					ref={showPart}
				></div>
			</div>
		</div>
	);
}
