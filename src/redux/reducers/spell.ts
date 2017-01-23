import { Action } from 'redux';
import { SpellList } from '../../interfaces';
import { SPELL_QUERY_RESPONSE, SPELL_QUERY_REQUEST } from '../actions';

const initialState: SpellList = {
  searchResults: [],
  spellSchools: [],
  spellQuery: null,
  isLoading: false,
  didErr: false,
};

function querySpells(state: SpellList): SpellList {
  return Object.assign({}, state, { isLoading: true });
}

function handleQueryResponse(state: SpellList, action: any): SpellList {
  return Object.assign({}, state, {
    searchResults: action.spells,
    isLoading: false
  });
}

export function spells(state: SpellList, action: Action): SpellList {
  if (!state) {
    return initialState;
  }

  switch (action.type) {
    case SPELL_QUERY_REQUEST:
      return querySpells(state);
    case SPELL_QUERY_RESPONSE:
      return handleQueryResponse(state, action);
  }
  return state;
}
