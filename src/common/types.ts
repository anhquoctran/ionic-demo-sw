import { addTodo, changeState, filterTodo, paginate, removeTodo } from "../redux/actions";

export interface FilterCriteria {
  keyword?: string;
  date_from?: Date;
  date_to?: Date;
  type?: TodoState;
}

export interface Pagination {
  page?: number;
  pageSize?: number;
}

export interface GlobalTodoList {
  list: TodoList;
  map: TodoMap;
  filtered: boolean;
  filters: FilterCriteria;
}

export interface TodoItem {
  taskName: string;
  date: Date;
  state: TodoState;
  isDeleted?: boolean;
}

export enum TodoState {
  NotCompleted = 1,
  Completed = 2
}

export type TodoList = (TodoItem & { id: string; })[];

export type TodoMap = {
  [id: string]: TodoItem;
};

export interface AddTodoItemPayload {
  id: string;
  itemData: TodoItem;
}

export interface ChangeStateTodoItemPayload {
  id: string;
  state: TodoState;
}

export interface QueryFilterTodoPayload {
  keyword?: string;
  type?: TodoState;
  date?: { from: Date; to: Date; }
}

export type Predicate<T> = (item: T, index?: number) => boolean;

export interface TodoListProps {
  data?: TodoList;
  isFiltered?: boolean;
  filter?: typeof filterTodo;
  pagination?: Pagination;
  totalItems?: number;
  paginate?: typeof paginate;
}

export interface TodoItemProps {
  item: TodoItem & { id: string };
  changeState?: typeof changeState;
  removeTodo?: typeof removeTodo;
}

export interface SearchBoxProps extends FilterCriteria {
  search?: typeof filterTodo;
}

export interface AddTodoProps {
  addTodo?: typeof addTodo;
}

export interface ListFooterProps {
  total: number;
  completed: number;
  totalFiltered: number;
  isFiltered: boolean;
  clearSearch: () => void;
  pagination: Pagination;
  paginate?: typeof paginate;
}

export type SearchQuery = { keyword?: string, dateStart?: Date, dateEnd?: Date, type?: TodoState };
export type OnSearchFunction = (query: SearchQuery) => void;