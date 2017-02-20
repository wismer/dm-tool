import * as React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  FormGroup,
  Checkbox,
  Col,
  Row,
  Button,
  FormControl,
  ControlLabel,
  Glyphicon,
  Modal
} from 'react-bootstrap';
import { encounterDispatch } from '../redux/dispatchers';
import { createEncounterProps } from '../redux/reducers/encounter';
import {
  EncounterCreationProps,
  CharacterState,
  Encounter,
  EncounterFormState,
} from '../interfaces';
import CharacterQuery from './CharacterQuery';
import CharacterList from './CharacterList';



type EncounterDispatch = { saveEncounter: (encounter: Encounter) => void };

class CreateEncounterForm extends React.Component<EncounterCreationProps & EncounterDispatch, EncounterFormState> {
  constructor() {
    super();
    this.state = {
      players: [],
      npcs: [],
      openModal: false,
      currentChar: null,
      surpriseRound: false,
      name: '',
    };
    this.onCharSelect = this.onCharSelect.bind(this);
    this.close = this.close.bind(this);
    this.onChange = this.onChange.bind(this);
    this.updateInit = this.updateInit.bind(this);
  }

  onChange(field: string, value: number | string | boolean) {
    const state = this.state;
    state[field] = value;
    this.setState(state);
  }

  updateInit(n: number) {
    let { players, npcs, currentChar, name, surpriseRound } = this.state;
    this.setState({
      players: players.map(c => {
        if (c.character === currentChar) {
          c.initiativeRoll = n;
        }
        return c;
      }),
      npcs: npcs.map(c => {
        if (c.character === currentChar) {
          c.initiativeRoll = n;
        }
        return c;
      }),
      currentChar: null,
      openModal: false,
      name, surpriseRound
    });
  }

  onCharSelect(char: CharacterState, fromList: boolean) {
    let {players, npcs, surpriseRound, name} = this.state;
    if (fromList && char.isNpc) {
      npcs = [...npcs, char];
    } else if (fromList) {
      players = [...players, char];
    } else if (char.isNpc) {
      npcs = npcs.filter(c => c.id !== char.id);
    } else {
      players = players.filter(c => c.id !== char.id);
    }

    this.setState({ surpriseRound, name, openModal: fromList, npcs, players, currentChar: char.id || null });
  }

  close() {
    this.setState({
      name: this.state.name,
      surpriseRound: this.state.surpriseRound,
      players: this.state.players,
      npcs: this.state.npcs,
      openModal: false,
      currentChar: null
    });
  }


  saveEncounter() {
    const { name, npcs, players, surpriseRound } = this.state;
    this.props.saveEncounter({
      name,
      roster: npcs.concat(players),
      currentTurn: 1,
      id: null,
      surpriseRound
    });
  }

  render() {
    const { npcs, players } = this.state;
    let buttons = [];
    for (let i = -5; i < 30; i++) {
      buttons.push(<Button key={i} onClick={() => this.updateInit(i)}>{i}</Button>);
    }
    return (
      <CreateEncounterContainer {...this.props} onChange={this.onChange} onCharSelect={this.onCharSelect} npcs={npcs} players={players}>
        <Button bsStyle='success' block onClick={() => this.saveEncounter()}>
          <Glyphicon glyph='plus' />
        </Button>
        <Modal show={this.state.openModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Initiative</Modal.Title>

            <Modal.Body>
              {buttons}
            </Modal.Body>
          </Modal.Header>
        </Modal>

        <CharacterList characters={npcs} onCharSelect={this.onCharSelect.bind(this, false)} />
        <CharacterList characters={players} onCharSelect={this.onCharSelect.bind(this, false)} />
      </CreateEncounterContainer>
    );
  }
}

function CreateEncounterContainer(props: EncounterCreationProps) {
  return (
    <div>
      <Col xs={8}>
        <Row>
          <Form horizontal>
            <FormGroup controlId='encounterName'>
              <Col componentClass={ControlLabel} sm={4}>
                Encounter Name
              </Col>
              <Col sm={8}>
                <FormControl onChange={(e: any) => props.onChange('name', e.target.value)} type="text" placeholder="Name for Encounter" />
              </Col>
            </FormGroup>
            <FormGroup controlId='surpriseRound'>
              <Col componentClass={ControlLabel} sm={4}>
                Surprise Round?
              </Col>
              <Col sm={8}>
                <Checkbox onClick={(e: any) => props.onChange('surpriseRound', e.target.checked)} />
              </Col>
            </FormGroup>
          </Form>
          </Row>
          <Row>
            {props.children}
          </Row>
        </Col>

      <Col xs={4}>
        <CharacterQuery />
        <CharacterList characters={props.characters} onCharSelect={props.onCharSelect} />
      </Col>
    </div>
  );
}

export default connect(createEncounterProps, encounterDispatch)(CreateEncounterForm);
