import { combineReducers } from "redux";

import todoReducers from "./todo-reducers";
import paginateReducers from "./paginate-reducer";

const rootReducer = combineReducers({ todos: todoReducers, paginate: paginateReducers });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
