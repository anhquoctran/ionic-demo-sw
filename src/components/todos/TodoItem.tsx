import React, { FC } from 'react';
import { List, Typography, Button, Checkbox, message, Space } from 'antd';
import { DeleteOutlined, ClockCircleTwoTone, CalendarTwoTone, UndoOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { TodoItem, TodoItemProps, TodoState } from 'common/types';
import { removeTodo, changeState } from 'redux/actions';

const { Text } = Typography;

const getItemClassName = (item: TodoItem & { id: string }) => {
  if (item.isDeleted) {
    return 'removed';
  } else {
    return item.state === TodoState.Completed ? 'completed' : undefined;
  }
};

const TodoItemView: FC<TodoItemProps> = (props) => {
  const { item, changeState, removeTodo } = props;
  
  const onClickDelete = (itemId: string) => {
    removeTodo(itemId);
    message.success('Task item was removed!');
  };

  const onChangeState = (id: string, name: string, changed: boolean) => {
    changeState(id, changed ? TodoState.Completed : TodoState.NotCompleted);
    message.success(`State of task '${name}' was changed!`)
  };

  return (
    <List.Item
      key={item.id}
      className={getItemClassName(item)}
      actions={[
        <Button
          disabled={item.isDeleted}
          icon={<DeleteOutlined />}
          onClick={() => onClickDelete(item.id)}
          danger
          type='primary'>
          {item.isDeleted ? 'Removed' : 'Remove'}
        </Button>
      ]}>
      <List.Item.Meta
        title={<Text delete={Boolean(item.state === TodoState.Completed)} >{item.taskName}</Text>}
        description={
          <Space>
            <Text type='secondary'><CalendarTwoTone /> {dayjs(item.date).format('YYYY/MM/DD')}</Text>
            <Text type='secondary'><ClockCircleTwoTone /> {dayjs(item.date).format('HH:mm')}</Text>
          </Space>
        }
        avatar={<Checkbox disabled={item.isDeleted} onChange={(event) => { onChangeState(item.id, item.taskName, event.target.checked) }} />}
      />
    </List.Item>
  );
};

export default connect(null, {
  changeState,
  removeTodo
})(TodoItemView);