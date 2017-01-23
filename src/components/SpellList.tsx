import * as React from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, FormControl, Col, Row, Panel } from 'react-bootstrap';
import { AppState, SpellList, Spell } from '../interfaces';
import { spellListDispatchers } from '../redux/dispatchers';

interface SpellResults extends SpellList {
  querySpellName: (name: string) => void;
}

interface FormState {
  query: string;
}

function spellProps<T>(props: AppState<T>): SpellList {
  return props.spells;
}


const SpellListResult = (props: { spell: Spell }) => {
  // const comps: string = props.spell.components.map(s => {
  //   switch (s) {
  //     case 1: return 'V';
  //     case 2: return 'S';
  //     default: return 'M';
  //   }
  // }).join(' ');
  return (
    <Panel header={props.spell.name} className='spell-result'>
      <p>{props.spell.desc}</p>

      <Row>
        <Col className='spell-result spell-level' xs={6}>
          LVL {props.spell.level}
        </Col>
        <Col className='spell-result spell-duration' xs={6}>
          Duration: {props.spell.duration}
        </Col>
      </Row>
    </Panel>
  );
}

class SpellListContainer extends React.Component<SpellResults, FormState> {
  constructor(props: SpellResults) {
    super(props);
    this.state = {
      query: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: any) {
    this.setState({ query: e.target.value });
  }

  handleSubmit() {
    this.props.querySpellName(this.state.query);
  }

  render() {
    const spellResults = this.props.searchResults.map((e, i) => <SpellListResult key={i} spell={e} />);
    return (
      <div className='spell-list'>
        <Form horizontal>
          <FormGroup controlId='formSpellQuery'>
            <Col sm={2}>
            </Col>
            <Col sm={10}>
              <FormControl onChange={this.handleChange} value={this.state.query} type="search" placeholder="search spell by name" />
            </Col>
          </FormGroup>
          <FormGroup controlId='spellSubmit'>
            <Col smOffset={2} sm={10}>
              <FormControl type='submit' onClick={this.handleSubmit} />
            </Col>
          </FormGroup>
        </Form>
        <div className='spell-results'>
          {spellResults}
        </div>
      </div>
    );
  }
}

const SpellListComponent = connect(spellProps, spellListDispatchers)(SpellListContainer);
export default SpellListComponent;
