import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
// сохронение записей в стор 
import { save } from 'redux-localstorage-simple';

// подключение в приложение  redux devtools 

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/* eslint-enable */

const configureStore = preloadedState => (
    // создание store 
    createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(
            // задаем пространство имен в локал сторедж
            // Middleware функция выполняющая промежуточные операци с данными в момент их обновление в сторе 
            applyMiddleware(save({ namespace: 'todo-list' }))
        ),
    )
);


const store = configureStore({});

export default store;