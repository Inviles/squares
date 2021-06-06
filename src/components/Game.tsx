import React, { useCallback, useState } from 'react';

import { Field, StartScreen } from 'src/components';

const Game: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStartGame = useCallback(() => setIsPlaying(true), []);

  return isPlaying
    ? <Field />
    : <StartScreen onStartGame={handleStartGame} />;
};

export { Game };
