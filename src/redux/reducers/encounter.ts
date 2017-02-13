import { Encounter, AppState } from '../../interfaces';

export function getActiveEncounter(state: AppState): Encounter | null {
  const { tools } = state;
  if (tools.activeEncounter) {
    return tools.encounters[tools.activeEncounter];
  }

  return null;
}

export function encounterDetailProps(state: AppState, prevProps?: any): Encounter {
  if (prevProps.params && prevProps.params.id) {
    let encounter = state.tools.encounters.find(e => `${e.id}` === prevProps.params.id);
    if (encounter) {
      return encounter;
    }
  }
  return state.tools.encounters[0];
}
