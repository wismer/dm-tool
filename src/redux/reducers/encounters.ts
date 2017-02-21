import { Encounter, EncounterState } from '../../interfaces';
import {
  SAVE_ENCOUNTER_FINISH,
  SAVE_ENCOUNTER_INIT,
  CHANGE_ENCOUNTER_PAGE,
  UPDATE_HIT_POINTS,
  SWITCH_ACTIVE_ENCOUNTER,
  ENCOUNTER_STATE_LOAD,
  ENCOUNTER_DETAIL_LOAD,
} from '../actions';
import { wrapPayload } from '../../util';

const initialEncounterState = {
  encounters: [],
  encountersById: {},
  characterStates: [],
  characterStatesById: {},
  page: 1
};


export function encounter(state: EncounterState, action: any): EncounterState {
  if (!state) {
    return initialEncounterState;
  }

  switch (action.type) {
    case SAVE_ENCOUNTER_INIT:
      return Object.assign({}, state, { isLoading: true }); // TODO
    case SAVE_ENCOUNTER_FINISH:
      return addEncounter(state, action.encounter);
    case CHANGE_ENCOUNTER_PAGE:
      return changeEncounterPage(state, action.page);
    case ENCOUNTER_STATE_LOAD:
      return loadEncounters(state, action.encounters, action.page);
    case ENCOUNTER_DETAIL_LOAD:
      return loadEncounterDetail(state, action.encounter);
    case UPDATE_HIT_POINTS:
      return updateHitPoints(state, action.charStateID, action.hp, action.encounterID);
    case SWITCH_ACTIVE_ENCOUNTER:
      return switchActiveEncounter(state, action.id);
    default: return state;
  }
}

function addEncounter(state: EncounterState, encounter: Encounter) {
  return state; // TODO
}

function loadEncounters(state: EncounterState, encounters: Encounter[], page: number): EncounterState {
  const deserialized = wrapPayload(encounters, 'encounters');
  return Object.assign({}, state, {
    page,
    ...deserialized
  });
}

function switchActiveEncounter(state: EncounterState, id: number | null): EncounterState {
  return Object.assign({}, state, {
    activeEncounter: id
  });
}

function loadEncounterDetail(state: EncounterState, encounter: Encounter): EncounterState {
  return state; // TODO
}

function updateHitPoints(state: EncounterState, charID: number, hp: number, encounterID: number) {
  let { characterStatesById } = state;
  const char = characterStatesById[charID];
  if (char && char.encounter === encounterID) {
    char.currentHitPoints = hp;
    characterStatesById = Object.assign({}, characterStatesById, {[charID]: char});
  }

  return Object.assign({}, state, { characterStatesById });
}

function changeEncounterPage(state: EncounterState, encounterPage: number): EncounterState {
  return Object.assign({}, state, { encounterPage });
}
