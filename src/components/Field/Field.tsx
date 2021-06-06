/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

import { Field as FieldType } from 'src/Squares';
import { SquaresRow } from 'src/components';

interface Props {
  makeMove: (rowIndex: number, columnIndex: number) => void;
  field: FieldType;
  onFinishGame: () => void;
}

const Field: React.FC<Props> = ({ makeMove, field, onFinishGame }) => (
  <Row className="py-5">
    <Col className="d-flex flex-column align-items-center">
      <Row>
        <Col xs={12}>
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

        {/*
        <Col xs={5}>
          Current player: 1
        </Col> */}
      </Row>

      <Button className="mt-3" onClick={onFinishGame}>Finish</Button>
    </Col>
  </Row>
);

export { Field };
