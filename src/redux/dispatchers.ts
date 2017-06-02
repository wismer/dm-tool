import * as actions from './actions';
import {
  AppState,
  Character,
  ClueModel,
  SavedCharacter,
  Encounter,
  SpellFilter,
  ChapterField,
  ClueField
} from '../interfaces';
import * as ReactRouter from 'react-router';

interface Dispatch {
  (action: any): AppState
}

export function abilityCheckDispatchers(dispatch: Dispatch): any {
  return {
    onSubmit: (chapterID: number, clue: ClueField) => {
      dispatch(actions.updateChapter(chapterID, clue));
    },

    fetchDetail: (chapterID: number | string) => {
      dispatch(actions.chapterDetailLoad(chapterID));
    },

    onUpdate: (clue: ClueModel) => {
      dispatch(actions.clueUpdateRequest(clue));
    }
  };
}

export function pointsOfInterest(dispatch: Dispatch): any {
  // return { onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => dispatch(actions.saveClueOutcome()) };
}

export function chapterListDispatchers(dispatch: Dispatch): any {
  return {
    fetchList: () => dispatch(actions.loadChapterList())
  };
}

export function saveChapterDispatchers(dispatch: Dispatch): any {
  return {
    onSubmit: (chapter: ChapterField) => {
      dispatch(actions.saveStoryboardSettings(chapter));
    }
  };
}

export function spellListDispatchers(dispatch: Dispatch): any {
  return {
    querySpellName: (name: string) => {
      dispatch(actions.querySpells(name));
    },

    onSpellLevelChange: (lvl: number) => {
      dispatch(actions.spellLevelToggle(lvl));
    },

    onSchoolFilterToggle: (school: SpellFilter) => {
      dispatch(actions.schoolToggle(school));
    }
  };
}

export function addCharacterDispatch(dispatch: Dispatch): any {
  return {
    saveCharacter: (character: Character): void => {
      dispatch(actions.addCharacter(character));
    }
  }
}

export function characterListDispatch(dispatch: Dispatch): any {
  return {
    addCharactersToEncounter: (characters: SavedCharacter[]): void => {
      dispatch(actions.addCharactersToEncounter(characters));
    },

    fetchCharacters: () => {
      dispatch(actions.characterListInit());
    },
  };
}

export function encounterDispatch(dispatch: Dispatch): any {
  return {
    saveEncounter: (encounter: Encounter) => {
      dispatch(actions.saveEncounter(encounter));
    },

    alterHitPoints: (hp: number, charStateID: number, encounterID: number) => {
      dispatch(actions.updateHitPoints(hp, charStateID, encounterID));
    }
  }
}

export function encounterListDispatch(dispatch: Dispatch): any {
  return {
    retrieveEncounterData: (router: ReactRouter.Router, params: { id?: string }) => {
      dispatch(actions.retrieveEncounterData(router, params));
    },

    changePage: (page: number) => {
      dispatch(actions.changeEncounterPage(page))
    }
  }
}

export function encounterViewDispatch(dispatch: Dispatch): any {
  return {
    alterHitPoints: (hp: number, charStateID: number, encounterID: number) => {
      dispatch(actions.updateHitPoints(hp, charStateID, encounterID))
    },

    endRound: (id: number, endOfRound: boolean) => {
      dispatch(actions.endRound(id, endOfRound))
    }
  }
}

export function characterQueryDispatch(dispatch: Dispatch): any {
  return {
    receiveSearchResults: (results: SavedCharacter[]) => {
      dispatch(actions.receiveSearchResults(results));
    }
  };
}
