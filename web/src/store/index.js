import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

// configs
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
