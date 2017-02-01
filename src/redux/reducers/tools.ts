import {
  ToolState,
  ToolChoice,
  TurnOrder,
  AppState,
  CharDesc,
  EncounterListProps,
  SavedCharacter,
  Encounter
 } from '../../interfaces';
import {
  // INIT_SAVE_CHARACTER_DM_TOOL,
  FINISH_SAVE_CHARACTER_DM_TOOL,
  ADD_CHARS_TO_NEW_ENCOUNTER,
  SAVE_ENCOUNTER_INIT,
  SAVE_ENCOUNTER_FINISH,
  ENCOUNTER_STATE_LOAD,
  SAVE_CHARACTER,
  SWITCH_ACTIVE_ENCOUNTER,
  CHANGE_TOOL,
  UPDATE_INITIATIVE_SCORE,
} from '../actions';
import { Character, EncounterCreation } from '../../interfaces';

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
  characters: [],
  createEncounter: {
    name: '',
    currentTurn: 1,
    surpriseRound: false,
    players: [],
    enemies: []
  },
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

function loadEncounters(state: ToolState, action: { encounters: Encounter[], characters: Character[] }): ToolState {
  return Object.assign({}, state, {
    encounters: action.encounters,
    characters: action.characters
  });
}

function switchActiveEncounter(state: ToolState, id: number | null): ToolState {
  return Object.assign({}, state, {
    activeEncounter: id
  });
}

function saveCharacter(state: ToolState, character: Character): ToolState {
  return Object.assign({}, state, {
    characters: [...state.characters, character]
  });
}

function addCharactersToEncounter(state: ToolState, players: CharDesc[], enemies: CharDesc[]): ToolState {
  const createEncounter = Object.assign({}, state.createEncounter, {
    players: state.createEncounter.players.concat(players),
    enemies: state.createEncounter.enemies.concat(enemies)
  });
  return Object.assign({}, state, { createEncounter });
}

function randInt(initiative: number): number {
  return Math.floor(Math.random() * 20) + initiative;
}

function updateInitiativeScore(state: ToolState, char: CharDesc, score?: any) {
  let initiativeResult: number, key: string;
  score = score ? parseInt(score) : 0;
  if (char.isNpc) {
    key = 'enemies';
    initiativeResult = randInt(char.initiative || 0);
  } else {
    key = 'players';
    initiativeResult = score;
  }
  let items = state.createEncounter[key];

  const createEncounter = Object.assign({}, state.createEncounter, {
    [key]: items.map((c: CharDesc) => {
      if (c.id === char.id) {
        c.initiativeRoll = initiativeResult;
      }
      return c;
    })
  });
  return Object.assign({}, state, { createEncounter });
}

function updateEncounter(state: ToolState, action: any): ToolState {
  const createEncounter = Object.assign({}, state.createEncounter, {
    [action.key]: action.value
  });

  return Object.assign({}, state, { createEncounter });
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
    case SAVE_ENCOUNTER_INIT:
      return state; // TODO
    case SAVE_ENCOUNTER_FINISH:
      return addEncounter(state, action.encounter);
    case ENCOUNTER_STATE_LOAD:
      return loadEncounters(state, action);
    case SWITCH_ACTIVE_ENCOUNTER:
      return switchActiveEncounter(state, action.id);
    case SAVE_CHARACTER:
      return saveCharacter(state, action.character);
    case ADD_CHARS_TO_NEW_ENCOUNTER:
      return addCharactersToEncounter(state, action.players, action.enemies);
    case UPDATE_INITIATIVE_SCORE:
      return updateInitiativeScore(state, action.character, action.score)
    case 'UPDATE_ENCOUNTER':
      return updateEncounter(state, action);
    default: return state;
  }
}

export function characterList(state: AppState, props: any): {characters: Array<SavedCharacter> } {
  return { characters: state.tools.characters };
}

export function addCharacterProps(state: AppState, props: any): {isOpen: boolean} {
  return props;
}

/* ENCOUNTER */

export function encounterListProps(state: AppState, props: any): EncounterListProps {
  const { tools } = state;
  return {
    encounters: tools.encounters,
    activeEncounter: tools.activeEncounter
  };
}

export function createEncounterProps(state: AppState, props: any): EncounterCreation {
  return state.tools.createEncounter;
}
