import * as React from 'react';
import { connect } from 'react-redux';
import { SavedCharacter } from '../interfaces';
import {
  Panel,
  Row,
  // Button,
  Col,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import { characterListDispatch } from '../redux/dispatchers';
import { characterList } from '../redux/reducers/tools';
import AddCharacter from './AddCharacter';


type ContainerProps = {
  characters: Array<SavedCharacter>;
  filter: null | string;
  addCharactersToEncounter: (characters: SavedCharacter[]) => void;
  onCharSelect: (char: SavedCharacter, fromList: boolean) => void;
  activeIdx: number;
};
type ContainerState = { open: boolean, selectedCharacters: SavedCharacter[] };


class CharacterListView extends React.Component<ContainerProps, ContainerState> {
  constructor(props: ContainerProps) {
    super(props);
    this.state = { open: false, selectedCharacters: [] };
    this.selectCharacter = this.selectCharacter.bind(this);
    this.saveCharactersToEncounter = this.saveCharactersToEncounter.bind(this);
  }

  saveCharactersToEncounter() {
    this.props.addCharactersToEncounter(this.state.selectedCharacters);
    this.setState({ selectedCharacters: [], open: true });
  }

  selectCharacter(character: SavedCharacter) {
    let { selectedCharacters, open } = this.state;
    let charWithId = selectedCharacters.find(c => c.id === character.id);
    if (charWithId && charWithId.isNpc) {
      charWithId.count += 1;
    } else if (!charWithId) {
      selectedCharacters.push(character);
    }

    this.setState({ open, selectedCharacters });
  }

  render() {
    const list = this.props.characters.map((c: SavedCharacter, i: number) => {
      return (
        <ListGroupItem onClick={() => this.props.onCharSelect(c, !this.props.filter)} key={i} className='character' active={i === this.props.activeIdx}>
          <Col xs={6}>{c.name} {c.isNpc ? '(NPC)' : `(${c.name})`} {this.props.filter ? `init: +${c.initiativeRoll || 0}` : ''}</Col>
          <Col xs={4}>HP: {c.currentHitPoints}</Col>
        </ListGroupItem>
      );
    });

    return (
      <Col className='character-list'>
        <Col xs={6}><ListGroup>{list}</ListGroup></Col>
        {this.props.children ? <Col xs={6}>{this.props.children}</Col> : ''}
      </Col>
    );
  }
}

export const CharacterListContainer = (props: any) => {
  return (
    <div>
      <Row>
        <Col xs={12}>
          <AddCharacter />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Panel header='NPCS'>
            <CharacterList filter='npcs' />
          </Panel>
        </Col>
        <Col xs={6}>
          <Panel header='Player Characters'>
            <CharacterList filter='players' />
          </Panel>
        </Col>
      </Row>
    </div>
  );
}

export const CharacterList = connect(characterList, characterListDispatch)(CharacterListView);
