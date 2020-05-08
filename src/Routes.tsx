import App from './pages/App';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import EditorPage from './pages/EditorPage';

export default function Routes() {
	return (
		<App>
			<Switch>
				<Route sensitive exact strict path="/" children={<IndexPage />} />
				<Route path="/editor" children={<EditorPage />} />
			</Switch>
		</App>
	);
}
