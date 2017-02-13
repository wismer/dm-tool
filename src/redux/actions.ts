import {
  AppState,
  SavedCharacter,
  Character,
  ToolChoice,
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
    // const { tools } = getState();
    // const { enemies, players, name, surpriseRound } = tools.createEncounter;
    // const roster = enemies.concat(players).map(c => ({id: c.id, count: c.count || 1, intiativeRoll: c.initiativeRoll}))
    // let encounter = {
    //   roster,
    //   name,
    //   surpriseRound
    // };
    // dispatch(saveEncounterInit());
    // let xhr: XMLHttpRequest = new XMLHttpRequest();
    // xhr.addEventListener('loadend', (response) => {
    //   dispatch(saveEncounterFinish(response));
    // });
    // xhr.open('POST', `http://localhost:8000/api/encounter/`);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify(encounter));
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
export const ENCOUNTER_DETAIL_LOAD = 'ENCOUNTER_DETAIL_LOAD';

function encounterStateLoad(response: any, detail?: boolean): any {
  if (detail) {
    return {
      type: ENCOUNTER_DETAIL_LOAD,
      encounter: JSON.parse(response.target.responseText)
    };
  } else {
    let { encounters, characters } = response;
    return {
      type: ENCOUNTER_STATE_LOAD,
      encounters,
      characters: characters.map((char: SavedCharacter) => {
        char.count = 1;
        return char;
      })
    };
  }
}

export const LOAD_ENCOUNTERS_INIT = 'LOAD_ENCOUNTERS_INIT';

function loadEncountersInit(): any {
  return {
    type: LOAD_ENCOUNTERS_INIT,
  };
}



export function retrieveEncounterData(params: any): AppUpdate {
  return (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(loadEncountersInit());
    let pro = api.getEncounters(params)

    pro.then((text: string) => {
      dispatch(encounterStateLoad(JSON.parse(text)));
    });
  }
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
      roster: encounter.roster.map(c => {
        return {
          id: c.id,
          characterstate: c.id,
          readiedAction: false,
          currentHitPoints: c.currentHitPoints || 0
        };
      })
    };

    api.endEncounterRound(data).then((response: string) => {
      dispatch(endRoundFinish(JSON.parse(response)))
    });
  };
}
