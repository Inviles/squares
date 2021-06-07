import React, { useCallback, useState } from 'react';
import {
  Button, Row, Col, FormControl,
} from 'react-bootstrap';

import SquareExample from './squares_example.png';

interface Props {
  onStartGame: (fieldSize: number) => void;
}

const StartScreen: React.FC<Props> = ({ onStartGame }) => {
  const [fieldSize, setFieldSize] = useState(3);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldSize(Number(event.target.value));
  }, []);

  const handleStartGame = useCallback(() => {
    onStartGame(fieldSize);
  }, [onStartGame, fieldSize]);

  return (
    <Row className="py-5">
      <Col>
        <Row className="mb-3">
          <Col className="text-center"><h1>Squares</h1></Col>
        </Row>

        <Row className="d-flex flex-column align-items-center">
          <Col xs={8}>

            <Row>
              <Col className="d-flex flex-column align-items-center mb-3">
                <img
                  width="500px"
                  height="486px"
                  src={SquareExample}
                  alt="Squares example"
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <p>
                  Squares is a simple two player game where a square shaped game board is split to N*N squares
                  (2&nbsp;&#8804;&nbsp;N&nbsp;&#8804;&nbsp;8).
                  <br />
                  Each player marks a square on their turn and at the end,
                  the player with the biggest directly connecting squares group wins.
                </p>
              </Col>
            </Row>

            <Row className="d-flex justify-content-center">
              <Col xs={12}>
                You can set the board size N*N squares (2&nbsp;&#8804;&nbsp;N&nbsp;&#8804;&nbsp;8):
              </Col>

              <Col xs={3}>
                <FormControl
                  type="number"
                  className="my-3"
                  value={fieldSize}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row>
              <Col className="d-flex justify-content-center">
                <Button onClick={handleStartGame} defaultValue={3}>
                  Start game
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export { StartScreen };
