import styled from '@emotion/styled';
import { useStore } from 'effector-react';
import { GameView } from 'pages/game-page';
import { ChoosePlayerNameForm } from 'features/choose-player-name';
import { playerModel } from 'entities/player';

const Container = styled.div`
  background-color: white;
  border-radius: 20px;
  max-width: 800px;
  min-height: calc(100vh - 40px);
  margin: auto;
  margin-block: 20px;
  aligh-items: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  const currentUser = useStore(playerModel.$currentUser);

  return (
    <Container>{currentUser === '' ? <ChoosePlayerNameForm /> : <GameView currentUser={currentUser} />}</Container>
  );
};

export default App;
