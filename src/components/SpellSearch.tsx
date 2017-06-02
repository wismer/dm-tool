import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, FormGroup, Checkbox, Col } from 'react-bootstrap';
import { AppState, SpellSearchResults, Spell, SpellFilter, SpellFilterState } from '../interfaces';
import { spellListDispatchers } from '../redux/dispatchers';
import SpellList from './SpellList';
import { SPELLSCHOOLS } from '../constants';

interface SchoolFilter extends SpellFilter {
  onClick: (item: SpellFilter) => void;
}

function spellProps(state: AppState, props: any): SpellSearchResults {
  const { spells: spellState } = state;
  const results = spellState.items.map(id => spellState.itemsById[id]);
  const { spellQuery, activeSchools, activeLevels } = spellState;
  let filterState: SpellFilterState = SpellFilterState.NONE;

  let fns = {
    query: (s: Spell) => true,
    level: (s: Spell) => true,
    school: (s: Spell) => true
  };

  if (spellQuery.length) {
    filterState |= SpellFilterState.NAME;
    fns.query = (s: Spell) => new RegExp(spellQuery).test(s.name);
  }

  if (activeSchools.length) {
    filterState |= SpellFilterState.SCHOOL;
    fns.school = (s: Spell) => activeSchools.indexOf(s.school) > -1;
  }

  if (activeLevels.length) {
    filterState |= SpellFilterState.LEVEL;
    fns.level = (s: Spell) => activeLevels.indexOf(s.level) > -1;
  }

  let filterFn = (s: Spell) => fns.query(s) && fns.level(s) && fns.school(s);

  return {
    results: !filterState ? results : results.filter(filterFn),
    querySpellName: props.querySpellName,
    spellQuery: spellQuery,
    onSchoolFilterToggle: props.onSchoolFilterToggle,
    onSpellLevelChange: props.onSpellLevelChange,
    schools: SPELLSCHOOLS.map(school => {
      return {
        school,
        active: activeSchools.indexOf(school) > -1
      };
    })
  };
}

function SchoolFilterToggle(props: SchoolFilter) {
  const { school, active, onClick } = props;
  const className = active ? 'spell-toggle school-filter-active' : 'spell-toggle';
  return (
    <div className={className} onClick={() => onClick({ school, active })}>{school}</div>
  );
}

type Slice = { slice: number, detach: boolean };

class SpellQuery extends React.Component<SpellSearchResults, Slice> {
  constructor(props: SpellSearchResults) {
    super(props);
    this.state = { slice: 20, detach: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleFilterToggle = this.handleFilterToggle.bind(this);
  }

  input: HTMLInputElement;
  handleScroll() {
    // TODO: A way to handle scrolling back up and maybe also manipulate q params
    // when skipping ahead in "pages" instead of having to keep scrolling to get
    // to the bottom
    const { scrollHeight } = document.body;
    const { scrollY } = window;
    let { slice, detach } = this.state;

    if (!detach && scrollY > 150) {
      detach = true;
    } else if (scrollY <= 150) {
      detach = false;
    }

    if (scrollY > scrollHeight * 0.75) {
      this.setState({ slice: slice + 20, detach: detach });
    } else {
      this.setState({ slice, detach });
    }
  }

  componentDidMount() {
    this.fetchSpells();
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  fetchSpells() {
    this.props.querySpellName(this.props.spellQuery);
  }

  handleChange() {
    this.props.querySpellName(this.input.value);
    this.setState({ slice: 20, detach: false });
  }

  handleSubmit() {
    this.fetchSpells();
  }

  handleFilterToggle(item: SpellFilter | number) {
    if (typeof item === 'number') {
      this.props.onSpellLevelChange(item);
    } else {
      this.props.onSchoolFilterToggle(item);
    }
  }

  render() {
    const levels = new Array(10)
      .fill(0)
      .map((n, i) => (
        <Checkbox onChange={() => this.handleFilterToggle(i)} key={i}>
          {i ? `Level ${i}` : `Level 0 (Cantrip)`}
        </Checkbox>)
      );

    const schools = this.props.schools
      .map((s, i) => <SchoolFilterToggle key={i} onClick={(school: SpellFilter) => this.handleFilterToggle(school)} {...s} />);
    const page = Math.ceil(this.state.slice / 20);
    const pageCount = Math.ceil(this.props.results.length / 20);
    let pages = [];
    for (var p = 1; p < pageCount; p++) {
      pages.push(<li><Link to={{pathname: '/dm-tools/spells', search: `?page=${p}`}}>{p}</Link></li>);
    }
    const results = this.props.results.slice(0, this.state.slice);
    const pageClassName = this.state.detach ? 'paginator paginator-scroll' : 'paginator';
    return (
      <div>
        <div className={pageClassName}>
          <ul className='pagination-flex'>
            {pages}
          </ul>
        </div>
        <SpellList
          {...this.props}
          handleChange={this.handleChange}
          page={page}
          query={this.props.spellQuery}
          results={results}>
          <Form horizontal>
            <FormGroup controlId='formSpellQuery'>
              <Col sm={2}>
                <label htmlFor='formSpellQuery'>Search</label>
              </Col>
              <Col sm={10}>
                <input className='form-control' type='text' id='formSpellQuery' ref={r => this.input = r} onChange={() => this.handleChange()} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col sm={2}>
                Schools
              </Col>
              <Col sm={4}>
                {schools}
              </Col>
            </FormGroup>

            <FormGroup controlId='spellLevels'>
              {levels}
            </FormGroup>
          </Form>
        </SpellList>
      </div>
    );
  }
}

export default connect(spellProps, spellListDispatchers)(SpellQuery)
