import { AppState, Character } from '../interfaces';

interface Dispatch {
  <T>(action: any): AppState<T>;
}
type AppUpdate = <T>(dispatch: Dispatch, getState: () => AppState<T>) => void;


export const SPELL_QUERY_RESPONSE = 'SPELL_QUERY_RESPONSE';

function spellQueryResponse(response: any): any {
  let data = JSON.parse(response.target.responseText);
  return {
    type: SPELL_QUERY_RESPONSE,
    spells: data.results,
  }
}

export const SPELL_QUERY_REQUEST = 'SPELL_QUERY_REQUEST';

function spellQueryRequest(): any {
  return {
    type: SPELL_QUERY_REQUEST,
  };
}

export const INIT_SAVE_CHARACTER_DM_TOOL = 'INIT_SAVE_CHARACTER_DM_TOOL';

function saveCharacterInit(): any {
  return {
    type: INIT_SAVE_CHARACTER_DM_TOOL,
  };
}

export const FINISH_SAVE_CHARACTER_DM_TOOL = 'FINISH_SAVE_CHARACTER_DM_TOOL';

function finishSaveCharacter(response: any): any {
  return {
    type: FINISH_SAVE_CHARACTER_DM_TOOL,
    character: JSON.parse(response.target.responseText)
  }
}

export function saveCharacter(character: Character): AppUpdate {
  return <T>(dispatch: Dispatch, getState: () => AppState<T>) => {
    dispatch(saveCharacterInit());
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.addEventListener('loadend', (response) => {
      dispatch(finishSaveCharacter(response));
    });
    xhr.open('POST', `http://localhost:8000/api/encounter/`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(character));
  }
}

export function querySpells(query: string): AppUpdate {
  const getSpells: AppUpdate = <T>(dispatch: Dispatch, getState: () => AppState<T>) => {
    dispatch(spellQueryRequest());
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.addEventListener('loadend', (response) => {
      dispatch(spellQueryResponse(response));
    });
    xhr.open('GET', `http://localhost:8000/api/spell/?name=${query}`);
    xhr.send();
  }
  return getSpells;
}
