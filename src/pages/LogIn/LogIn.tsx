/** @jsx jsx */
import { jsx } from '@emotion/core';
import './LogIn.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function LogIn() {
	const history = useHistory();
	const [account, setAccount] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		document.title = 'Log in';
	});

	useEffect(() => {
		if (localStorage.getItem('token') !== null) {
			history.push('/control-panel');
		}
	});

	const login = (e: any) => {
		e.preventDefault();
		e.target.blur();
		axios
			.post(
				'http://localhost:8080/api/auth',
				{},
				{
					params: {
						account: account.trim(),
						password: password.trim(),
					},
				}
			)
			.then(function (response) {
				let token = response.data.token;
				localStorage.setItem('token', token);
				history.replace('/control-panel');
			});
	};

	return (
		<div css={{ position: 'relative', height: '100%' }}>
			<div className={`login-con`}>
				<div className={`greeting`}></div>
				<div className={`login-form`}>
					<form action="http://localhost:8080/auth" method="post">
						<input
							type="text"
							name="account"
							placeholder="Account"
							onChange={(e) => setAccount(e.target.value)}
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button type="submit" onClick={(e) => login(e)}>
							Log in
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
