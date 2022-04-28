import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './pages/layout';
// import { renderRoutes } from 'react-router-config';
// import routes from './routeConfig ';
import './index.css';
import './font.css';
import north from '@/../config/north.config.js';

import { North } from '@zblock/north';
north.init({
    sentry: {
        integrations: [new North.BrowserTracing()],
    },
});
ReactDOM.render(<Layout></Layout>, document.getElementById('root'));
