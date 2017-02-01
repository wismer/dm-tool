import * as React from 'react';
import { connect } from 'react-redux';
import {
  ListGroup,
  Panel,
  ListGroupItem,
  Form,
  FormGroup,
  Checkbox,
  Col,
  Button,
  FormControl,
  ControlLabel,
  Glyphicon
} from 'react-bootstrap';
import { encounterDispatch } from '../redux/dispatchers';
import { createEncounterProps } from '../redux/reducers/tools';

import {
  EncounterCreationProps,
  CharDesc
} from '../interfaces';


function Character(props: CharDesc) {
  const name = props.isNpc ? `${props.characterName} x${props.count}` : `${props.characterName} (${props.playerName})`;
  return (
    <ListGroupItem>
      {name}
      <span className='init-roll'>
        initiative: {props.initiativeRoll} | (+{props.initiative})
       {props.children}
      </span>
    </ListGroupItem>
  );
}

function CreateEncounterContainer(props: EncounterCreationProps) {
  const players = props.players.map((c, i) => {
    const input = (
      <input onKeyDown={(e: any) => {
        if (e.key === 'Enter') {
          props.updateEncounter('init', { c, v: e.target.value });
        }
      }} type='number' />
    );
    return (
      <Character {...c} key={i}>
        {c.initiativeRoll ? '' : input}
      </Character>
    );
  });
  const enemies = props.enemies.map((c, i) => {
    const input = (
      <input onKeyDown={(e: any) => {
        if (e.key === 'Enter') {
          props.updateEncounter('init', { c, v: e.target.value });
        }
      }} type='number' />
    );
    return (
      <Character {...c} key={i}>
        <Button onClick={() => props.updateEncounter('init', {c})}>
          Roll initiative
        </Button>
        {c.initiativeRoll ? '' : input}
      </Character>
    );
  });
  return (
    <div>
      <Form horizontal>
        <FormGroup controlId='encounterName'>
          <Col componentClass={ControlLabel} sm={4}>
            Encounter Name
          </Col>
          <Col sm={8}>
            <FormControl
              onChange={(e: any) => {
                props.updateEncounter('name', { v: e.target.value });
              }}
              type="text" placeholder="Name for Encounter" />
          </Col>
        </FormGroup>
        <FormGroup controlId='surpriseRound'>
          <Col componentClass={ControlLabel} sm={4}>
            Surprise Round?
          </Col>
          <Col sm={8}>
            <Checkbox onChange={(e: any) => props.updateEncounter('surpriseRound', {v: e.target.value})} />
          </Col>
        </FormGroup>
        <Button bsStyle='success' onClick={() => props.saveEncounter()} block>
          <Glyphicon glyph='plus' />
        </Button>
      </Form>


      <Panel header='Players'>
        <ListGroup>
          {players}
        </ListGroup>
      </Panel>

      <Panel header='Enemies / NPCs'>
        <ListGroup>
          {enemies}
        </ListGroup>
      </Panel>

      <Button>Roll Initiative</Button>
    </div>
  );
}

const CreateEncounter = connect(createEncounterProps, encounterDispatch)(CreateEncounterContainer);
export default CreateEncounter;
