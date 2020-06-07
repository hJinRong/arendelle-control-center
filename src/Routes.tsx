import App from './pages/App';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import EditorPage from './pages/EditorPage';
import LogInPage from './pages/LogInPage';

export default function Routes() {
	return (
		<App>
			<Switch>
				<Route path="/login" children={<LogInPage />} />
				<Route path="/editor" children={<EditorPage />} />
				<Route sensitive exact strict path="/" children={<IndexPage />} />
			</Switch>
		</App>
	);
}
