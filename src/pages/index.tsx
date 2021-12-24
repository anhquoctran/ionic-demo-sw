import React from "react";

import { Container, TodoRoot } from "components";

const Home: React.FC = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* <AppHeader/> */}
      <Container style={{ paddingTop: '20px' }}>
        <TodoRoot />
      </Container>
    </div>
  );
};

export default Home;
