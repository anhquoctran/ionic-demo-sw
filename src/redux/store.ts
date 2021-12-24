import { createStore, applyMiddleware } from "redux";
import { useDispatch } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger';
import rootReducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

const logger = createLogger({
  level: 'info',
  diff: true
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
