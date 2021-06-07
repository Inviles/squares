import React, { useCallback, useState } from 'react';

import { Squares, Field } from 'src/Squares';
import { PlayingScreen, StartScreen, WinnerModal } from 'src/components';

const SquaresGame = new Squares();

const DEFAULT_MODAL_STATE = { isShown: false, winner: null };

const Game: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [field, setField] = useState<Field>();
  const [currentPlayer, setCurrentPlayer] = useState(SquaresGame.currentPlayer);
  const [statistics, setStatistics] = useState(SquaresGame.statistics);
  const [winnerModal, setWinnerModal] = useState(DEFAULT_MODAL_STATE);

  const handleShowModal = useCallback((winner) => setWinnerModal({ isShown: true, winner }), []);
  const handleCloseModal = useCallback(() => setWinnerModal(DEFAULT_MODAL_STATE), []);

  const handleStartGame = useCallback((fieldSize = 3) => {
    const gameField = SquaresGame.start(fieldSize);

    setIsPlaying(true);
    setCurrentPlayer(SquaresGame.currentPlayer);
    setField(gameField);
    setStatistics(SquaresGame.statistics);
  }, []);

  const handleFinishGame = useCallback(() => {
    const winner = SquaresGame.finish();

    handleShowModal(winner);
    setIsPlaying(false);
    setCurrentPlayer(SquaresGame.currentPlayer);
  }, [handleShowModal]);

  const makeMove = useCallback((rowIndex: number, columnIndex: number) => {
    const updatedField = SquaresGame.makeMove(rowIndex, columnIndex);
    const { remainingNumberOfMoves } = SquaresGame;

    setField(updatedField);
    setCurrentPlayer(SquaresGame.currentPlayer);
    setStatistics(SquaresGame.statistics);

    if (remainingNumberOfMoves === 0) {
      handleFinishGame();
    }
  }, [handleFinishGame]);

  return isPlaying && field
    ? (
      <PlayingScreen
        player={currentPlayer}
        field={field}
        makeMove={makeMove}
        onFinishGame={handleFinishGame}
        statistics={statistics}
      />
    )
    : (
      <>
        <StartScreen onStartGame={handleStartGame} />
        <WinnerModal
          show={winnerModal.isShown}
          onHide={handleCloseModal}
          winner={winnerModal.winner}
        />
      </>
    );
};

export { Game };
