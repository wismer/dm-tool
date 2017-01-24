import { ToolState, AppState, ToolChoice } from '../interfaces';
import { connect } from 'react-redux';
import * as React from 'react';
import SpellList from './SpellList';
import { CharacterList } from './CharacterList';
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
    content = <CharacterList />;
  } else {
    content = <div></div>;
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

        <Col xs={8}>
          <Panel>
            {content}
          </Panel>
        </Col>
      </Grid>
    </div>
  );
}

const DMTools = connect(toolProps, toolDispatch)(DMToolsContainer);

export default DMTools;
