import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppRouter from './AppRouter'
import { BrowserRouter } from 'react-router-dom'

/*ReactDOM.render(<AddUser />, document.getElementById('root'));
registerServiceWorker();*/

ReactDOM.render(
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>,
    document.getElementById('root')
);

registerServiceWorker();