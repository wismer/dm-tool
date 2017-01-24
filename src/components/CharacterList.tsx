import * as React from 'react';
import { connect } from 'react-redux';
import { Character, AddCharacterState } from '../interfaces';
import { Form, FormGroup, FormControl, Col, ControlLabel, Panel, Button, Glyphicon } from 'react-bootstrap';
import { characterListDispatch } from '../redux/dispatchers';
import { characterList, addCharacterProps } from '../redux/reducers/tools';

type ContainerProps = { characters: Array<Character> };
type ContainerState = { open: boolean };
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

        <Button bsStyle='success' onClick={() => this.props.saveCharacter(this.state.character)} block>
          <Glyphicon glyph='plus' />
        </Button>
      </Form>
    );
  }
}

const AddCharacterModal = connect(addCharacterProps, characterListDispatch)(AddCharacterModalContainer);

class CharacterListContainer extends React.Component<ContainerProps, ContainerState> {
  constructor(props: ContainerProps) {
    super(props);
    this.state = { open: false };
  }

  render() {
    const list = this.props.characters.map((c: Character, i: number) => {
      return (
        <div key ={i} className='character'>
          {c.playerName} ({c.characterName})
        </div>
      );
    })
    return (
      <div className='character-list'>
        <Panel header='Characters In Encounter'>
          {list}
          <Button bsStyle='success' block onClick={() => this.setState({ open: !this.state.open })}>
            Add Character
          </Button>
        </Panel>

        <Panel collapsible expanded={this.state.open}>
          <AddCharacterModal isOpen={this.state.open} />
        </Panel>
      </div>
    );
  }
}

export const CharacterList = connect(characterList)(CharacterListContainer);
