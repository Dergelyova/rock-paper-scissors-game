import { Domain } from 'effector';

export const loadFromStorage = (domain: Domain, storage: Storage) => {
  return domain.onCreateStore((store) => {
    const key = `userName`;
    const raw = storage.getItem(key);
    if (!raw) return;
    store.setState(raw);
  });
};

export const saveToStorage = (domain: Domain, storage: Storage) => {
  return domain.onCreateStore((store) => {
    const key = `userName`;
    store.watch((value) => {
      storage.setItem(key, `${value}`);
    });
  });
};
