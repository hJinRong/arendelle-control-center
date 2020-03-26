/** @jsx jsx */
import { jsx,css } from "@emotion/core";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p
          css={css`
            background-color: hotpink;
            &:hover {
              color: darkgreen;
            }
          `}
        >
          The red font...
        </p>
      </header>
    </div>
  );
}

export default App;
