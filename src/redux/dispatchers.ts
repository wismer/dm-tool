import {
  endRound,
  querySpells,
  addCharacter,
  changeTool,
  saveEncounter,
  addCharactersToEncounter,
  updateHitPoints,
  retrieveEncounterData,
  characterListInit,
  changeEncounterPage
} from './actions';
import { AppState, Character, ToolChoice, SavedCharacter, Encounter } from '../interfaces';

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
    addCharactersToEncounter: (characters: SavedCharacter[]): void => {
      dispatch(addCharactersToEncounter(characters));
    },

    fetchCharacters: () => {
      dispatch(characterListInit());
    },

    selectCharacter: (char: SavedCharacter): void => {
      // TODO
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
    },

    alterHitPoints: (hp: number, charStateID: number, encounterID: number) => {
      dispatch(updateHitPoints(hp, charStateID, encounterID));
    }
  }
}

export function encounterListDispatch(dispatch: Dispatch): any {
  return {
    retrieveEncounterData: (router: ReactRouter.RouterState, params: { id?: string }) => {
      dispatch(retrieveEncounterData(router, params));
    },

    changePage: (page: number) => {
      dispatch(changeEncounterPage(page))
    }
  }
}

export function encounterViewDispatch(dispatch: Dispatch): any {
  return {
    alterHitPoints: (hp: number, charStateID: number, encounterID: number) => {
      dispatch(updateHitPoints(hp, charStateID, encounterID))
    },

    endRound: (id: number, endOfRound: boolean) => {
      dispatch(endRound(id, endOfRound))
    }
  }
}
