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

class CharacterList extends React.Component<CharacterListDispatchProps, undefined> {
  componentDidMount() {
    if (!this.props.children) {
      this.props.fetchCharacters();
    }
  }

  render() {
    return <List {...this.props} />
  }
}

const List = (props: any) => {
  const list = props.characters.map((c: SavedCharacter, i: number) => {
    let name = c.isNpc ? c.characterName : `${c.characterName} (${c.playerName})`;
    return (
      <ListGroupItem onClick={() => props.selectCharacter(c)} key={i} active={i === props.activeIdx}>
        <Col xs={6}>{name}</Col>
        <Col xs={4}>HP: {c.maxHitPoints}</Col>
      </ListGroupItem>
    );
  });

  return (
    <div className='character-list'>
      <ListGroup>{list}</ListGroup>
      {props.children ? <Col xs={6}>{props.children}</Col> : ''}
    </div>
  );
};

export default connect(characterListProps, characterListDispatch)(CharacterList);
