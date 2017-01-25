import {
  ToolState,
  ToolChoice,
  TurnOrder,
  AppState,
  EncounterListProps,
  Encounter
 } from '../../interfaces';
import {
  // INIT_SAVE_CHARACTER_DM_TOOL,
  FINISH_SAVE_CHARACTER_DM_TOOL,
  SAVE_ENCOUNTER_INIT,
  SAVE_ENCOUNTER_FINISH,
  ENCOUNTER_STATE_LOAD,
  CHANGE_TOOL
} from '../actions';
import { Character } from '../../interfaces';

const initialTool: TurnOrder = {
  players: [],
  enemies: [],
  order: [],
  name: 'Turn Order'
};

const initialState: ToolState = {
  turnOrder: initialTool,
  activeTool: 1,
  encounters: [],
  activeEncounter: null
};

function addCharacterToList(state: ToolState, character: any): ToolState {
  let { turnOrder } = state;

  turnOrder = Object.assign({}, turnOrder, {
    players: [...turnOrder.players, character],
  });

  return Object.assign({}, state, { turnOrder })
}

function changeTool(state: ToolState, tool: ToolChoice): ToolState {
  return Object.assign({}, state, { activeTool: tool });
}

function addEncounter(state: ToolState, encounter: Encounter) {
  return Object.assign({}, state, {
    encounters: [...state.encounters, encounter]
  });
}

function loadEncounters(state: ToolState, encounters: Encounter[]): ToolState {
  return Object.assign({}, state, {
    encounters: encounters
  });
}

export function tools(state: ToolState, action: any): ToolState {
  if (!state) {
    return initialState;
  }

  switch (action.type) {
    case FINISH_SAVE_CHARACTER_DM_TOOL:
      return addCharacterToList(state, action.character);
    case CHANGE_TOOL:
      return changeTool(state, action.tool);
    case SAVE_ENCOUNTER_INIT: return state;
    case SAVE_ENCOUNTER_FINISH:
      return addEncounter(state, action.encounter);
    case ENCOUNTER_STATE_LOAD:
      return loadEncounters(state, action.encounters);
    default: return state;
  }
}
type ListState = { characters: Array<Character> };
export function characterList(state: AppState, props: any): ListState {
  return { characters: state.tools.turnOrder.players };
}

export function addCharacterProps(state: AppState, props: any): {isOpen: boolean} {
  return props;
}

/* ENCOUNTER */

export function encounterListProps(state: AppState, props: any): EncounterListProps {
  const { tools } = state;
  return {
    encounters: tools.encounters,
    activeEncounter: tools.activeEncounter || 1
  };
}
