import {
  querySpells,
  addCharacter,
  changeTool,
  saveEncounter,
  switchActiveEncounter,
  addCharactersToEncounter
} from './actions';
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

export function addCharacterDispatch(dispatch: Dispatch): any {
  return {
    saveCharacter: (character: Character): void => {
      dispatch(addCharacter(character));
    }
  }
}

export function characterListDispatch(dispatch: Dispatch): any {
  return {
    addCharactersToEncounter: (characterIDs: number[]): void => {
      dispatch(addCharactersToEncounter(characterIDs));
    }
  };
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

export function encounterListDispatch(dispatch: Dispatch): any {
  return {
    switchActiveEncounter: (id: number | null) => {
      dispatch(switchActiveEncounter(id));
    }
  }
}
