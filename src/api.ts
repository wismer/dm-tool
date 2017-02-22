import {
  Encounter,
  EncounterUpdate,
  Spell,
  ServerCode
} from './interfaces';
import { fetchLocally } from './util';

export function getEncounters<T>(routerLocation: any, params: { id?: string }, page: number): Promise<T> {
  return new Promise((resolve, reject) => {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.addEventListener('loadend', () => {
      // let url = 'http://localhost:8000/api/encounter/';
      let data = JSON.parse(xhr.responseText);
      if (xhr.status === ServerCode.OK) {
        resolve(data);
      } else {
        reject(data);
      }
    });
    let url = 'http://localhost:8000/api/encounter/';
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
    xhr.open('POST', `http://localhost:8000/api/character/`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(character));
  });
}

export function getCharacters<T>(query?: string): Promise<T> {
  return new Promise((resolve, reject) => {
    let url = 'http://localhost:8000/api/character/';
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
    xhr.open('POST', `http://localhost:8000/api/encounter/`);
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
    xhr.open('PATCH', `http://localhost:8000/api/encounter/${encounterUpdate.id}/`);
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
      resolve(data);
    });
    xhr.open('GET', `http://localhost:8000/api/spell/?name=${query}`);
    xhr.send();
  });
}
