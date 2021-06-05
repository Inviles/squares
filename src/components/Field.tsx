/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useState } from 'react';

import { Squares } from 'src/Squares';

const TMP_STYLE = {
  width: '100px', height: '100px', border: '2px solid grey', display: 'inline-block',
};

const SquaresGame = new Squares();

const Field: React.FC = () => {
  const [field, setField] = useState(SquaresGame.start);

  console.log(field);

  const selectSquare = useCallback((rowIndex, columnIndex) => {
    const updatedField = SquaresGame.makeMove(rowIndex, columnIndex);
    console.log('updatedField', updatedField);

    setField(updatedField);
  }, []);

  return (
    <>
      {field.map((row, rowIndex) => (
        <div>
          {row.map((column, columnIndex) => (
            <div
              style={TMP_STYLE}
              onClick={() => selectSquare(rowIndex, columnIndex)}
            >
              square:
              {' '}
              {column}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export { Field };
