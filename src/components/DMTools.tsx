import { ToolState, AppState, ToolChoice } from '../interfaces';
import { connect } from 'react-redux';
import * as React from 'react';
import SpellList from './SpellList';
import { CharacterList } from './CharacterList';
import EncounterList from './EncounterList';
import { Nav, NavItem, Col, Grid, Panel } from 'react-bootstrap';
import { toolDispatch } from '../redux/dispatchers';

function toolProps(state: AppState): ToolState {
  return state.tools;
}

interface ToolChoiceProp extends ToolState {
  changeTool: (tool: ToolChoice) => void;
}

const DMToolsContainer = function(props: ToolChoiceProp) {
  let content;

  if (props.activeTool === ToolChoice.SpellLookup) {
    content = <SpellList />;
  } else if (props.activeTool === ToolChoice.Encounter) {
    content = (
      <EncounterList />
    );
  } else {
    content = <div>intentionally left blank</div>;
  }

  return (
    <div id='dm-tools'>
      <Grid fluid={true}>
        <Col xs={2}>
          <Panel>
            <Nav bsStyle="pills" stacked activeKey={props.activeTool}>
              <NavItem onSelect={() => props.changeTool(ToolChoice.Encounter)} eventKey={1}>Create Encounter</NavItem>
              <NavItem onSelect={() => props.changeTool(ToolChoice.SpellLookup)} eventKey={2}>Lookup Spell</NavItem>
              <NavItem onSelect={() => props.changeTool(ToolChoice.Other)} eventKey={3}>Other</NavItem>
            </Nav>
          </Panel>
        </Col>

        <Col xs={6}>
          <Panel>
            {content}
          </Panel>
        </Col>

        <Col xs={4}>
          <CharacterList />
        </Col>
      </Grid>
    </div>
  );
}

const DMTools = connect(toolProps, toolDispatch)(DMToolsContainer);

export default DMTools;
