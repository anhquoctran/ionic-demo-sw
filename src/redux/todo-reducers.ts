import { PayloadAction } from '@reduxjs/toolkit';
import { GlobalTodoList, AddTodoItemPayload, TodoItem, TodoState, ChangeStateTodoItemPayload, FilterCriteria, Predicate } from '../common/types';
import {
  ADD_TODO,
  CHANGE_STATE,
  FILTER_STATE,
  REMOVE_TODO
} from './action-types';

const initialState: GlobalTodoList = {
  list: [],
  map: {},
  filtered: false,
  filters: {
    date_from: null,
    date_to: null,
    keyword: null,
    type: null
  }
};

function todoReducers(state: GlobalTodoList = initialState, action: PayloadAction<any>): GlobalTodoList {
  console.log('todo reducer', action);
  switch (action.type) {
    case ADD_TODO:
      const itemAdd = action.payload as AddTodoItemPayload;
      if (itemAdd.itemData.taskName) {
        const itemData: TodoItem = {
          ...itemAdd.itemData,
          date: new Date(),
          state: TodoState.NotCompleted,
          isDeleted: false
        };
        state.list.push({
          id: itemAdd.id,
          ...itemAdd.itemData
        });
        return {
          filtered: state.filtered,
          filters: state.filters,
          map: {
            ...state.map,
            [itemAdd.id]: itemData
          },
          list: state.list
        };
      } else {
        return state;
      }
    case CHANGE_STATE:
      const { id, state: newState } = action.payload as ChangeStateTodoItemPayload;
      const item = state.map[id];
      if (item) {
        item.date = new Date();
        item.state = newState;
        state.list = findAllAndReplace(state.list, { state: newState }, x => x.id === id)
        state.map[id] = item;
      }
      return Object.assign({}, state);
    case REMOVE_TODO:
      const itemId = action.payload as string;
      const deleteItem = state.map[itemId];
      if (deleteItem) {
        deleteItem.isDeleted = true;
        state.map[itemId] = deleteItem;
        state.list = findAllAndReplace(state.list, deleteItem, (x => x.id === itemId));
      }
      return {
        ...state
      };
    case FILTER_STATE:
      console.log('filter state', {
        action
      })
      let { keyword, date_from, date_to, type } = action.payload as FilterCriteria;
      let hasFiltered = false;

      keyword = keyword?.trim()?.toLowerCase();
      if (keyword) {
        
        hasFiltered = true;
        state.filters.keyword = keyword;
      }

      if (typeof type === 'number') {
        state.filters.type = type;
        hasFiltered = true;
      }

      if (date_from && date_to) {
        hasFiltered = true;
        state.filters.date_from = date_from;
        state.filters.date_to = date_to;
      }

      state.filtered = hasFiltered;

      return {
        ...state
      };
    default:
      return state;
  }
}

function findAllAndReplace<T>(array: T[], replacement: Partial<T>, predicate: Predicate<T>) {
  return array?.map(ele => predicate(ele) ? { ...ele, ...replacement } : ele) ?? [];
}

export default todoReducers;