import { ToolState, AppState } from '../interfaces';
import { connect } from 'react-redux';
import * as React from 'react';
import SpellList from './SpellList';
import { CharacterList } from './CharacterList';
import { Col } from 'react-bootstrap';

function toolProps<T>(state: AppState<T>): ToolState<T> {
  return state.tools;
}

const DMToolsContainer = function<T>(props: ToolState<T>) {
  return (
    <div id='dm-tools'>
      <Col xs={12} md={8}>
        <SpellList />
      </Col>
      <Col xs={6} md={4}>
        <CharacterList characters={[]} />
      </Col>
    </div>
  );
}

const DMTools = connect(toolProps)(DMToolsContainer);

export default DMTools;
