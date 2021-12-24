import { ADD_TODO, CHANGE_STATE, DATA_PAGINATE, FILTER_STATE, REMOVE_TODO } from './action-types';
import { nanoid } from 'nanoid';
import { PayloadAction } from '@reduxjs/toolkit';
import { AddTodoItemPayload, TodoState, ChangeStateTodoItemPayload, FilterCriteria, QueryFilterTodoPayload, Pagination } from '../common/types';

export function addTodo(content: string): PayloadAction<AddTodoItemPayload> {
  return {
    type: ADD_TODO,
    payload: {
      id: nanoid(),
      itemData: {
        taskName: content.trim(),
        date: new Date(),
        state: TodoState.NotCompleted
      }
    }
  };
}

export function changeState(id: string, state: TodoState): PayloadAction<ChangeStateTodoItemPayload> {
  return {
    type: CHANGE_STATE,
    payload: {
      id, state
    }
  };
}

export function filterTodo(query: FilterCriteria): PayloadAction<QueryFilterTodoPayload> {
  console.log('query', query)
  return {
    type: FILTER_STATE,
    payload: query
  };
}

export function paginate(paginateData: Pagination): PayloadAction<Pagination> {
  return {
    type: DATA_PAGINATE,
    payload: paginateData
  }
}

export function removeTodo(id: string): PayloadAction<string> {
  return {
    type: REMOVE_TODO,
    payload: id
  };
}