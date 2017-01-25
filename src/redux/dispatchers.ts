import { querySpells, saveCharacter, changeTool, saveEncounter } from './actions';
import { AppState, Character, ToolChoice, Encounter } from '../interfaces';

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

export function toolDispatch(dispatch: Dispatch): any {
  return {
    changeTool: (tool: ToolChoice) => {
      dispatch(changeTool(tool));
    }
  };
}

export function encounterDispatch(dispatch: Dispatch): any {
  return {
    saveEncounter: (encounter: Encounter) => {
      dispatch(saveEncounter(encounter));
    }
  }
}
