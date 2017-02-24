import * as R from '@types/react-router';
import { Action } from 'redux';

export enum SpellComponent {
  Verbal = 1,
  Somatic = 2,
  Material = 3,
}

export interface Spell {
  id: number;
  name: string;
  desc: string;
  components: Array<SpellComponent>;
  componentDesc: null | string;
  spellSchool: string;
  castingTime: string;
  duration: string;
  spellShape: null | string;
  spellRange: string;
  requiresConcentration: boolean;
  level: number;
}

type SpellSchool = 'necromancy' | 'evocation' | 'divine' | 'illusion' // add more later
export interface SpellSet {
  [key: string]: Spell
}

export interface SpellList extends NormalizedPayload<Spell> {
  spellSchools: SpellSchool[];
  spellQuery: string;
}

export interface SpellAction extends Action {
  spells: Spell[];
}

export interface SpellSearchResults {
  results: Spell[];
  querySpellName: (query: string) => void;
  spellQuery: string;
}

export interface FormState {
  query: string;
}

/*
model Encounter
many characters (so foreign key on model to Character model)
*/

export interface Character {
  playerName: string;
  characterName: string;
  armorClass: number;
  toHit: number;
  passiveWisdom: number;
  initiative: number;
  maxHitPoints: number;
  isNpc: boolean;
  id: number;
}

export interface CreateCharacterProps {
  saveCharacter: (character: Character) => void;
  isOpen: boolean;
}

export interface CreateCharacterState {
  open?: boolean;
  character: Character;
}


export interface ContainerProps {
  characters: Array<SavedCharacter>,
  addCharactersToEncounter: (characters: CharDesc[]) => void;
};

export interface SavedCharacter extends Character {
  id: number;
  count?: number;
}

export interface BaseCharState {
  initiativeRoll: number;
  wasSurprised: boolean;
  currentHitPoints: number;
  isNpc: boolean;
}

export interface CharacterState extends BaseCharState {
  conditions: Condition[];
  readiedAction: boolean;
  name: string;
  id: number | null;
  character: number;
  encounter: number | null;
}

export interface Encounter {
  name: string | null;
  roster: CharacterState[];
  currentTurn: number;
  id: number;
  surpriseRound: boolean;
  created?: Date
}

export interface CharDesc {
  playerName: string;
  characterName: string;
  isNpc: boolean;
  count: number;
  id: number;
  initiativeRoll: null | number;
  initiative: number;
  wasSurprised: boolean;
  children?: any;
}

export interface EncounterCreation {
  surpriseRound: boolean;
  currentTurn: number;
  name: string;
}

export interface EncounterCreationProps {
  npcs: CharacterState[];
  players: CharacterState[];
  saveEncounter: (encounter: Encounter) => void;
  children?: any;
  onCharSelect?: (char: CharacterState, fromList: boolean) => void;
  onChange: (field: string, value: number | string | boolean) => void;
  characters: SavedCharacter[];
}

export type RouterLocation = {
  hash: string;
  pathname: string;
  search: string;
  state?: any;
  query: { [name: string]: string }
}

export interface EncounterListProps extends R.RouterState {
  encounters: Array<Encounter>;
}

export interface ToolState {
  encounters: Array<Encounter>;
  characters: Array<SavedCharacter>;
  isLoading: boolean;
  encounterPage: number;
  maxEncounterPage: number;
}

export interface Race {
  name: string;
  hasSubraces: boolean;
  bonusSkills: Array<string>;
  bonusScores: Array<number>;
  subracesById: Array<number>;
  id: number;
}

export interface RaceState {
  currentRace: number | null;
  racesById: Array<number>;
  races: Array<Race>;
}

export interface EncounterState {
  encounters: number[];
  encountersById: { [id: number]: Encounter };
  characterStates: number[];
  characterStatesById: { [id: number]: CharacterState };
  page: number;
}

export interface AppState {
  race: RaceState;
  spells: SpellList;
  encounter: EncounterState;
  character: CharState
}

export interface CharState {
  characters: number[];
  charactersById: { [id: string]: SavedCharacter };
}

export enum MenuOptions {
  None = 0,
  Encounters = 1,
  SpellLookup = 2,
}

type Condition = "prone" | "incapacitated" | "stunned" | "poisoned" | "defeaned" | "frightened" | "charmed" | "invisible" | "paralyzed" | "petrified" | "blinded"

export interface EncounterUpdate {
  id: number;
  endOfRound: boolean;
  roster: CharacterState[];
}


export interface CharacterListProps {
  characters: SavedCharacter[];
  activeIdx: null | number;
  filter?: string;
  empty?: boolean;
};

export interface CharacterListDispatchProps extends CharacterListProps {
  fetchCharacters: () => void;
  selectCharacter: (char: SavedCharacter, fromList: boolean) => void;
  onCharSelect: (char: SavedCharacter, fromList: boolean) => void;
}

export interface JSONListResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface JSONError {
  field: string;
  errors: string[];
}

export enum ServerCode {
  OK = 200,
  RESOURCE_ADDED = 201,
  USER_ERROR = 400,
  // will add more later
}

export enum CharacterDetailState {
  INACTIVE,
  ACTIVE,
  EXPANDED = ACTIVE | INACTIVE,
  READIED_ACTION = EXPANDED | INACTIVE,
  DEAD = INACTIVE,
}

export interface CharacterStateProps {
  viewState: CharacterDetailState;
}


export type EncounterFormState = {
  players: CharacterState[];
  npcs: CharacterState[];
  openModal: boolean;
  currentChar: null | number;
  name: string | null;
  surpriseRound: boolean;
}

export interface Query {
  name: string;
  npcsOnly: boolean;
}

export interface QueryProps {
  receiveSearchResults: (results: SavedCharacter[]) => void;
}

export interface PayloadItem {
  id: number;
}

export interface ItemID<T> {
  [index: string]: T;
}

export interface NormalizedPayload<T> {
  items: number[];
  itemsById: ItemID<T>;
}
