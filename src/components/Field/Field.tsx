/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';

import { Squares } from 'src/Squares';
import { SquaresRow } from 'src/components/SquaresRow';

const SquaresGame = new Squares();

const Field: React.FC = () => {
  const [field, setField] = useState(SquaresGame.start);

  const handleSelectSquare = useCallback((rowIndex: number, columnIndex: number) => {
    const updatedField = SquaresGame.makeMove(rowIndex, columnIndex);

    setField(updatedField);
  }, []);

  const finishGame = useCallback(() => {
    const winner = SquaresGame.finish();

    console.log('winner', winner);
  }, []);

  return (
    <div>
      {field.map((squaresRow, rowIndex) => (
        <SquaresRow
          row={squaresRow}
          rowIndex={rowIndex}
          onSelectSquare={handleSelectSquare}
        />
      ))}

      <Button variant="primary" onClick={finishGame}>Finish</Button>
    </div>
  );
};

export { Field };
