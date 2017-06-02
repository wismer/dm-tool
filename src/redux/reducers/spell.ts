import { SpellList, NormalizedPayload, Spell, FilterAction, SpellFilter } from '../../interfaces';
import {
  SPELL_QUERY_RESPONSE,
  SPELL_QUERY_REQUEST,
  SCHOOL_FILTER_TOGGLE,
  SPELL_LEVEL_TOGGLE,
} from '../actions';

const initialState: SpellList = {
  itemsById: {},
  items: [],
  spellQuery: '',
  activeSchools: [],
  activeLevels: []
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

function handleSchoolFilter(state: SpellList, action: FilterAction<SpellFilter>): SpellList {
  const activeSchools = action.filter.active
    ? state.activeSchools.filter(c => c !== action.filter.school)
    : [...state.activeSchools, action.filter.school]
  return Object.assign({}, state, {
    activeSchools
  });
}

function spellLevelToggle(state: SpellList, level: number): SpellList {
  let { activeLevels } = state;

  if (activeLevels.indexOf(level) === -1) {
    activeLevels = [...activeLevels, level];
  } else {
    activeLevels = activeLevels.filter(lvl => lvl !== level);
  }

  return Object.assign({}, state, { activeLevels });
}

function pageChange(state: SpellList, page: number): SpellList {
  return Object.assign({}, state, { page });
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
    case SCHOOL_FILTER_TOGGLE:
      return handleSchoolFilter(state, action);
    case SPELL_LEVEL_TOGGLE:
      return spellLevelToggle(state, action.level);
    case 'PAGE_CHANGE':
      return pageChange(state, action.page);
    default: return state;
  }
}
