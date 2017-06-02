import {
  Encounter,
  EncounterUpdate,
  Spell,
  ChapterResource,
  ChapterField,
  ClueModel,
  ClueField,
  ServerCode,
} from './interfaces';
import { fetchLocally, wrapPayload } from './util';


const API_HOST = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000/api'
  : 'http://dungeon-dragon.herokuapp.com/api';

export function addClueToChapter(clue: ClueField, chapterID: number): Promise<any> {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      chapter: chapterID,
      description: clue.description,
      requiredStats: clue.requiredStats,
    }),
    headers: { 'Content-Type': 'application/json' }
  };
  return fetch(`http://localhost:8000/api/clue/`, options)
    .then(response => response.json(), () => {});
}

export function updateClue(clue: ClueModel): Promise<any> {
  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(clue)
  };

  return fetch(`${API_HOST}/clue/`, options).then(r => r.json());
}

export function saveChapter<T>(chapter: ChapterField): Promise<T> {
  return new Promise((resolve, reject) => {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.addEventListener('loadend', () => {
      // let url = '${API_HOST}/api/encounter/';
      let data = JSON.parse(xhr.responseText);
      if (xhr.status === ServerCode.RESOURCE_ADDED) {
        resolve(data);
      } else {
        reject(data);
      }
    });
    let url = `http://localhost:8000/api/chapter/`;
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(chapter));
  });
}

export function loadChapterDetail(chapterID: number | string): Promise<any> {
  return fetch(`http://localhost:8000/api/chapter/${chapterID}/`).then(c => c.json())
}

export function saveClue(clue: ClueField, chapterID: string): Promise<any> {
  const options = {
    method: 'POST',
    data: JSON.stringify({
      chapter: parseInt(chapterID),
      description: clue.description
    })
  };
  return fetch(`http://localhost:8000/api/chapter/${chapterID}/add_clue/`, options).then(c => c.json());
}

export function loadChapterList<T>(): Promise<T> {
  return new Promise((resolve, reject) => {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.addEventListener('loadend', () => {
      // let url = '${API_HOST}/api/encounter/';
      let data = JSON.parse(xhr.responseText);
      const chapters: ChapterResource[] = data.results as ChapterResource[];
      if (xhr.status === ServerCode.OK) {
        resolve(chapters);
      } else {
        reject(data);
      }
    });
    let url = `http://localhost:8000/api/chapter/`;
    xhr.open('GET', url);
    xhr.send();
  });
}

export function getEncounters<T>(routerLocation: any, params: { id?: string }, page: number): Promise<T> {
  return new Promise((resolve, reject) => {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.addEventListener('loadend', () => {
      // let url = '${API_HOST}/api/encounter/';
      let data = JSON.parse(xhr.responseText);
      if (xhr.status === ServerCode.OK) {
        resolve(data);
      } else {
        reject(data);
      }
    });
    let url = `${API_HOST}/api/encounter/`;
    if (params.id) {
      url += `${params.id}/`;
    } else {
      url += `?page=${page}`;
    }
    xhr.open('GET', url);
    xhr.send();
  });
}

export function saveCharacter<T, C>(character: C): Promise<T> {
  return new Promise((resolve, reject) => {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.addEventListener('loadend', () => {
      const data = JSON.parse(xhr.responseText);
      if (xhr.status === 201) {
        resolve(data);
      } else {
        reject(data);
      }
    });
    xhr.open('POST', `${API_HOST}/api/character/`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(character));
  });
}

export function getCharacters<T>(query?: string): Promise<T> {
  return new Promise((resolve, reject) => {
    let url = '${API_HOST}/api/character/';
    if (query) {
      url += query;
    }
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.addEventListener('loadend', () => {
      if (xhr.status === ServerCode.OK) {
        resolve(JSON.parse(xhr.responseText).results);
      } else {
        reject('FAILED');
      }
    });
    xhr.open('GET', url);
    xhr.send();
  });
}

export function saveEncounter<T>(encounter: Encounter): Promise<T> {
  return new Promise((resolve, reject) => {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.addEventListener('loadend', () => {
      if (xhr.status === ServerCode.RESOURCE_ADDED) {
        resolve(xhr.responseText);
      } else {
        reject('FAILED');
      }
    });
    xhr.open('POST', `${API_HOST}/api/encounter/`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    let data = {
      name: encounter.name,
      roster: encounter.roster.map(c => ({ id: c.id, initiativeRoll: c.initiativeRoll })),
      currentTurn: 1,
      surpriseRound: encounter.surpriseRound
    };
    xhr.send(JSON.stringify(data));
  });
}

export function endEncounterRound<T>(encounterUpdate: EncounterUpdate): Promise<T> {
  return new Promise((resolve, reject) => {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.addEventListener('loadend', () => {
      if (xhr.status < 300) {
        resolve(xhr.responseText);
      } else {
        reject('FAILED');
      }
    });
    xhr.open('PATCH', `${API_HOST}/api/encounter/${encounterUpdate.id}/`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(encounterUpdate));
  });
}

export function querySpells<T>(query: string): Promise<T> {
  return new Promise((resolve, reject) => {
    let storedData = fetchLocally<{results: Spell[]}>('spells', query);
    if (storedData) {
      return resolve(storedData.results);
    }
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.addEventListener('loadend', () => {
      localStorage.setItem('spells', xhr.responseText);
      const data = JSON.parse(xhr.responseText);
      resolve(wrapPayload(data.results, 'spells'));
    });
    xhr.open('GET', `${API_HOST}/api/spell/?name=${query}`);
    xhr.send();
  });
}
