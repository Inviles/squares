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
        player={square}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        onSelectSquare={onSelectSquare}
      />
    ))}
  </div>
);

export { SquaresRow };
