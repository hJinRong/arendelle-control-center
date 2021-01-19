import { message } from 'antd';
import axios from 'axios';
import hljs from 'highlight.js';
import keyboardJS from 'keyboardjs';
import marked from 'marked';
import { useEffect, useRef, useState } from 'react';
import { Prompt, useHistory, useParams } from 'react-router-dom';
import { upload } from '../../components/FileUpload/FileUpload';
import './androidstudio.css';
import Download from './download.svg';
import './Editor.css';
import Home from './home.svg';
import Save from './save.svg';
import Theme from './theme.svg';
import Upload from './upload.svg';

interface New {
	new?: boolean;
}

export default function Editor() {
	const editablePart = useRef<HTMLTextAreaElement>(null);
	const mount = useRef<HTMLDivElement>(null);
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
			let obj = history.location.state as New;
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
		const succeed = (resp: any) => {
			message.success('图片上传成功');
			insertContent(
				`![figure](https://arendelle.tech/api/get-figure/${resp.data})\n`
			);
		};
		const failed = (err: any) => {
			message.error('图片上传失败');
		};
		upload(
			{
				mount: mount.current,
				key: 'figure',
				config: {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
				receiverUrl: 'https://arendelle.tech/api/upload-figure',
				succeed: succeed,
				failed: failed,
			}
		);
	};

	const uploadThemePicture = () => {
		upload({
			mount: mount.current,
			key: 'figure',
			receiverUrl: 'https://arendelle.tech/api/theme-picture',
			config: {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				params: {
					aid: aid,
				},
			},
			succeed: () => {
				message.success('图片上传成功');
			},
			failed: () => {
				message.success('图片上传失败');
			}
		});
	};

	return (
		<div>
			<div ref={mount} hidden></div>
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
