import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/font.css';
import "./css/global.css";
import App from './pages/layout';
import north from "../../../../webpack/north.config.js";
import { North } from '@zblock/north';

if (process.env.NODE_ENV === "production") {
  north.init({
    sentry: {
      integrations: [new North.BrowserTracing()],
    },
  });
}


ReactDOM.render(<App />, document.getElementById('root'));
