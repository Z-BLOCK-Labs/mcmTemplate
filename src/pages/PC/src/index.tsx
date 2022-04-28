import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/font.css';
import './css/global.css';
import 'antd/dist/antd.css';
import App from './pages/layout';
import north from '../../../../config/north.config.js';
import { North } from '@zblock/north';

north.init({
    sentry: {
        integrations: [new North.BrowserTracing()],
    },
});

ReactDOM.render(<App />, document.getElementById('root'));
