import React from "react";
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography

export const AppHeader: React.FC = () => {
  return (
    <Header >
      <Title>To-Do App</Title>
    </Header>
  );
};
