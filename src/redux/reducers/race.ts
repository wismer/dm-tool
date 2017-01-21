import { RaceState } from '../../interfaces';

const initialState: RaceState = {
  races: [
    {
      name: 'Dwarf',
      hasSubraces: true,
      bonusSkills: ['Resist Poison', 'Advantage Against Poisons'],
      bonusScores: [0, 2, 0, 0, 0, 0],
      subracesById: [2, 3],
      id: 1
    },
    {
      name: 'Hill Dwarf',
      hasSubraces: false,
      bonusSkills: ['Dwarven Fortitude'],
      bonusScores: [0, 2, 0, 0, 1, 0],
      subracesById: [],
      id: 2
    }
  ],
  racesById: [1],
  currentRace: null
};

export function race(state: RaceState, action: any): RaceState {
  if (!state) {
    return initialState;
  }

  return state;
}
