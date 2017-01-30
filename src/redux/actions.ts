import { AppState, Character, ToolChoice, Encounter } from '../interfaces';

interface Dispatch {
  (action: any): AppState;
}
type AppUpdate = (dispatch: Dispatch, getState: () => AppState) => void;


export const REFRESH_ENCOUNTERS = 'REFRESH_ENCOUNTERS';

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

export const CHANGE_TOOL = 'CHANGE_TOOL';

export function changeTool(tool: ToolChoice): any {
  return {
    type: CHANGE_TOOL,
    tool
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
  return (dispatch: Dispatch, getState: () => AppState) => {
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

export const SAVE_ENCOUNTER_INIT = 'SAVE_ENCOUNTER_INIT';

function saveEncounterInit(): any {
  return {
    type: SAVE_ENCOUNTER_INIT
  };
}

export const SAVE_ENCOUNTER_FINISH = 'SAVE_ENCOUNTER_FINISH';

function saveEncounterFinish(response: any): any {
  let encounter = JSON.parse(response.target.responseText);
  encounter.roster = []; // FIXME
  return {
    type: SAVE_ENCOUNTER_FINISH,
    encounter
  };
}

export const SAVE_CHARACTER = 'SAVE_CHARACTER';

function saveCharacterFinish(response: any): any {
  let character = JSON.parse(response.target.responseText);
  return {
    type: SAVE_CHARACTER,
    character
  };
}

export function addCharacter(character: Character): AppUpdate {
  return (dispatch: Dispatch, getState: () => AppState) => {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.addEventListener('loadend', (response) => {
      dispatch(saveCharacterFinish(response));
    });
    xhr.open('POST', `http://localhost:8000/api/character/`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(character));

  };
}

export function saveEncounter(encounter: Encounter): AppUpdate {
  return (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(saveEncounterInit());
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.addEventListener('loadend', (response) => {
      dispatch(saveEncounterFinish(response));
    });
    xhr.open('POST', `http://localhost:8000/api/encounter/`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(encounter));
  };
}

export function addCharactersToEncounter(characterIDs: number[]): AppUpdate {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const { tools } = getState();
    if (tools.activeEncounter) {
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.addEventListener('loadend', (response) => {
        dispatch(encounterStateLoad(response));
      });
      // probably should just be a PATCH.
      xhr.open('PATCH', `http://localhost:8000/api/encounter/${tools.activeEncounter}/characters/`);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({ characters: characterIDs }));
    } else {
      // TODO add error handling if no activeEncounter
    }
  }
}

export function querySpells(query: string): AppUpdate {
  const getSpells: AppUpdate = (dispatch: Dispatch, getState: () => AppState) => {
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


/* ENCOUNTER STATE LOAD */

export const ENCOUNTER_STATE_LOAD = 'ENCOUNTER_STATE_LOAD';

function encounterStateLoad(response: any): any {
  let { encounters, characters } = JSON.parse(response.target.responseText);
  return {
    type: ENCOUNTER_STATE_LOAD,
    encounters,
    characters
  };
}

export function retrieveEncounterData(): AppUpdate {
  return (dispatch: Dispatch, getState: () => AppState) => {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.addEventListener('loadend', (response) => {
      dispatch(encounterStateLoad(response));
    });
    xhr.open('GET', `http://localhost:8000/api/encounter`);
    xhr.send();
  }
}

export const SWITCH_ACTIVE_ENCOUNTER = 'SWITCH_ACTIVE_ENCOUNTER';

export function switchActiveEncounter(id: number | null): any {
  return {
    type: SWITCH_ACTIVE_ENCOUNTER,
    id
  };
}
