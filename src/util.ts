import { AppState } from './interfaces';
export function fetchPersistentStorage(): AppState | void {
  try {
    let storage: Storage = window.localStorage;
    return JSON.parse(storage.getItem('deadlyEncounters') || '');
  } catch (err) {
    return undefined;
  }
}

export function saveStateToLocalStorage(state: AppState): void {
  try {
    let storage: Storage = window.localStorage;
    let data = JSON.stringify(state);
    storage.setItem('deadlyEncounters', data);
  } catch (err) {
    return undefined;
  }
}
