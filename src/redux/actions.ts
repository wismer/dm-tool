import {
  AppState,
  SavedCharacter,
  Character,
  Encounter,
  EncounterUpdate
} from '../interfaces';

import * as api from '../api';

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

export const INIT_SAVE_CHARACTER_DM_TOOL = 'INIT_SAVE_CHARACTER_DM_TOOL';

function saveCharacterInit(): any {
  return {
    type: INIT_SAVE_CHARACTER_DM_TOOL,
  };
}

export const FINISH_SAVE_CHARACTER_DM_TOOL = 'FINISH_SAVE_CHARACTER_DM_TOOL';

function finishSaveCharacter(character: SavedCharacter): any {
  return {
    type: FINISH_SAVE_CHARACTER_DM_TOOL,
    character
  }
}

export function saveCharacter(character: Character): AppUpdate {
  return (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(saveCharacterInit());
    api.saveCharacter(character).then((data: SavedCharacter) => {
      dispatch(finishSaveCharacter(data));
    });
  }
}

export const SAVE_ENCOUNTER_INIT = 'SAVE_ENCOUNTER_INIT';
//
// function saveEncounterInit(): any {
//   return {
//     type: SAVE_ENCOUNTER_INIT
//   };
// }

export const SAVE_ENCOUNTER_FINISH = 'SAVE_ENCOUNTER_FINISH';

function saveEncounterFinish(data: string): any {
  let encounter = JSON.parse(data);
  return {
    type: SAVE_ENCOUNTER_FINISH,
    encounter
  };
}

export const SAVE_CHARACTER = 'SAVE_CHARACTER';

function saveCharacterFinish(character: Character): any {
  return {
    type: SAVE_CHARACTER,
    character
  };
}

export function addCharacter(character: Character): AppUpdate {
  return (dispatch: Dispatch, getState: () => AppState) => {
    api.saveCharacter(character).then(() => {
      dispatch(saveCharacterFinish(character));
    });
  }
}

export const CHARACTER_LIST_INIT = 'CHARACTER_LIST_INIT';
export function characterListInit(): AppUpdate {
  return (dispatch: Dispatch, getState: () => AppState) => {
    api.getCharacters().then((characters: SavedCharacter[]) => {
      dispatch(characterListLoad(characters));
    });
  };
}

export const CHARACTER_LIST_LOAD = 'CHARACTER_LIST_LOAD';
export function characterListLoad(characters: SavedCharacter[]): any {
  return {
    characters,
    type: CHARACTER_LIST_LOAD
  };
}

export function saveEncounter(encounter: Encounter): AppUpdate {
  return (dispatch: Dispatch, getState: () => AppState) => {
    api.saveEncounter(encounter).then((data: string) => {
      dispatch(saveEncounterFinish(data))
    });
  };
}

export const ADD_CHARS_TO_NEW_ENCOUNTER = 'ADD_CHARS_TO_NEW_ENCOUNTER';

export function addCharactersToEncounter(characters: SavedCharacter[]): any {
  return {
    type: ADD_CHARS_TO_NEW_ENCOUNTER,
    players: characters.filter(c => !c.isNpc),
    enemies: characters.filter(c => c.isNpc)
  };
}

export const UPDATE_INITIATIVE_SCORE = 'UPDATE_INITIATIVE_SCORE';

/*
// return (dispatch: Dispatch, getState: () => AppState) => {
//   const { tools } = getState();
//   if (tools.activeEncounter) {
//     let xhr: XMLHttpRequest = new XMLHttpRequest();
//     xhr.addEventListener('loadend', (response) => {
//       dispatch(encounterStateLoad(response));
//     });
//     // probably should just be a PATCH.
//     xhr.open('PATCH', `http://localhost:8000/api/encounter/${tools.activeEncounter}/characters/`);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send(JSON.stringify({ characters: characterIDs }));
//   } else {
//     // TODO add error handling if no activeEncounter
//   }
// }
*/

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
function encounterStateLoad(encounters: Encounter[], count: number): any {
  return {
    type: ENCOUNTER_STATE_LOAD,
    encounters,
    page: Math.ceil(count / 10)
  };
}

