import React, { useState } from 'react';
import { Input, Tooltip, Button, message } from 'antd';
import { connect } from 'react-redux';
import { addTodo } from 'redux/actions';
import { PlusOutlined } from '@ant-design/icons';
import { AddTodoProps } from 'common/types';

const { Group: InputGroup } = Input;

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
  const [title, setTitle] = useState<string>('');
  const add = () => {
    if (title) {
      addTodo(title);
      setTitle('');
      message.success('Task item was created!');
    }
  };
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      add();
    }
  };

  return (
    <InputGroup compact>
      <Input
        style={{ width: '24rem' }}
        placeholder='Enter name of your task'
        onChange={handleOnChange}
        onInput={handleOnChange}
        onKeyUp={onKeyUp}
        allowClear
        value={title}
      />
      <Tooltip title="Submit">
        <Button type='primary' onClick={() => add()} icon={<PlusOutlined />}>
          Add
        </Button>
      </Tooltip>
    </InputGroup>
  )
};

export default connect(null, {
  addTodo
})(AddTodo);