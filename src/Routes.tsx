import App from './pages/App';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EditorPage from './pages/EditorPage';
import LogInPage from './pages/LogInPage';
import ControlPanelPage from './pages/ControlPanelPage';

export default function Routes() {
	return (
		<App>
			<Switch>
				<Route path="/login" children={<LogInPage />} />
				<Route path="/editor/:aid" children={<EditorPage />} />
				<Route path="/control-panel" children={<ControlPanelPage />} />
				<Route sensitive exact strict path="/" children={<LogInPage />} />
			</Switch>
		</App>
	);
}
