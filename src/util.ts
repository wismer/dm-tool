import { AppState, CharacterState } from './interfaces';

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

export function randInt(initiative: number): number {
  return Math.floor(Math.random() * 20) + initiative;
}

export function CharacterMap(characters: CharacterState[]) {
  return {
    map: (f: (c: CharacterState) => CharacterState) => characters.map(f),
    toList: () => characters,
    sort: (f: (a: CharacterState, b: CharacterState) => number) => characters.sort(f),
    split: (): { players: CharacterState[], npcs: CharacterState[]} => {
      return {
        players: characters.filter(c => !c.isNpc),
        npcs: characters.filter(c => c.isNpc)
      };
    },
    slice: (a: number) => {
      return {
        prev: a > 0 ? characters.slice(0, a) : [],
        current: characters.slice(a, a + 1),
        next: characters.slice(a + 1, characters.length)
      }
    }
  };
}
