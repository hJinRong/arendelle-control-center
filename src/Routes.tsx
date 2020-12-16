import App from './pages/App';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import ControlPanelPage from './pages/ControlPanelPage';

const AsyncEditorPage = () => {
	const EditorPage = React.lazy(() => import('./pages/EditorPage'));
	return (
		<Suspense fallback={<div>loading</div>}>
			<EditorPage />
		</Suspense>
	);
};

export default function Routes() {
	return (
		<App>
			<Switch>
				<Route path="/login" children={<LogInPage />} />
				<Route path="/editor/:aid" children={<AsyncEditorPage />} />
				<Route path="/control-panel" children={<ControlPanelPage />} />
				<Route sensitive exact strict path="/" children={<LogInPage />} />
			</Switch>
		</App>
	);
}
