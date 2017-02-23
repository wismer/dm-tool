import { SpellList, Spell } from '../../interfaces';
import { SPELL_QUERY_RESPONSE, SPELL_QUERY_REQUEST } from '../actions';

const initialState: SpellList = {
  spellsById: [],
  spells: [],
  spellSchools: ['evocation', 'necromancy'],
  spellQuery: '',
};

function querySpells(state: SpellList): SpellList {
  return Object.assign({}, state, { isLoading: true });
}

function handleQueryResponse(state: SpellList, spells: Spell[], querySpells?: string): SpellList {
  return Object.assign({}, state, {
    querySpells: querySpells || '',
  });
}

export function spells(state: SpellList, action: any): SpellList {
  if (!state) {
    return initialState;
  }

  switch (action.type) {
    case SPELL_QUERY_REQUEST:
      return querySpells(state);
    case SPELL_QUERY_RESPONSE:
      return handleQueryResponse(state, action.spells, action.querySpells);
    default: return state;
  }
}
