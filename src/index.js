import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './ToDo/App';
import registerServiceWorker from './registerServiceWorker';
import store from './ToDo/store'
import { Provider } from 'react-redux';

// redux содержит глобальный state приложения 
// что бы пробросить в кадый компонент с помощью Provider мы оборачиваем все приложение 


ReactDOM.render((
    
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'));
registerServiceWorker();