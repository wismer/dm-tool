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

interface PayloadItem {
  id: number;
}

interface SerializedPayload<T> {
  [index: number]: T;
}

interface NormalizedPayload<T> {
  charactersById?: SerializedPayload<T>;
  characters?: number[];
  encountersById?: SerializedPayload<T>
  encounters?: number[];
}

export function wrapPayload<T extends PayloadItem, R>(payload: T[], key: string): NormalizedPayload<R> {
  return {
    [`${key}ById`]: payload.reduce((prev: NormalizedPayload<R>, next: T) => {
      prev[next.id] = next;
      return prev;
    }, {}),
    [key]: payload.map((item: T) => item.id)
  };
}

interface Resource {
  name?: string;
}

export function fetchLocally<T extends Resource>(key: string, query: string): {results: T[]} | void {
  const data = localStorage.getItem(key);
  if (data) {
    let payload = JSON.parse(data);
    return {
      results: payload.results.filter((c: T) => new RegExp(query, 'i').exec(c.name || ''))
    };
  }
}
