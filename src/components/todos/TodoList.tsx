import { List } from 'antd';
import { SearchQuery, TodoList, TodoListProps, TodoState } from 'common/types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { filterTodo, paginate } from 'redux/actions';
import { RootState } from 'redux/reducers';
import { queryFilterList } from 'redux/selectors';
import SearchBox from './SearchBox';
import TodoItemView from './TodoItem';
import ListFooter from './TodoListFooter';

const TodoListView: React.FC<TodoListProps> = ({ data }) => {
  const [list, setList] = useState<TodoList>(data);

  useEffect(() => {
    setList(data);
  }, [data]);

  return (
    <List
      bordered
      dataSource={data}
      header={<SearchBox />}
      footer={
        <ListFooter
          totalFiltered={list.length}
        />}
      renderItem={(item) => <TodoItemView item={item} />} />
  )
};

export default connect((s: RootState) => ({
  data: queryFilterList(s.todos.list, s.todos.filters, s.todos.filtered, s.paginate)
}), null)(TodoListView);