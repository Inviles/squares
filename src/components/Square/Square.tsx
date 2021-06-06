/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback } from 'react';
import classNames from 'classnames/bind';

import { Square as SquareType } from 'src/Squares';
import classes from './Square.module.scss';

export type OnSelectSquare = (rowIndex: number, columnIndex: number) => void;

interface Props {
  player: SquareType;
  rowIndex: number;
  columnIndex: number;
  onSelectSquare: OnSelectSquare;
}

const Square: React.FC<Props> = ({
  player, rowIndex, columnIndex, onSelectSquare,
}) => {
  const cx = classNames.bind(classes);

  const handleSelectSquare = useCallback(() => {
    onSelectSquare(rowIndex, columnIndex);
  }, [rowIndex, columnIndex, onSelectSquare]);

  const squareClasses = cx(
    'Square',
    {
      Square_player_first: player === 1,
      Square_player_second: player === 2,
    },
  );

  return (
    <div
      className={squareClasses}
      onClick={handleSelectSquare}
    />
  );
};

export { Square };
