import {
  ToolState,
  ToolChoice,
  TurnOrder,
  AppState,
  EncounterListProps,
  CharacterListProps,
  SavedCharacter,
  Encounter
 } from '../../interfaces';
import {
  // INIT_SAVE_CHARACTER_DM_TOOL,
  FINISH_SAVE_CHARACTER_DM_TOOL,
  LOAD_ENCOUNTERS_INIT,
  SAVE_ENCOUNTER_FINISH,
  ENCOUNTER_STATE_LOAD,
  ENCOUNTER_DETAIL_LOAD,
  SAVE_CHARACTER,
  SAVE_ENCOUNTER_INIT,
  SWITCH_ACTIVE_ENCOUNTER,
  END_ROUND_FINISH,
  END_ROUND_INIT,
  CHANGE_TOOL,
  CHARACTER_LIST_LOAD,
  UPDATE_HIT_POINTS,
} from '../actions';
import {
  CharacterMap
} from '../../util';
import { Character, EncounterCreationProps } from '../../interfaces';

const initialTool: TurnOrder = {
  players: [],
  enemies: [],
  order: [],
  name: 'Turn Order'
};

const initialState: ToolState = {
  turnOrder: initialTool,
  isLoading: false,
  activeTool: 1,
  encounters: [],
  characters: [],
  activeEncounter: null
};

function addCharacterToList(state: ToolState, character: SavedCharacter): ToolState {
  return Object.assign({}, state, {
    characters: [...state.characters, character]
  });
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
    characters: action.characters,
    isLoading: false
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



function loadEncountersInit(state: ToolState): ToolState {
  return Object.assign({}, state, { isLoading: true });
}

function loadEncounterDetail(state: ToolState, action: any): ToolState {
  const { encounter } = action;
  let encounters = state.encounters.filter(e => e.id !== encounter.id);
  return Object.assign({}, state, { encounters: [...encounters, encounter], isLoading: false });
}

function characterListLoad(state: ToolState, characters: SavedCharacter[]): ToolState {
  return Object.assign({}, state, { characters });
}

function updateEncounterRoster(roster: Character[], charID: number, hp: number): Character[] {
  return roster.map(c => {
    if (c.id === charID) {
      c.currentHitPoints += hp;
    }
    return c;
  });
}

function updateHitPoints(state: ToolState, charStateID: number, hp: number, encounterID: number) {
  return Object.assign({}, state, {
    encounters: state.encounters.map(e => {
      if (e.id === encounterID) {
        return Object.assign({}, e, { roster: updateEncounterRoster(e.roster, charStateID, hp) });
      }

      return e;
    })
  });
}

function endRoundInit(state: ToolState, id: number): ToolState {
  return state;
}

function endRoundFinish(state: ToolState, action: any): ToolState {
  return Object.assign({}, state, {
    encounters: state.encounters.map(e => {
      if (e.id === action.id) {
        return action;
      }
      return e;
    })
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
    case CHARACTER_LIST_LOAD:
      return characterListLoad(state, action.characters);
    case SAVE_ENCOUNTER_INIT:
      return state; // TODO
    case SAVE_ENCOUNTER_FINISH:
      return addEncounter(state, action.encounter);
    case ENCOUNTER_STATE_LOAD:
      return loadEncounters(state, action);
    case ENCOUNTER_DETAIL_LOAD:
      return loadEncounterDetail(state, action);
    case UPDATE_HIT_POINTS:
      return updateHitPoints(state, action.charStateID, action.hp, action.encounterID);
    case SWITCH_ACTIVE_ENCOUNTER:
      return switchActiveEncounter(state, action.id);
    case SAVE_CHARACTER:
      return saveCharacter(state, action.character);
    case LOAD_ENCOUNTERS_INIT:
      return loadEncountersInit(state);
    case END_ROUND_INIT:
      return endRoundInit(state, action.id);
    case END_ROUND_FINISH:
      return endRoundFinish(state, action);
    default: return state;
  }
}

export function characterListProps(state: AppState, props: any): CharacterListProps {
  let characters;

  if (props.filter && props.filter === 'npcs') {
    characters = state.tools.characters.filter(c => c.isNpc);
  } else if (props.filter && props.filter === 'players') {
    characters = state.tools.characters.filter(c => !c.isNpc);
  } else {
    characters = state.tools.characters;
  }

  return {
    characters,
    activeIdx: props.activeIdx
  };
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

export function encounterViewProps(state: AppState, props: any): Encounter {
  const { id } = props.params;
  return state.tools.encounters.find(e => `${e.id}` === id) || state.tools.encounters[0]
}

export function createEncounterProps(state: AppState, props: any): EncounterCreationProps {
  const { tools } = state;
  const { players, npcs } = CharacterMap(tools.characters).split();
  return {
    children: props.children,
    players,
    npcs,
    saveEncounter: props.saveEncounter,
    onChange: props.onChange,
  };
}
