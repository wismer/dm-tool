import { Encounter, AppState } from '../../interfaces';
import { CharacterMap } from '../../util';
import {
  EncounterListProps,
  EncounterCreationProps,
} from '../../interfaces';

export function encounterDetailProps(state: AppState, prevProps?: any): Encounter {
  if (prevProps.params && prevProps.params.id) {
    let encounter = state.tools.encounters.find(e => `${e.id}` === prevProps.params.id);
    if (encounter) {
      return encounter;
    }
  }
  return state.tools.encounters[0];
}

/* ENCOUNTER */

export function encounterListProps(state: AppState, props: any): EncounterListProps {
  const { tools } = state;
  return {
    ...props,
    encounters: tools.encounters,
    activePage: tools.encounterPage,
    maxPage: tools.maxEncounterPage,
  };
}

export function encounterViewProps(state: AppState, props: any): Encounter {
  const { id } = props.params;
  return state.tools.encounters.find(e => `${e.id}` === id) || state.tools.encounters[0]
}

export function createEncounterProps(state: AppState, props: any): EncounterCreationProps {
  const { tools } = state;
  const characters = tools.characters.map(c => {
    return {
      ...c,
      conditions: [],
      readiedAction: false,
      name: `${c.characterName} (${c.playerName})`,
      encounter: null,
      character: c.id,
      initiativeRoll: 0,
      wasSurprised: false,
      currentHitPoints: c.maxHitPoints,
    };
  });
  const { players, npcs } = CharacterMap(characters).split();
  return {
    children: props.children,
    players,
    npcs,
    saveEncounter: props.saveEncounter,
    onChange: props.onChange,
  };
}
