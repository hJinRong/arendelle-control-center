import './LogIn.css';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import React from 'react';

export default function LogIn() {
	const history = useHistory();
	const [account, setAccount] = useState<string | null>(null);
	const [password, setPassword] = useState<string | null>(null);
	const disabled = useMemo(() => {
		if (
			account === null ||
			password === null ||
			account.trim().length === 0 ||
			account.indexOf(' ') !== -1 ||
			password.trim().length === 0 ||
			password.indexOf(' ') !== -1
		) {
			return true;
		}
		return false;
	}, [account, password]);

	useEffect(() => {
		document.title = 'Log In';
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
				'https://arendelle.tech/api/auth',
				{},
				{
					params: {
						account: account,
						password: password,
					},
				}
			)
			.then((response) => {
				let token = response.data.token;
				localStorage.setItem('token', token);
				history.replace('/control-panel');
			});
	};

	return (
			<div className={`login-con`}>
				<div className={`greeting`}></div>
				<div className={`login-form`}>
					<form action="https://arendelle.tech/auth" method="post">
						<input
							type="text"
							name="account"
							placeholder="Account"
							autoComplete="on"
							onChange={(e) => setAccount(e.target.value)}
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							autoComplete="current-password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							title={
								disabled
									? 'Blank option or contains invalid characters '
									: 'Okay'
							}
							disabled={disabled}
							type="submit"
							onClick={(e) => login(e)}
						>
							Log in
						</button>
					</form>
				</div>
			</div>
	);
}
