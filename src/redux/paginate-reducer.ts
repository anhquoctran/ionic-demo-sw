import { PayloadAction } from "@reduxjs/toolkit";
import { Pagination } from "../common/types";
import { DATA_PAGINATE } from "./action-types";

const initialState: Pagination = {
  page: 1,
  pageSize: 20
};

function paginateReducers(state: Pagination = initialState, action: PayloadAction<Pagination>): Pagination {
  console.log('action', action);
  switch(action.type) {
    case DATA_PAGINATE:
      return action.payload;
    default:
      return state;
  }
}

export default paginateReducers;