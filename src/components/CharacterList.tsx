import * as React from 'react';
import { connect } from 'react-redux';
import {
  Col,
  ListGroupItem,
  ListGroup,
} from 'react-bootstrap';
// import AddCharacter from './AddCharacter';
import { SavedCharacter } from '../interfaces';
import { characterListDispatch } from '../redux/dispatchers';
import { characterListProps } from '../redux/reducers/tools';
import {
  CharacterListDispatchProps
} from '../interfaces';

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
