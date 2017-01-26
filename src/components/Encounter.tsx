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
import { encounterDispatch, encounterListDispatch } from '../redux/dispatchers';
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

type Enc = {
  saveEncounter: (encounter: Encounter) => void;
};

class CreateEncounterContainer extends React.Component<Enc, Encounter> {
  constructor() {
    super();
    this.state = {
      name: '',
      roster: [],
      currentTurn: 1,
      id: null,
      surpriseRound: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: any) {
    let encounter = Object.assign({}, this.state);
    encounter.name = e.target.value;
    this.setState(encounter);
  }

  render() {
    const roster = this.state.roster.map((p: CharacterState, i: number) => {
      return (
        <ListGroupItem key={i}>
          {p.playerName} ({p.characterName})
        </ListGroupItem>
      );
    });

    const { name } = this.state;


    return (
      <Form horizontal>
        <FormGroup controlId='encounterName'>
          <Col componentClass={ControlLabel} sm={4}>
            Encounter Name
          </Col>
          <Col sm={8}>
            <FormControl onChange={this.handleChange} value={name} type="text" placeholder="Name for Encounter" />
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
        <Button bsStyle='success' onClick={() => this.props.saveEncounter(this.state)} block>
          <Glyphicon glyph='plus' />
        </Button>
      </Form>
    );
  }
}


// FIXME yea yea I know this doesn't belong here.
interface EncounterDispatch {
  switchActiveEncounter: (key: number) => void;
}

const CreateEncounter = connect(() => ({}), encounterDispatch)(CreateEncounterContainer);

function CharacterStateItem(props: CharacterState) {
  return (
    <ListGroupItem>
      player: {props.playerName} | character name: {props.characterName} | HP: {props.currentHitPoints}
    </ListGroupItem>
  );
}


function EncounterItem(props: { encounter: Encounter }) {
  const { encounter } = props;
  const characters = encounter.roster.map((r: CharacterState, i: number) => {
    return <CharacterStateItem {...r} key={i} />;
  });
  return <ListGroup>{characters}</ListGroup>;
}

type EncounterListState = { open?: boolean };
class EncounterListContainer extends React.Component<EncounterListProps & EncounterDispatch, EncounterListState> {
  constructor(props: EncounterListProps) {
    super(props);
    this.state = { open: false };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(key: any) {
    this.props.switchActiveEncounter(key);
  }

  render() {
    const encounters = this.props.encounters.map((e: Encounter, i: number) => {
      return (
        <Panel key={i} header={e.name} eventKey={e.id}>
          <EncounterItem encounter={e} key={i} />
        </Panel>
      );
    });
    return (
      <div>
        <Col xs={8}>
          <Button block onClick={() => this.setState({ open: !this.state.open })}>
            Create Encounter
          </Button>
          <Panel collapsible expanded={this.state.open}>
            <CreateEncounter />
          </Panel>
          <PanelGroup activeKey={this.props.activeEncounter} accordion onSelect={this.handleSelect}>
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

const EncounterList = connect(encounterListProps, encounterListDispatch)(EncounterListContainer);
export default EncounterList;
