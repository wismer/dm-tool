import * as React from 'react';
import { Col, Row, Panel, Pagination } from 'react-bootstrap';
import { SpellSearchResults, Spell, FormState } from '../interfaces';


interface SpellListProps extends SpellSearchResults, FormState {
  handleChange: (e: any) => void;
  spellQuery: string;
  page: number;
  children?: any;
}
type SpellProps = Spell & { pageBreak: string };
const SpellListResult = (props: SpellProps) => {
  return (
    <Panel id={props.pageBreak} header={props.name} className='spell-result'>
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
  const { page } = props;
  const spellResults = props.results.map((e: Spell, i: number) => {
    return <SpellListResult pageBreak={i % 20 === 0 ? `p${i / 20}` : ''} key={i} {...e} />
  });
  return (
    <div className='spell-list'>
      <div className='search-opts'>
        {props.children}
      </div>

      <div className='spell-results'>
        {spellResults}
      </div>

      <Pagination items={page} />
    </div>
  );
}
