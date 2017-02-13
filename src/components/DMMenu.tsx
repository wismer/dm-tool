import * as React from 'react';
import {
  Panel,
  Nav,
  NavItem
} from 'react-bootstrap';
import { ToolChoice } from '../interfaces';

const DMMenu = (props: any) => {
  return (
    <Panel>
      <Nav bsStyle="pills" stacked activeKey={props.activeTool}>
        <NavItem
          onSelect={() => props.changeTool(ToolChoice.Encounter)}
          eventKey={1}>
            Create Encounter
        </NavItem>
        <NavItem
          onSelect={() => props.changeTool(ToolChoice.SpellLookup)}
          eventKey={2}>
            Lookup Spell
        </NavItem>
        <NavItem
          onSelect={() => props.changeTool(ToolChoice.Other)}
          eventKey={3}>
            Other
        </NavItem>
      </Nav>
    </Panel>
  );
};

export default DMMenu;
