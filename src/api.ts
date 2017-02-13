import { Encounter, EncounterUpdate } from './interfaces';
export function getEncounters<T>(params: any): Promise<T> {
  return new Promise((resolve, reject) => {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.addEventListener('loadend', () => {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject('FAILED');
      }
    });
    xhr.open('GET', `http://localhost:8000/api/encounter/${params.id ? params.id : ''}`);
    xhr.send();
  });
}

export function saveCharacter<T, C>(character: C): Promise<T> {
  return new Promise((resolve, reject) => {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.addEventListener('loadend', () => {
      if (xhr.status === 200) {
        resolve();
      } else {
        reject('FAILED');
      }
    });
    xhr.open('POST', `http://localhost:8000/api/character/`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(character));
  });
}

export function getCharacters<T>(): Promise<T> {
  return new Promise((resolve, reject) => {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.addEventListener('loadend', () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText).results);
      } else {
        reject('FAILED');
      }
    });
    xhr.open('GET', `http://localhost:8000/api/character/`);
    xhr.send();
  });
}

export function saveEncounter<T>(encounter: Encounter): Promise<T> {
  return new Promise((resolve, reject) => {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.addEventListener('loadend', () => {
      if (xhr.status < 300) {
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
