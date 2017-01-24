import { connect } from 'react-redux';
import * as React from 'react';
import { CharacterState, Encounter, EncounterListProps } from '../interfaces';
import {
  ListGroup,
  Glyphicon,
  Form,
  FormGroup,
  FormControl,
  ListGroupItem,
  Panel,
  PanelGroup,
  Col,
  Button,
  ControlLabel
} from 'react-bootstrap';
import { encounterListProps } from '../redux/reducers/tools';
/*
ENCOUNTER
  name - text
  surprise_round - checkbox

  option to add pre-existing characters...

  which needs...

  the current character list (like an option to ADD)
  then fields for the character state...
    initiative_roll -> number,
    was_surprised -> checkbox
    readied_action -> checkbox,
    current_hp -> character.maxHitPoints (default)
    conditions (TODO later)

  but that is optional.

  active panel, on click expands.

  sorted by date.
  <Encounter />
  <Encounter />
  <Encounter active />
  <Encounter />
  <Encounter />
  <Encounter />
  <Encounter />
*/

function CharacterEncounterItem(props: CharacterState) {
  return (
    <ListGroupItem>
      {props.playerName} ({props.characterName})
    </ListGroupItem>
  );
}

class CreateEncounterContainer extends React.Component<undefined, Encounter> {
  constructor() {
    super();
    this.state = {
      name: '',
      roster: [],
      currentTurn: 1,
      id: null,
      surpriseRound: false
    };
  }

  render() {
    const roster = this.state.roster.map((p: CharacterState, i: number) => {
      return (
        <CharacterEncounterItem key={i} {...p} />
      );
    });

    const { name } = this.state;


    return (
      <Form horizontal>
        <FormGroup controlId='encounterName'>
          <Col componentClass={ControlLabel} sm={4}>
            Player's Name
          </Col>
          <Col sm={8}>
            <FormControl value={name} type="text" placeholder="Player's Name" />
          </Col>
        </FormGroup>
        <FormGroup controlId='roster'>
          <Col componentClass={ControlLabel} sm={4}>
            Characters's Name
          </Col>

          <Col sm={8}>
            <ListGroup>{roster}</ListGroup>
          </Col>
        </FormGroup>
        <Button bsStyle='success' onClick={() => {}} block>
          <Glyphicon glyph='plus' />
        </Button>
      </Form>
    );
  }
}

class EncounterListContainer extends React.Component<EncounterListProps, {open: boolean}> {
  constructor(props: EncounterListProps) {
    super(props);
    this.state = { open: false };
  }

  render() {
    const encounters = this.props.encounters.map((e: Encounter, i: number) => {
      return (
        <Panel key={i} header={e.name} eventKey={e.id}>{e.roster.length}</Panel>
      );
    });
    return (
      <div>
        <Col xs={8}>
          <Button block onClick={() => this.setState({ open: !this.state.open })}>
            Create Encounter
          </Button>
          <Panel collapsible expanded={this.state.open}>
            <CreateEncounterContainer />
          </Panel>
          <PanelGroup activeKey={this.props.activeEncounter}>
            {encounters}
          </PanelGroup>
        </Col>

        <Col xs={4}>
          {this.props.children}
        </Col>
      </div>
    );
  }
}

const EncounterList = connect(encounterListProps)(EncounterListContainer);
export default EncounterList;
