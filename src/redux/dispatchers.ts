import { querySpells, saveCharacter } from './actions';
import { AppState, Character } from '../interfaces';


interface Dispatch {
  (action: any): AppState
}

export function spellListDispatchers(dispatch: Dispatch): any {
  return {
    querySpellName: (name: string) => {
      dispatch(querySpells(name));
    }
  };
}

export function characterListDispatch(dispatch: Dispatch): any {
  return {
    saveCharacter: (character: Character) => {
      dispatch(saveCharacter(character));
    }
  }
}
