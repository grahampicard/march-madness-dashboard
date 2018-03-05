import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const renderApp = Component =>  
  render(
		<BrowserRouter>
			<Component />
		</BrowserRouter>,
    document.getElementById("root")
  );

renderApp(App);
registerServiceWorker();
