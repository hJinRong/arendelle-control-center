/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import marked from 'marked';
import { useRef } from 'react';
import Nav from '../../components/Nav/Nav';

const editorCon = css`
	position: absolute;
	display: block;
	width: 100%;
	height: 100%;
	background-color: red;
	float: left;
`;

const half = css`
	display: block;
	position: relative;
	height: 100%;
	width: 50%;
	background-color: purple;
	float: left;
`;

export default function Editor() {
	const editablePart = useRef<HTMLTextAreaElement>(null);
	const showPart = useRef<HTMLDivElement>(null);

	const editing = () => {
		if (showPart.current !== null && editablePart.current !== null) {
			showPart.current.innerHTML = marked(editablePart.current.value);
		}
	};

	return (
		<div>
			<Nav />
			<div
				css={css`
					${editorCon}
				`}
			>
				<textarea
					id="textarea"
					ref={editablePart}
					css={css`
						${half}
						padding: 50px;
						resize: none;
					`}
					onChange={editing}
				></textarea>
				<div
					css={css`
						${half}
						background-color: pink;
						padding: 50px;
					`}
					ref={showPart}
				></div>
			</div>
		</div>
	);
}
