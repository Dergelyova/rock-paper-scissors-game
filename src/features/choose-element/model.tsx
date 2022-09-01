import { createStore, createEvent, sample } from 'effector';
import { playerModel } from 'entities/player';
import { ElementType } from 'shared/api';

export const newElementChoosed = createEvent<ElementType>();
export const choosedElementReset = createEvent();
export const $choosedElement = createStore<ElementType | 'none'>('none')
  .on(newElementChoosed, (_, value) => value)
  .reset(choosedElementReset);

sample({
  clock: newElementChoosed,
  target: playerModel.currentPlayerMadeChoice
});
