import React from 'react';
import { Col, Layout, Row, Typography } from 'antd';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

const { Content } = Layout;
const { Title } = Typography;

const TodoRoot: React.FC = (props) => {

  return (
    <Content>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <AddTodo/>
        </Col>
        <Col span={24}>
          <TodoList/>
        </Col>
      </Row>
    </Content>
  );
};

export default TodoRoot;