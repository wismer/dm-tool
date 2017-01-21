import { ToolState, AppState } from '../interfaces';
import { connect } from 'react-redux';
import * as React from 'react';

function toolProps(state: AppState): ToolState {
  return state.tools;
}

const DMToolsContainer = (props: ToolState) => {
  return (
    <div id='dm-tools'>
      tooling
    </div>
  );
}

const DMTools = connect(toolProps)(DMToolsContainer);

export default DMTools;
