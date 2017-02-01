import * as React from 'react';
import { connect } from 'react-redux';
import { SavedCharacter } from '../interfaces';
import {
  Panel,
  Button,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import { characterListDispatch } from '../redux/dispatchers';
import { characterList } from '../redux/reducers/tools';
import AddCharacterModal from './AddCharacter';


type ContainerProps = {
  characters: Array<SavedCharacter>,
  addCharactersToEncounter: (characters: SavedCharacter[]) => void;
};
type ContainerState = { open: boolean, selectedCharacters: SavedCharacter[] };


class CharacterListContainer extends React.Component<ContainerProps, ContainerState> {
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
    const { open, selectedCharacters } = this.state;
    const list = this.props.characters.map((c: SavedCharacter, i: number) => {
      const isActive = selectedCharacters.find(d => d.id === c.id);
      let title = '';
      if (c.isNpc && isActive) {
        title += `x${c.count}`;
      } else if (!c.isNpc) {
        title = `(${c.characterName})`;
      }
      return (
        <ListGroupItem onClick={() => this.selectCharacter(c)} active={isActive} key={i} className='character'>
          {c.playerName} {title}
        </ListGroupItem>
      );
    });
    return (
      <div className='character-list'>
        <Panel header='Available Characters'>
          <ListGroup>
            {list}
          </ListGroup>

          <Button bsStyle='success' block onClick={() => this.setState({ open: !open, selectedCharacters })}>
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
