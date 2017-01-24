import { ToolState, TurnOrder, AppState } from '../../interfaces';
import {
  // INIT_SAVE_CHARACTER_DM_TOOL,
  FINISH_SAVE_CHARACTER_DM_TOOL
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
};

function addCharacterToList(state: ToolState, character: any): ToolState {
  let { turnOrder } = state;

  turnOrder = Object.assign({}, turnOrder, {
    players: [...turnOrder.players, character],
  });

  return Object.assign({}, state, { turnOrder })
}

export function tools(state: ToolState, action: any): ToolState {
  if (!state) {
    return initialState;
  }

  switch (action.type) {
    case FINISH_SAVE_CHARACTER_DM_TOOL:
      return addCharacterToList(state, action.character);
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
