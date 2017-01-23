import { ToolState, Tool, TurnOrder } from '../../interfaces';
import {
  // INIT_SAVE_CHARACTER_DM_TOOL,
  FINISH_SAVE_CHARACTER_DM_TOOL
} from '../actions';

const initialTool: TurnOrder = {
  players: [],
  enemies: [],
  order: [],
  name: 'Turn Order'
};
const initialState: ToolState<Tool> = {
  tools: [initialTool],
  activeTools: [initialTool]
};

function addCharacterToList(state: ToolState<Tool>, character: any): ToolState<Tool> {
  let activeTool = state.activeTools[0];

  activeTool = Object.assign({}, activeTool, {
    players: [...activeTool.players, character],
  });

  return Object.assign({}, state, { activeTools: [activeTool] })
}

export function tools(state: ToolState<Tool>, action: any): ToolState<Tool> {
  if (!state) {
    return initialState;
  }

  switch (action.type) {
    case FINISH_SAVE_CHARACTER_DM_TOOL:
      return addCharacterToList(state, action.character);
    default: return state;
  }
}
