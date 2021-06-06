import React from 'react';

import { Row } from 'src/Squares';
import { Square, OnSelectSquare } from 'src/components/Square/Square';

interface Props {
  row: Row;
  rowIndex: number;
  onSelectSquare: OnSelectSquare;
}

const SquaresRow: React.FC<Props> = ({ row, rowIndex, onSelectSquare }) => (
  <div>
    {row.map((square, columnIndex) => (
      <Square
        // It's okay to use index here as a key
        // because the amount of items will never change
        // eslint-disable-next-line react/no-array-index-key
        key={rowIndex + columnIndex}
        player={square}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        onSelectSquare={onSelectSquare}
      />
    ))}
  </div>
);

export { SquaresRow };
