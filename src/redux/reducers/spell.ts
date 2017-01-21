enum SpellComponent {
  Verbal = 1;
  Somatic = 2;
  Material = 3;
}

export interface Spell {
  name: string;
  spellLevel: number;
  desc: string;
  components: Array<SpellComponent>;
  spellSchool: string;
  id: number;
  castingTime: number;
  reaction: boolean;
  duration: string;
  materialDesc: null | string;
  range: number;
  requiresConcentration: boolean;
}

export interface SpellList {
  searchResults: Array<Spell>;
  spellSchools: Array<string>;
}

const initialState: SpellList = {
  searchResults: [],
  spellSchools: []
};

export function spells(state: SpellList, action: any): SpellList {
  if (!state) {
    return initial
  }

  return state;
}
