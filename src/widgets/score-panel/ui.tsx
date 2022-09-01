import styled from '@emotion/styled';
import { useStore } from 'effector-react';
import { PlayerCard, playerModel } from 'entities/player';
import { scoreModel, ScoreView } from 'entities/score';

const ScoreContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
`;

export const ScorePanel = () => {
  const currentPlayer = useStore(playerModel.$currentPlayer);
  const opponentPlayer = useStore(playerModel.$opponentPlayer);
  const score = useStore(scoreModel.$score);

  return (
    <ScoreContainer>
      <PlayerCard player={currentPlayer} /> <ScoreView score={score} />
      <PlayerCard player={opponentPlayer} />
    </ScoreContainer>
  );
};
