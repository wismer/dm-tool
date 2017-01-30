import { Encounter, AppState } from '../../interfaces';

export function getActiveEncounter(state: AppState): Encounter | null {
  const { tools } = state;
  if (tools.activeEncounter) {
    return tools.encounters[tools.activeEncounter];
  }

  return null;
}
