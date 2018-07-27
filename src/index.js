import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import BookLib from './BookLib'
import SearchUsers from './SearchUser';
import AddUser from './AddUser'


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

ReactDOM.render(<BookLib />, document.getElementById('root'));
registerServiceWorker();

ReactDOM.render(<SearchUsers />, document.getElementById('root'));
registerServiceWorker();

ReactDOM.render(<AddUser />, document.getElementById('root'));
registerServiceWorker();