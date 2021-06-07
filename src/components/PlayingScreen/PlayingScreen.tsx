/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';

import { Field, Player, Statistics } from 'src/Squares';
import { SquaresRow } from 'src/components';
import classes from './PlayingScreen.module.scss';

interface Props {
  player: Player;
  makeMove: (rowIndex: number, columnIndex: number) => void;
  field: Field;
  onFinishGame: () => void;
  statistics: Statistics;
}

const PlayingScreen: React.FC<Props> = ({
  player, makeMove, field, onFinishGame, statistics,
}) => {
  const cx = classNames.bind(classes);
  const firstPlayerWinningSquares = statistics[1];
  const secondPlayerWinningSquares = statistics[2];

  return (
    <Row className={cx('PlayingScreen', 'py-5')}>
      <Col className="d-flex flex-column align-items-center">
        <Row className="mb-3">
          <Col>
            <h4>{`Current player: ${player}`}</h4>
          </Col>
        </Row>

        <Row>
          <Col xs={12} className={cx('PlayingScreen__field')}>
            {field.map((squaresRow, rowIndex) => (
              <SquaresRow
                // It's okay to use index here as a key
                // because the amount of items will never change
                // eslint-disable-next-line react/no-array-index-key
                key={rowIndex}
                row={squaresRow}
                rowIndex={rowIndex}
                onSelectSquare={makeMove}
              />
            ))}
          </Col>
        </Row>

        <Row>
          <Col>
            <p className="mt-2 mb-0">
              <span className="font-weight-bold">First player: </span>
              {firstPlayerWinningSquares}
            </p>

            <p className="mb-0">
              <span className="font-weight-bold">Second player: </span>
              {secondPlayerWinningSquares}
            </p>
          </Col>
        </Row>

        <Button className="mt-3" onClick={onFinishGame}>Finish</Button>
      </Col>
    </Row>
  );
};

export { PlayingScreen };
