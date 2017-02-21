import * as React from 'react';
import { connect } from 'react-redux';
import {
  Col,
  ListGroupItem,
  ListGroup,
} from 'react-bootstrap';
import { SavedCharacter } from '../interfaces';
import { characterListDispatch } from '../redux/dispatchers';
import {
  CharacterListDispatchProps,
  CharacterListProps,
  AppState,
} from '../interfaces';

function characterListProps(state: AppState, props: any): CharacterListProps {
  return {
    characters: props.characters,
    activeIdx: props.activeIdx
  };
}

const CharacterList = (props: CharacterListDispatchProps) => {
  const list = props.characters.map((c: SavedCharacter, i: number) => {
    let name = c.isNpc ? c.characterName : `${c.characterName} (${c.playerName})`;
    return (
      <ListGroupItem onClick={() => (fromList: boolean) => props.onCharSelect(c, fromList)} key={i} active={i === props.activeIdx}>
        <Col xs={6}>{name}</Col>
        <Col xs={4}>HP: {c.maxHitPoints}</Col>
      </ListGroupItem>
    );
  });

  return (
    <div className='character-list'>
      <ListGroup>{list}</ListGroup>
    </div>
  );
};

export default connect(characterListProps, characterListDispatch)(CharacterList);