export const ENCOUNTER_DETAIL_LOAD = 'ENCOUNTER_DETAIL_LOAD';
function encounterDetailLoad(encounter: Encounter): any {
  return {
    type: ENCOUNTER_DETAIL_LOAD,
    encounter
  };
}

export const LOAD_ENCOUNTERS_INIT = 'LOAD_ENCOUNTERS_INIT';
function loadEncountersInit(): any {
  return {
    type: LOAD_ENCOUNTERS_INIT,
  };
}

export function retrieveEncounterData(location: ReactRouter.RouterState, params: { id?: string }): AppUpdate {
  return (dispatch: Dispatch, getState: () => AppState) => {
    let { tools } = getState();
    dispatch(loadEncountersInit());
    api.getEncounters(location, params, tools.encounterPage).then((payload: any) => {
      if (payload.results) {
        dispatch(encounterStateLoad(payload.results, payload.count))
      } else {
        dispatch(encounterDetailLoad(payload));
      }
    });
  }
}

export const CHANGE_ENCOUNTER_PAGE = 'CHANGE_ENCOUNTER_PAGE';
export function changeEncounterPage(page: number) {
  return {
    type: CHANGE_ENCOUNTER_PAGE,
    page
  };
}

// export function retrieveEncounterData(params: any): AppUpdate {
//   return <T>(dispatch: Dispatch, getState: () => AppState): Promise<T> => {
//     dispatch(loadEncountersInit())
//     return new Promise((resolve, reject) => {
//       let xhr: XMLHttpRequest = new XMLHttpRequest();
//       xhr.addEventListener('loadend', (response) => {
//         if (xhr.status === 200) {
//           dispatch(encounterStateLoad(response, typeof params.id !== 'undefined'));
//           resolve();
//         } else {
//           reject();
//         }
//       });
//       xhr.open('GET', `http://localhost:8000/api/encounter/${params.id ? params.id : ''}`);
//       xhr.send();
//     });
//   }
// }

export const SWITCH_ACTIVE_ENCOUNTER = 'SWITCH_ACTIVE_ENCOUNTER';

export function switchActiveEncounter(id: number | null): any {
  return {
    type: SWITCH_ACTIVE_ENCOUNTER,
    id
  };
}

export const GET_ENCOUNTER = 'GET_ENCOUNTER';

export function getEncounter(id: number | string): any {
  return {
    type: GET_ENCOUNTER,
    id
  }
}

export const UPDATE_HIT_POINTS = 'UPDATE_HIT_POINTS';

export function updateHitPoints(hp: number, charStateID: number, encounterID: number): any {
  return {
    type: UPDATE_HIT_POINTS,
    hp, charStateID, encounterID
  };
}

export const END_ROUND_INIT = 'END_ROUND_INIT';
export const END_ROUND_FINISH = 'END_ROUND_FINISH';

export function endRoundInit(id: number): any {
  return {
    type: END_ROUND_INIT,
    id
  };
}

function endRoundFinish(data: any): any {
  return {
    type: END_ROUND_FINISH,
    ...data
  };
}

export function endRound(id: number, endOfRound: boolean) {
  return (dispatch: Dispatch, getState: () => AppState) => {
    let { tools } = getState();
    let encounter = tools.encounters.find((e: Encounter) => e.id === id);
    if (!encounter) {
      return;
    }
    let data: EncounterUpdate = {
      id,
      endOfRound,
      roster: encounter.roster
    };

    api.endEncounterRound(data).then((response: string) => {
      dispatch(endRoundFinish(JSON.parse(response)))
    });
  };
}

export const CHARACTER_SEARCH_RESULTS = 'CHARACTER_SEARCH_RESULTS';
export function receiveSearchResults(results: SavedCharacter[]): any {
  return {
    characters: results,
    type: CHARACTER_SEARCH_RESULTS
  };
}
