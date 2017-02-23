import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, SpellSearchResults } from '../interfaces';
import { spellListDispatchers } from '../redux/dispatchers';
import SpellList from './SpellList';

function spellProps(state: AppState, props: any): SpellSearchResults {
  const { spells: spellState } = state;
  return {
    results: spellState.spells.map(id => spellState.spellsById[id]),
    querySpellName: props.querySpellName,
    spellQuery: spellState.spellQuery
  };
}

type Slice = { slice: number };

class SpellQuery extends React.Component<SpellSearchResults, Slice> {
  constructor(props: SpellSearchResults) {
    super(props);
    this.state = { slice: 20 };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchSpells();
    document.addEventListener('scroll', (e: UIEvent) => {
      const { scrollHeight } = document.body;
      const { scrollY } = window;
      if (scrollY > scrollHeight * 0.75) {
        this.setState({ slice: this.state.slice + 20 });
      }
    });
  }

  fetchSpells() {
    this.props.querySpellName(this.props.spellQuery);
  }

  handleChange(input: HTMLInputElement) {
    this.props.querySpellName(input.value);
    this.setState({ slice: 20 });
  }

  handleSubmit() {
    this.fetchSpells();
  }

  render() {
    const results = this.props.results.slice(0, this.state.slice);
    return <SpellList
      {...this.props}
      handleChange={this.handleChange}
      query={this.props.spellQuery}
      results={results}
    />
  }
}

export default connect(spellProps, spellListDispatchers)(SpellQuery)
