import * as React from 'react';
import { connect } from 'react-redux';
import { Query, SavedCharacter, QueryProps } from '../interfaces';
import { characterQueryDispatch } from '../redux/dispatchers';
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel,
} from 'react-bootstrap';
// import CharacterList from './CharacterList';
import * as api from '../api';

class CharacterQueryContainer extends React.Component<QueryProps, Query> {
  constructor() {
    super();
    this.state = { name: '', npcsOnly: false };
    this.onNameChange = this.onNameChange.bind(this);
  }

  onNameChange(input: HTMLInputElement) {
    console.log("INPUT", '   =-----===--- >   ', input.value);
    this.query(input.value).then((characters: SavedCharacter[]) => {
      this.props.receiveSearchResults(characters);
      this.setState((prevState: Query) => {
        return Object.assign({}, prevState, { name: input.value });
      });
    });
  }

  query(name?: string) {
    let queryString = '';
    if (name) {
      queryString += `?name=${name}&is_npc=${this.state.npcsOnly}`;
    }
    return api.getCharacters(queryString);
  }

  componentDidMount() {
    this.query();
  }

  render() {
    return <CharacterQuery {...this.props} onNameChange={this.onNameChange} />;
  }
}

function CharacterQuery(props: any) {
  return (
    <Form inline>
      <FormGroup controlId='query'>
        <Col xs={4} componentClass={ControlLabel}>
          Search Available Characters
        </Col>

        <Col xs={8}>
          <FormControl type="text" onChange={e => props.onNameChange(e.target)} placeholder="Search by Name" />
        </Col>
      </FormGroup>
    </Form>
  );
}

export default connect(() => ({}), characterQueryDispatch)(CharacterQueryContainer);
