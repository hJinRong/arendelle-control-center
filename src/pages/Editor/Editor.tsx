import marked from 'marked';
import { useRef, useEffect, useState } from 'react';
import { useHistory, useParams, Prompt } from 'react-router-dom';
import axios from 'axios';
import './Editor.css';
import Save from './save.svg';
import Download from './download.svg';
import Home from './home.svg';
import Upload from './upload.svg';
import Theme from './theme.svg';
import keyboardJS from 'keyboardjs';
import { message } from 'antd';
import hljs from 'highlight.js';
import './androidstudio.css';
import React from 'react';

interface New {
	new?: boolean;
}

export default function Editor(props: any) {
	const editablePart = useRef<HTMLTextAreaElement>(null);
	const showPart = useRef<HTMLDivElement>(null);
	const history = useHistory();
	const { aid } = useParams<{ aid: string }>();
	const [blocking, setBlocking] = useState(false);
	const [title, setTitle] = useState<string>();
	const [content, setContent] = useState<string>();

	const insertContent = (content: string) => {
		if (editablePart.current) {
			editablePart.current.focus();
			let startPos = editablePart.current.selectionStart;
			const front = editablePart.current.value.substring(0, startPos);
			const back = editablePart.current.value.substring(
				startPos,
				editablePart.current.value.length
			);
			editablePart.current.value = front + content + back;
			editablePart.current.focus();
			editablePart.current.selectionStart = (front + content).length;
			editablePart.current.selectionEnd = editablePart.current.selectionStart;
		}
	};

	useEffect(() => {
		keyboardJS.bind('ctrl+y', () => {
			insertContent('\t');
		});
	}, []);

	useEffect(() => {
		document.title = title ?? 'Untitled';
	});

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			history.replace('/login');
		} else if (history.location.state) {
			let obj: New = history.location.state;
			obj.new === true &&
				axios.post(
					`https://arendelle.tech/api/new-article/${aid}`,
					{},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				);
		} else {
			axios
				.get(`https://arendelle.tech/api/get-article/${aid}`)
				.then((response: { data: { title: string; content: string } }) => {
					const data = response.data;
					setTitle(data.title);
					setContent(data.content);
				})
				.catch((error) => {
					throw error;
				});
		}
	}, [aid, history]);

	useEffect(() => {
		if (showPart.current && typeof content !== 'undefined') {
			showPart.current.innerHTML = marked(content);
		}
	}, [content]);

	useEffect(() => {
		document
			.querySelectorAll<HTMLElement>('pre code')
			.forEach((block) => hljs.highlightBlock(block));
	});

	const saveAll = () => {
		axios
			.post(`https://arendelle.tech/api/save/${aid}`, content, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				params: {
					aid: aid,
					title: title,
				},
			})
			.then((response) => {
				if (response.data === 'DONE') {
					setBlocking(false);
					message.success('Saved');
				} else {
					message.error('Error occurred');
				}
			})
			.catch((error) => {
				message.error('Error occurred');
				throw error;
			});
	};

	const downloadToLocal = () => {
		const download = (filename: string, content: string) => {
			let element = document.createElement('a');
			element.setAttribute(
				'href',
				'data:text/markdown;charset=utf-8,' + encodeURIComponent(content)
			);
			element.setAttribute('download', `${filename}.md`);
			element.style.display = 'none';
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
		};
		download(title ?? 'Untitled', content ?? '');
	};

	const uploadFigure = () => {
		const input = document.createElement('input');
		input.setAttribute('id', 'tmpInput');
		input.setAttribute('type', 'file');
		input.setAttribute('style', 'visibility:hidden');
		document.body.appendChild(input);
		input.onchange = (e: Event) => {
			const input = e.target as HTMLInputElement;
			if (input.files) {
				let data = new FormData();
				data.append('figure', input.files[0]);

				const config = {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				};

				axios
					.post('https://arendelle.tech/api/upload-figure', data, config)
					.then((response) => {
						message.success('图片上传成功');
						insertContent(
							`![figure](https://arendelle.tech/api/get-figure/${response.data})\n`
						);
					})
					.catch((error) => {
						message.error('图片上传失败');
						throw error;
					})
					.finally(() => {
						const node = document.getElementById(
							'tmpInput'
						) as HTMLInputElement;
						if (node) {
							document.body.removeChild<HTMLInputElement>(node);
						}
					});
			}
		};
		input.click();
	};

	const uploadThemePicture = () => {
		const input = document.createElement('input');
		input.setAttribute('id', 'tmpInput');
		input.setAttribute('type', 'file');
		input.setAttribute('style', 'visibility:hidden');
		document.body.appendChild(input);
		input.onchange = (e: Event) => {
			const input = e.target as HTMLInputElement;
			if (input.files) {
				let data = new FormData();
				data.append('figure', input.files[0]);

				const config = {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
					params: {
						aid: aid,
					},
				};

				axios
					.post('https://arendelle.tech/api/theme-picture', data, config)
					.then(() => {
						message.success('图片上传成功');
					})
					.catch((error) => {
						message.error('图片上传失败');
						throw error;
					})
					.finally(() => {
						const node = document.getElementById(
							'tmpInput'
						) as HTMLInputElement;
						if (node) {
							document.body.removeChild<HTMLInputElement>(node);
						}
					});
			}
		};
		input.click();
	};

	return (
		<div>
			<input
				type="text"
				name="title"
				value={title ?? 'Untitled'}
				onChange={(e) => {
					setBlocking(true);
					setTitle(e.target.value);
				}}
				className="titleField"
			/>
			<Prompt
				when={blocking}
				message={(location) =>
					`内容发生改变，是否不保存，立刻前往<${location.pathname}>?`
				}
			/>
			<div className="editorCon">
				<div className="iconCon">
					<img src={Save} alt="save" onClick={saveAll} />
					<img src={Download} alt="download" onClick={downloadToLocal} />
					<img
						src={Home}
						alt="home"
						onClick={() => history.push('/control-panel')}
					/>
					<img src={Upload} alt="upload-figure" onClick={uploadFigure} />
					<img src={Theme} alt="theme" onClick={uploadThemePicture} />
				</div>
				<textarea
					ref={editablePart}
					className="half editorPart"
					onChange={(e) => {
						setBlocking(true);
						setContent(e.target.value);
					}}
					value={content ?? ''}
				></textarea>
				<div className="half showPart" ref={showPart}></div>
			</div>
		</div>
	);
}
