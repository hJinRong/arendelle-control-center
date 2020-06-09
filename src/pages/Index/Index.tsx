/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import codeImg from './code.jpg';
import { useState, useRef, useEffect } from 'react';
import Nav from '../../components/Nav/Nav';

const Tipspan = styled.div`
	position: relative;
	color: #fff;
	font-size: 16px;
	line-height: 16px;
	width: fit-content;
	top: 100px;
	left: 120px;
	margin-top: 15px;
	margin-bottom: 15px;
	user-select: none;
`;

const inputStyle = css`
	position: relative;
	top: 100px;
	left: 120px;
	color: #fff;
	background-color: transparent;
	outline: none;
	user-select: none;
	&::placeholder {
		color: #fff;
	}
`;

const InputableSymbol = () => (
	<span
		css={css`
			color: white;
			padding-right: 10px;
			position: relative;
			top: 100px;
			left: 120px;
			user-select: none;
		`}
	>
		>
	</span>
);

export default function Index() {
	const [join, setJoin] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPwd, setConfirmPwd] = useState('');

	const intoTheUnknown = useRef<HTMLDivElement>(null);

	const scrollHandler = function () {
		if (intoTheUnknown.current !== null) {
			if (window.pageYOffset > intoTheUnknown.current.offsetTop - 10) {
				intoTheUnknown.current.classList.add('current');
			} else {
				intoTheUnknown.current.classList.remove('current');
			}
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', scrollHandler, false);
		return function () {
			window.removeEventListener('scroll', scrollHandler, false);
		};
	}, []);

	return (
		<div>
			<Nav />
			<section
				css={css`
					float: left;
				`}
			>
				<div
					css={{
						position: 'relative',
						width: '100%',
						height: '100%',
						overflow: 'hidden',
					}}
				>
					<img
						css={{
							position: 'relative',
							width: '100%',
							height: '100%',
						}}
						src={codeImg}
						alt="攝影師：Lukas，連結：Pexels"
					/>
					<div
						css={{
							position: 'absolute',
							bottom: '5%',
							right: 0,
							width: '70%',
							height: '70%',
							display: 'table',
							padding: 60,
						}}
					>
						<div
							css={{
								display: 'table-cell',
								width: '100%',
								height: '100%',
								textAlign: 'left',
								verticalAlign: 'middle',
								fontSize: '210%',
								padding: '5%',
							}}
						>
							Arendelle, witness the wisdom with you.
						</div>
					</div>
				</div>
			</section>

			<div
				css={css`
					float: left;
					width: 100%;
					height: 718px;
					background-color: #fff;
					transition: background-color 1000ms ease-in-out 50ms;
					position: relative;
					&.current {
						background-color: #282c34;
					}
				`}
				ref={intoTheUnknown}
			>
				<Tipspan>
					Have you had your adventure and need something new?
					<br />
					Are you afraid of what you are risking if you follow me? ([Y]es/[N]o):
				</Tipspan>
				<InputableSymbol />
				<input
					css={css`
						${inputStyle}
					`}
					type="text"
					name="join"
					id="join"
					value={join}
					onChange={(e) => setJoin(e.target.value)}
				/>
				{(join.toLowerCase() === 'y' || join.toLowerCase() === 'yes') && (
					<div>
						<Tipspan>Wow! What's your name?</Tipspan>
						<InputableSymbol />
						<input
							type="text"
							name="name"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							css={css`
								${inputStyle}
							`}
						/>
					</div>
				)}
				{name !== '' && (
					<div>
						<Tipspan>Okay! {name}, you should set a password.</Tipspan>
						<InputableSymbol />
						<input
							type="password"
							name="pwd"
							id="pwd"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							css={css`
								${inputStyle}
							`}
						/>
					</div>
				)}
				{password !== '' && (
					<div>
						<Tipspan>
							Confirm the password again, it must be same as the above what you
							input.
						</Tipspan>
						<InputableSymbol />
						<input
							type="password"
							name="confirmPwd"
							id="confirmPwd"
							css={css`
								${inputStyle}
							`}
							value={confirmPwd}
							onChange={(e) => setConfirmPwd(e.target.value)}
						/>
					</div>
				)}
				{name !== '' && password !== '' && confirmPwd === password && (
					<div
						css={css`
							width: fit-content;
							color: white;
							border: dashed 1px white;
							background-color: transparent;
							position: relative;
							left: 120px;
							top: 100px;
							padding: 15px 25px;
							margin: 15px 0;
						`}
					>
						I am ready!
					</div>
				)}
			</div>
		</div>
	);
}
