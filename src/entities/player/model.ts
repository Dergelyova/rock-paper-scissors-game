import { createEvent, createDomain, createStore } from 'effector';
import { ElementType, IResultResponse } from 'shared/api';
import { loadFromStorage, saveToStorage } from './lib';

// current user store
const userDomain = createDomain();
loadFromStorage(userDomain, localStorage);
saveToStorage(userDomain, localStorage);

export const nameChanged = createEvent<string>();
export const $currentUser = userDomain.createStore<string>('').on(nameChanged, (_, newName) => newName);

// PLayer store
export interface IPlayer {
  name: string;
  status: 'in game' | 'not in game' | 'made choice';
  currentRoundChoice: ElementType | null;
}

export const opponentConnected = createEvent<{ username: string }>();
export const opponentDisonnected = createEvent();
export const opponentMadeChoice = createEvent();
export const newRoundStarted = createEvent();
export const playersChoiceDefined = createEvent<IResultResponse>();

export const $opponentPlayer = createStore<IPlayer>({
  name: 'Player 2',
  status: 'not in game',
  currentRoundChoice: null
})
  .on(opponentConnected, (state, value) => ({ ...state, name: value.username, status: 'in game' }))
  .on(opponentMadeChoice, (state) => ({ ...state, status: 'made choice' }))
  .on(newRoundStarted, (state) => ({ ...state, currentRoundChoice: null }))
  .on(playersChoiceDefined, (state, { results }) => ({
    ...state,
    status: 'in game',
    currentRoundChoice: results.filter(({ username }) => username === state.name)[0].choice
  }))
  .reset(opponentDisonnected);

export const currentPlayerMadeChoice = createEvent();
export const $currentPlayer = $currentUser.map<IPlayer>((userName) => ({
  name: userName,
  status: 'in game',
  currentRoundChoice: null
}));

$currentPlayer
  .on(currentPlayerMadeChoice, (state) => ({ ...state, status: 'made choice' }))
  .on(newRoundStarted, (state) => ({ ...state, currentRoundChoice: null }))
  .on(playersChoiceDefined, (state, { results }) => ({
    ...state,
    status: 'in game',
    currentRoundChoice: results.filter(({ username }) => username === state.name)[0].choice
  }));
