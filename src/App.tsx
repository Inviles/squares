import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { Game } from 'src/components';

const App: React.FC = () => (
  <div className="App">
    <Container>
      <Row>
        <Col>
          <Game />
        </Col>
      </Row>
    </Container>
  </div>
);

export default App;
