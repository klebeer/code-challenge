import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import fileDataReducer from './reducers/fileDataReducer';

const store = createStore(fileDataReducer, applyMiddleware(thunk));

export default store;
