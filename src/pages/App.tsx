import { ReactNode } from 'react';
import React from 'react';

type Props = {
	children: ReactNode;
};

export default function App(props: Props) {
	const { children } = props;

	return <>{children}</>;
}
