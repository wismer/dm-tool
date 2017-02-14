import * as React from 'react';
import {
  Col,
} from 'react-bootstrap';
import AddCharacter from './AddCharacter';
import CharacterList from './CharacterList';


type ViewState = {
  displayDetail: boolean;
}

export default class CharacterView extends React.Component<undefined, ViewState> {
  constructor() {
    super();
    this.state = { displayDetail: false };
  }
  render() {
    return (
      <Col>
        <Col xs={6}>
          <AddCharacter />
        </Col>
        <Col xs={6}>
          <CharacterList />
        </Col>
      </Col>
    );
  }
}
