import { createEvent, createStore, sample } from 'effector';
import { chooseElementModel } from 'features/choose-element';
import { playerModel } from 'entities/player';
import { scoreModel } from 'entities/score';
import { RoundResultType, IResultResponse } from 'shared/api';

type GameStatusType = 'waiting for opponent' | 'game started' | 'game finished';

export const defineRoundResult = (currentUser: string, roundResult: IResultResponse): RoundResultType => {
  const { results } = roundResult;
  const currentPlayerChoice = results.find(({ username }) => username === currentUser)?.choice;
  const opponentChoice = results.find(({ username }) => username !== currentUser)?.choice;
  if (currentPlayerChoice === opponentChoice) return 'tie';
  if (
    (currentPlayerChoice === 'paper' && opponentChoice === 'rock') ||
    (currentPlayerChoice === 'rock' && opponentChoice === 'scissors') ||
    (currentPlayerChoice === 'scissors' && opponentChoice === 'paper')
  )
    return 'win';
  return 'loss';
};

export const gameStarted = createEvent();
export const gameFinished = createEvent<IResultResponse>();
export const gameStopped = createEvent();

export const $gameStatus = createStore<GameStatusType>('waiting for opponent')
  .on(gameStarted, () => 'game started')
  .on(gameFinished, () => 'game finished')
  .reset(gameStopped);

export const roundResultDefined = createEvent<RoundResultType>();

export const $roundResult = createStore<RoundResultType | null>(null)
  .on(roundResultDefined, (_, value) => value)
  .reset(gameStarted, gameStopped);

sample({
  clock: playerModel.opponentConnected,
  target: gameStarted
});

sample({
  clock: playerModel.opponentDisonnected,
  target: [gameStopped, scoreModel.scoreReset, chooseElementModel.choosedElementReset]
});

sample({
  clock: gameStarted,
  target: [playerModel.newRoundStarted]
});

sample({
  clock: gameFinished,
  source: playerModel.$currentUser,
  fn: defineRoundResult,
  target: [roundResultDefined, scoreModel.scoreChanged]
});

sample({
  clock: gameFinished,
  target: [playerModel.playersChoiceDefined, chooseElementModel.choosedElementReset]
});
