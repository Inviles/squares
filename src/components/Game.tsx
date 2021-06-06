import React, { useCallback, useState } from 'react';

import { Squares, Field as FieldType } from 'src/Squares';
import { Field, StartScreen } from 'src/components';

const SquaresGame = new Squares();

const Game: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [field, setField] = useState<FieldType>();

  const handleStartGame = useCallback(() => {
    const gameField = SquaresGame.start();

    setIsPlaying(true);
    setField(gameField);
  }, []);

  const handleFinishGame = useCallback(() => {
    const winner = SquaresGame.finish();

    console.log('winner', winner);

    setIsPlaying(false);
  }, []);

  const makeMove = useCallback((rowIndex: number, columnIndex: number) => {
    const updatedField = SquaresGame.makeMove(rowIndex, columnIndex);
    const { remainingNumberOfMoves } = SquaresGame;

    setField(updatedField);

    if (remainingNumberOfMoves === 0) {
      handleFinishGame();
    }
  }, [handleFinishGame]);

  return isPlaying && field
    ? (
      <Field
        field={field}
        makeMove={makeMove}
        onFinishGame={handleFinishGame}
      />
    )
    : <StartScreen onStartGame={handleStartGame} />;
};

export { Game };
