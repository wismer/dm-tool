import { SpellList, NormalizedPayload, Spell } from '../../interfaces';
import { SPELL_QUERY_RESPONSE, SPELL_QUERY_REQUEST } from '../actions';

const initialState: SpellList = {
  itemsById: {},
  items: [],
  spellSchools: ['evocation', 'necromancy'],
  spellQuery: '',
};

function querySpells(state: SpellList): SpellList {
  return Object.assign({}, state, { isLoading: true });
}

function handleQueryResponse(state: SpellList, payload: NormalizedPayload<Spell>, spellQuery?: string): SpellList {
  return Object.assign({}, state, {
    spellQuery: spellQuery || state.spellQuery,
    ...payload
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
      return handleQueryResponse(state, action.spellPayload, action.spellQuery);
    default: return state;
  }
}
