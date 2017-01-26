import * as React from 'react';
import { connect } from 'react-redux';
import { Character, AddCharacterState } from '../interfaces';
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel,
  Panel,
  Button,
  Glyphicon,
  ListGroup,
  ListGroupItem,
  Checkbox
} from 'react-bootstrap';
import { addCharacterDispatch, characterListDispatch } from '../redux/dispatchers';
import { characterList, addCharacterProps } from '../redux/reducers/tools';

interface SavedCharacter extends Character {
  id: number;
}
type ContainerProps = {
  characters: Array<SavedCharacter>,
  addCharactersToEncounter: (characterIDs: number[]) => void;
};
type ContainerState = { open: boolean, selectedCharacters: number[] };
interface CharacterProps {
  saveCharacter: (character: Character) => void;
  isOpen: boolean;
}

class AddCharacterModalContainer extends React.Component<CharacterProps, AddCharacterState> {
  constructor() {
    super();
    this.state = {
      character: {
        playerName: '',
        characterName: '',
        id: null,
        armorClass: 8,
        toHit: 2,
        passiveWisdom: 8,
        initiative: 8,
        conditions: [],
        currentHitPoints: 8,
        maxHitPoints: 8,
        isNpc: false
      },
      open: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps: { isOpen: boolean }) {
    if (!nextProps.isOpen) {
      this.setState({
        character: {
          playerName: '',
          characterName: '',
          id: null,
          armorClass: 8,
          toHit: 2,
          passiveWisdom: 8,
          initiative: 8,
          conditions: [],
          currentHitPoints: 8,
          maxHitPoints: 8,
          isNpc: false
        }
      })
    }
  }

  handleChange(e: any) {
    const character = this.state.character;
    character[e.target.id] = e.target.value;
    this.setState({ character });
  }

  render() {
    const { character } = this.state;
    return (
      <Form horizontal>
        <FormGroup controlId='playerName'>
          <Col componentClass={ControlLabel} sm={4}>
            Player's Name
          </Col>
          <Col sm={8}>
            <FormControl onChange={this.handleChange} value={character.playerName} type="text" placeholder="Player's Name" />
          </Col>
        </FormGroup>
        <FormGroup controlId='characterName'>
          <Col componentClass={ControlLabel} sm={4}>
            Characters's Name
          </Col>

          <Col sm={8}>
            <FormControl onChange={this.handleChange} value={character.characterName} type="text" placeholder="Characters Name" />
          </Col>
        </FormGroup>
        <FormGroup controlId='armorClass'>
          <Col componentClass={ControlLabel} sm={4}>
            AC
          </Col>

          <Col sm={4}>
            <FormControl onChange={this.handleChange} value={character.armorClass} type="number" placeholder="AC" />
          </Col>
        </FormGroup>
        <FormGroup controlId='toHit'>
          <Col componentClass={ControlLabel} sm={4}>
            To Hit
          </Col>

          <Col sm={4}>
            <FormControl onChange={this.handleChange} value={character.toHit} type="text" placeholder="To Hit" />
          </Col>
        </FormGroup>
        <FormGroup controlId='passiveWisdom'>
          <Col componentClass={ControlLabel} sm={4}>
            Passive Wisdom (perception)
          </Col>

          <Col sm={4}>
            <FormControl onChange={this.handleChange} value={character.passiveWisdom} type="text" placeholder="Passive Wisdom" />
          </Col>
        </FormGroup>
        <FormGroup controlId='initiative'>
          <Col componentClass={ControlLabel} sm={4}>
            Initiative
          </Col>

          <Col sm={4}>
            <FormControl onChange={this.handleChange} value={character.initiative} type="text" placeholder="Initiative" />
          </Col>
        </FormGroup>

        <FormGroup controlId='currentHitPoints'>
          <Col componentClass={ControlLabel} sm={4}>
            Hit Points (HP)
          </Col>

          <Col sm={4}>
            <FormControl onChange={this.handleChange} value={character.currentHitPoints} type="text" placeholder="Hit Points" />
          </Col>
        </FormGroup>

        <FormGroup controlId='maxHitPoints'>
          <Col componentClass={ControlLabel} sm={4}>
            Hit Points (HP)
          </Col>

          <Col sm={4}>
            <FormControl onChange={this.handleChange} value={character.maxHitPoints} type="text" placeholder="Hit Points" />
          </Col>
        </FormGroup>

        <FormGroup controlId='isNpc'>
          <Col componentClass={ControlLabel} sm={4}>
            NPC?
          </Col>
          <Col sm={8}>
            <Checkbox checked={character.isNpc} />
          </Col>
        </FormGroup>


        <Button bsStyle='success' onClick={() => this.props.saveCharacter(this.state.character)} block>
          <Glyphicon glyph='plus' />
        </Button>
      </Form>
    );
  }
}

const AddCharacterModal = connect(addCharacterProps, addCharacterDispatch)(AddCharacterModalContainer);

class CharacterListContainer extends React.Component<ContainerProps, ContainerState> {
  constructor(props: ContainerProps) {
    super(props);
    this.state = { open: false, selectedCharacters: [] };
    this.selectCharacter = this.selectCharacter.bind(this);
    this.saveCharactersToEncounter = this.saveCharactersToEncounter.bind(this);
  }

  saveCharactersToEncounter() {
    const { selectedCharacters, open } = this.state;
    this.props.addCharactersToEncounter(selectedCharacters);
    this.setState({ selectedCharacters: [], open });
  }

  selectCharacter(id: number) {
    let { selectedCharacters, open } = this.state;
    if (selectedCharacters.indexOf(id) > -1) {
      selectedCharacters = selectedCharacters.filter(char => char !== id);
    } else {
      selectedCharacters.push(id);
    }

    this.setState({ open, selectedCharacters });
  }

  render() {
    const { selectedCharacters } = this.state;
    const list = this.props.characters.map((c: SavedCharacter, i: number) => {
      const isActive = selectedCharacters.indexOf(c.id) > -1;
      return (
        <ListGroupItem onClick={() => this.selectCharacter(c.id)} active={isActive} key={i} className='character'>
          {c.playerName} ({c.characterName})
        </ListGroupItem>
      );
    })
    return (
      <div className='character-list'>
        <Panel header='Characters In Encounter'>
          <ListGroup>
            {list}
          </ListGroup>
          <Button bsStyle='success' block onClick={() => this.setState({ open: !this.state.open, selectedCharacters: this.state.selectedCharacters })}>
            Add Character
          </Button>

          <Button bsStyle='success' block onClick={this.saveCharactersToEncounter}>
            Add Selected to current Encounter
          </Button>
        </Panel>

        <Panel collapsible expanded={this.state.open}>
          <AddCharacterModal isOpen={this.state.open} />
        </Panel>
      </div>
    );
  }
}

export const CharacterList = connect(characterList, characterListDispatch)(CharacterListContainer);
