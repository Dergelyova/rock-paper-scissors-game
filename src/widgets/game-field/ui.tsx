import styled from '@emotion/styled';
import { useStore } from 'effector-react';
import { ChooseElement, chooseElementModel } from 'features/choose-element';
import { ElementView } from 'entities/element';
import { playerModel } from 'entities/player';
import { ElementType } from 'shared/api';
import { Button } from 'shared/ui/button.style';
import { $gameStatus, $roundResult, gameStarted } from './model';

const ResultViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const RoundResultDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
  align-items: center;
`;
interface IGameFieldProps {
  sendChoice: (el: ElementType) => void;
}

export const GameField = ({ sendChoice }: IGameFieldProps) => {
  const gameStatus = useStore($gameStatus);
  const roundResult = useStore($roundResult);
  const currentPlayer = useStore(playerModel.$currentPlayer);
  const opponentPlayer = useStore(playerModel.$opponentPlayer);

  const handleElementChoice = (element: ElementType) => {
    sendChoice(element);
    chooseElementModel.newElementChoosed(element);
  };

  const gameResultTextOptions = {
    win: 'You win this round',
    loss: 'You lost this round',
    tie: 'Draw'
  };

  if (gameStatus === 'waiting for opponent') return <h4>Please, wait for opponent to join the game</h4>;
  if (gameStatus === 'game started') return <ChooseElement handleElementChoice={handleElementChoice} />;
  return (
    <ResultViewContainer>
      <RoundResultDiv>
        {currentPlayer.currentRoundChoice && opponentPlayer.currentRoundChoice ? (
          <>
            {' '}
            <ElementView elementType={currentPlayer.currentRoundChoice} />
            <p>{roundResult && gameResultTextOptions[roundResult]}</p>
            <ElementView elementType={opponentPlayer.currentRoundChoice} />
          </>
        ) : (
          <p>Waiting for result</p>
        )}
      </RoundResultDiv>
      <Button type="button" onClick={() => gameStarted()}>
        Start new Round
      </Button>
    </ResultViewContainer>
  );
};
