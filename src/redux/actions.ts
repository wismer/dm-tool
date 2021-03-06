import {
  AppState,
  SavedCharacter,
  Character,
  Encounter,
  EncounterUpdate,
  Spell,
  NormalizedPayload,
  SpellFilter,
  FilterAction,
  ChapterResource,
  ChapterField,
  ClueField,
  ClueModel,
  ClueResource,
  // OutcomeResource,
  // ChapterUpdate,
} from '../interfaces';
import * as ReactRouter from 'react-router';
// import * as _ from 'underscore';
import * as api from '../api';
import { wrapPayload } from '../util';


interface Dispatch {
  (action: any): AppState;
}
type AppUpdate = (dispatch: Dispatch, getState: () => AppState) => void;


export const CLUE_UPDATE = 'CLUE_UPDATE';
function clueUpdate(clue: ClueResource): any {
  return { clue, type: CLUE_UPDATE };
}

export function clueUpdateRequest(clue: ClueModel): any {
  return (dispatch: Dispatch, getState: AppState) => {
    dispatch(loadingState());
    api.updateClue(clue).then((clue: ClueResource) => dispatch(clueUpdate(clue)));
  }
}


export const CHAPTER_UPDATE = 'CHAPTER_UPDATE';
function savedClue(clue: ClueResource, chapterID: number): any {
  return { clue, chapterID, type: CHAPTER_UPDATE };
}

export function updateChapter(chapterID: number, clue: ClueField) {
  return (dispatch: Dispatch, getState: AppState) => {
    dispatch(loadingState());                                                                                         ``
    api.addClueToChapter(clue, chapterID).then(clue => dispatch(savedClue(clue, chapterID)));
  }
}


export const REFRESH_ENCOUNTERS = 'REFRESH_ENCOUNTERS';

export const SPELL_QUERY_RESPONSE = 'SPELL_QUERY_RESPONSE';

function spellQueryResponse(spellPayload: NormalizedPayload<Spell>, spellQuery?: string): any {
  return {
    type: SPELL_QUERY_RESPONSE,
    spellQuery,
    spellPayload
  };
}

function payloadResponse<T>(payload: NormalizedPayload<T>, spellQuery?: string): any {
  return {
    type: SPELL_QUERY_RESPONSE,
    payload,
    spellQuery
  };
}

export const SPELL_QUERY_REQUEST = 'SPELL_QUERY_REQUEST';

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
  return (dispatch: Dispatch, getState: () => AppState) => {
    const { spells: spellState } = getState();
    if (spellState.items.length > 0) {
      const payload = { itemsById: spellState.itemsById, items: spellState.items };
      dispatch(payloadResponse<Spell>(payload, query));
    } else {
      api.querySpells(query).then((results: Spell[]) => {
        const data = wrapPayload<Spell>(results, 'spells');
        dispatch(spellQueryResponse(data, query));
      });
    }
  }
}

export const SCHOOL_FILTER_TOGGLE = 'SCHOOL_FILTER_TOGGLE';
export function schoolToggle(school: SpellFilter): FilterAction<SpellFilter> {
  return {
    type: SCHOOL_FILTER_TOGGLE,
    filter: school
  };
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
// REPLACE ME TODO
// export const LOAD_ENCOUNTERS_INIT = 'LOAD_ENCOUNTERS_INIT';
// function loadEncountersInit(): any {
//   return {
//     type: LOAD_ENCOUNTERS_INIT,
//   };
// }

export function retrieveEncounterData(location: ReactRouter.Router, params: { id?: string }): AppUpdate {
  return (dispatch: Dispatch, getState: () => AppState) => {
    let { encounter: encounterState } = getState();
    api.getEncounters(location, params, encounterState.page).then((payload: any) => {
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
    let { encounter: encounterState } = getState();
    let encounterID = encounterState.encounters.find(e => e === id);
    if (!encounterID) {
      return;
    }
    let encounter = encounterState.encountersById[encounterID];
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

export const SPELL_LEVEL_TOGGLE = 'SPELL_LEVEL_TOGGLE';
export function spellLevelToggle(level: number): any {
  return {
    type: SPELL_LEVEL_TOGGLE,
    level
  }
}


export const SAVED_CHAPTER = 'SAVED_CHAPTER';
export function savedSettingsStoryboard(chapter: ChapterResource): any {
  return {
    type: SAVED_CHAPTER,
    chapter
  };
}

export const LOADING = 'LOADING';
function loadingState(): any {
  return {
    type: LOADING,
  }
}

export const CHAPTER_LIST_LOAD = 'CHAPTER_LIST_LOAD';
function onAllChaptersLoaded(chapters: ChapterResource[]): any {
  return {
    type: CHAPTER_LIST_LOAD,
    chapters
  };
}

export const CHAPTER_DETAIL_LOAD = 'CHAPTER_DETAIL_LOAD';
export function chapterDetailLoad(chapterID: number | string) {
  return (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(loadingState());
    api.loadChapterDetail(chapterID).then((chapter: ChapterResource) => {
      dispatch({ type: CHAPTER_DETAIL_LOAD, chapter });
    });
  }
}

export const CHAPTER_LIST = 'CHAPTER_LIST';
export function loadChapterList() {
  return (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(loadingState());
    api.loadChapterList().then((chapters: ChapterResource[]) => dispatch(onAllChaptersLoaded(chapters)));
  }
}

export function saveStoryboardSettings(chapter: ChapterField) {
  return (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(loadingState());
    api.saveChapter(chapter).then((c: ChapterResource) => {
      dispatch(savedSettingsStoryboard(c))
    });
  };
}
