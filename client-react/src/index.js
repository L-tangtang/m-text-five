import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import './asstes/App.css';
import axios from './utils';
React.Component.prototype.http = axios;
ReactDOM.render(<App />, document.getElementById('root'));
