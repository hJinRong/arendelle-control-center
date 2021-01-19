import axios from 'axios';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './FileUpload.css';

interface FileUploadProps {
	mount: Element | null;
	key: string;
  receiverUrl: string;
  config: { headers?: { [key: string]: string }, params?: { [key: string]: string } };
	succeed?: (resp: any) => void;
	failed?: (err: any) => void;
}

export default function FileUpload(props: FileUploadProps) {
	const self = useRef<HTMLInputElement>(null);

	useEffect(() => {
    (document.querySelector('input.upload') as HTMLInputElement).click();
	}, []);

	const send = () => {
		const input = self.current;
		if (input?.files) {
			let data = new FormData();
			data.append(props.key, input.files[0]);

			axios
				.post(props.receiverUrl, data, props.config)
				.then((response) => {
					if (props.succeed) props.succeed(response);
				})
				.catch((error) => {
					if (props.failed) props.failed(error);
				})
				.finally(() => {
          ReactDOM.unmountComponentAtNode(props.mount as Element);
        });
		}
	};

	return (
		<>
			<input className="upload" onChange={send} ref={self} type="file" />
		</>
	);
}

export const upload = (props: FileUploadProps) => {
  ReactDOM.render(<FileUpload {...props} />, props.mount);
};
