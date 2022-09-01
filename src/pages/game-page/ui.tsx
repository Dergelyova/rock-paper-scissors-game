import { GameField } from 'widgets/game-field';
import { ScorePanel } from 'widgets/score-panel';

import { useSocket } from './model';

type GameViewProps = {
  currentUser: string;
};

export const GameView = ({ currentUser }: GameViewProps) => {
  const sendChoice = useSocket(currentUser);

  return (
    <>
      <ScorePanel />
      <GameField sendChoice={sendChoice} />
    </>
  );
};
