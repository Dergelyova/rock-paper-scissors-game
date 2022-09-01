import { createStore, createEvent } from 'effector';
import { RoundResultType } from 'shared/api';

export const scoreChanged = createEvent<RoundResultType>();
export const scoreReset = createEvent();

export const $score = createStore({ currentPlayerPoints: 0, opponentPlayerPoints: 0 })
  .on(scoreChanged, (state, value) => {
    switch (value) {
      case 'win':
        return { ...state, currentPlayerPoints: state.currentPlayerPoints + 1 };
      case 'loss': {
        return { ...state, opponentPlayerPoints: state.opponentPlayerPoints + 1 };
      }
      default:
        return {
          ...state,
          currentPlayerPoints: state.currentPlayerPoints + 1,
          opponentPlayerPoints: state.opponentPlayerPoints + 1
        };
    }
  })
  .reset(scoreReset);
