import * as React from 'react';
import { Form, FormGroup, FormControl, Col, Row, Panel } from 'react-bootstrap';
import { SpellSearchResults, Spell, FormState } from '../interfaces';


interface SpellListProps extends SpellSearchResults, FormState {
  handleChange: (e: any) => void;
  spellQuery: string;
}

const SpellListResult = (props: Spell) => {
  return (
    <Panel header={props.name} className='spell-result'>
      <p>
        {props.desc}
      </p>

      <Row>
        <Col className='spell-result spell-level' xs={6}>
          LVL {props.level}
        </Col>
        <Col className='spell-result spell-duration' xs={6}>
          Duration: {props.duration}
        </Col>
      </Row>
    </Panel>
  );
}

export default function SpellListContainer(props: SpellListProps) {
  const spellResults = props.results.map((e: Spell, i: number) => <SpellListResult key={i} {...e} />);
  return (
    <div className='spell-list'>
      <Form horizontal>
        <FormGroup controlId='formSpellQuery'>
          <Col sm={2}>
          </Col>
          <Col sm={10}>
            <FormControl onChange={e => props.handleChange(e.target)} type="search" placeholder="search spell by name" />
          </Col>
        </FormGroup>
      </Form>
      <div className='spell-results'>
        {spellResults}
      </div>
    </div>
  );
}
