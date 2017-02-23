import * as React from 'react';
// import { connect } from 'react-redux';
import { Form, FormGroup, FormControl, Col, Row, Panel } from 'react-bootstrap';
import { SpellSearchResults, Spell, FormState } from '../interfaces';
// import { spellListDispatchers } from '../redux/dispatchers';


interface SpellListProps extends SpellSearchResults, FormState {
  handleChange: (e: any) => void;
  spellQuery: string;
}
//
// function spellProps(state: AppState, props: any): SpellSearchResults {
//   const { spells: spellState } = state;
//   const spells = spellState.spells.map(id => spellState.spellsById[id]);
//   const results = props.query
//     ? spells.filter((spell: Spell) => new RegExp(props.query, 'i').exec(spell.name))
//     : spells;
//   return {
//     results,
//     querySpellName: props.querySpellName,
//     spellQuery: spellState.spellQuery
//   };
// }


const SpellListResult = (props: { spell: Spell }) => {
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

export default function SpellListContainer(props: SpellListProps) {
  const spellResults = props.results.map((e, i) => <SpellListResult key={i} spell={e} />);
  return (
    <div className='spell-list'>
      <Form horizontal>
        <FormGroup controlId='formSpellQuery'>
          <Col sm={2}>
          </Col>
          <Col sm={10}>
            <FormControl onChange={e => props.handleChange(e.target)} value={props.spellQuery} type="search" placeholder="search spell by name" />
          </Col>
        </FormGroup>
      </Form>
      <div className='spell-results'>
        {spellResults}
      </div>
    </div>
  );
}

// const SpellListComponent = connect(spellProps, spellListDispatchers)(SpellListContainer);
// export default SpellListComponent ;
