export interface Tool {
  name: string;
}

export interface ToolState {
  activeTools: Array<Tool>;
  tools: Array<Tool>;
}

const initialState: ToolState = {
  tools: [
    {
      name: 'Spell Lookup'
    },
    {
      name: 'Turn Order'
    },
    {
      name: 'Status Tracker'
    }
  ],
  activeTools: []
};

export function tools(state: ToolState, action: any): ToolState {
  if (!state) {
    return initialState;
  }

  return state;
}
