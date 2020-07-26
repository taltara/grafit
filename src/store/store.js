import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import menuReducer from './reducers/MenuReducer';
import grafReducer from './reducers/GrafReducer.js';

const rootReducer = combineReducers({
    menu: menuReducer,
    graf: grafReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)

