import { Action } from 'redux';
import * as R from 'react-router';
import { Action as ReduxAction } from 'redux';


export interface FilterAction<T> extends ReduxAction {
  filter: T;
}

// export interface ChapterState<T> {
//   chapters: number[];
//   chaptersById: ChapterCollection<T>;
// }
//
// export interface ClueState {
//   clues: number[];
//   cluesById: ClueCollection;
// }
//
// export interface OutcomeState {
//   outcomes: number[];
//   outcomesById: OutcomeCollection;
// }
//
// export type ResourceState = OutcomeState & ClueState & ChapterState;
//
// export interface ChapterUpdate<T> {
//   chapterID: number;
//   data: T;
// }
//
export interface SettingProps {
  currentStep: StoryboardCreationStep;
  chapterID?: number;
}
//
// export interface APIRequest<T> {
//   method: 'POST' | 'GET' | 'OPTIONS';
//   payload: T;
// }

export interface SStep extends BaseChapter {
  active: boolean;
}

export enum SpellComponent {
  Verbal = 1,
  Somatic = 2,
  Material = 3,
}

export enum SpellFilterState {
  NONE,
  SCHOOL,
  NAME,
  SCHOOL_NAME = SCHOOL | NAME,
  LEVEL = 1 << 2,
  SCHOOL_LVL = SCHOOL | LEVEL,
  LVL_NAME = NAME | LEVEL,
  ALL = SCHOOL | NAME | LEVEL
}

export interface Spell {
  id: number;
  name: string;
  desc: string;
  components: Array<SpellComponent>;
  componentDesc: null | string;
  school: SpellSchool;
  castingTime: string;
  duration: string;
  spellShape: null | string;
  spellRange: string;
  requiresConcentration: boolean;
  level: number;
}

export type SpellSchool = 'Necromancy' | 'Evocation' | 'Divination' | 'Illusion' | 'Conjuration' | 'Transmutation' | 'Enchantment' | 'Abjuration' // add more later
export interface SpellSet {
  [key: string]: Spell
}

export interface SpellFilter {
  school: SpellSchool;
  active: boolean;
}

export interface SpellList extends NormalizedPayload<Spell> {
  spellQuery: string;
  activeSchools: SpellSchool[];
  activeLevels: number[];
  page?: number;
}

export interface SpellAction extends Action {
  spells: Spell[];
}

export interface SpellSearchResults {
  results: Spell[];
  querySpellName: (query: string) => void;
  spellQuery: string;
  schools: SpellFilter[];
  onSchoolFilterToggle: (school: SpellFilter) => void;
  onSpellLevelChange: (lvl: number) => void;
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

// for ability/skill checks
export enum Difficulty {
  VERY_EASY = 5,
  EASY = 10,
  MODERATE = 15,
  HARD = 20,
  VERY_HARD = 25,
  NEARLY_IMPOSSIBLE = 30
};

export type Skill = 'Investigation' | 'Nature' | 'Acrobatics' | 'Athletics' | 'Arcana' | 'Stealth' | 'Perception' | 'History';
export type Ability = 'Strength' | 'Constitution' | 'Wisdom' | 'Charisma' | 'Dexterity' | 'Intellect';
export interface Outcome {
  value: Difficulty;
  description: string;
}

export type Characteristics = Array<Skill | Ability>;
export interface APIResource {
  id: number;
  modified: Date;
  created: Date;
}

export interface BaseClue {
  requiredStats: Characteristics;
  description: string;
}

export interface BaseOutcome {
  description: string;
  dc: number;
}

export interface BaseChapter {
  title: string;
  description: string;
}


/*
 *Resource Types*
    Server data representations of clues, chapters and outcomes
 *Model Types*
    Deserialized representations of Resource Types
*/

// thing<ClueResource, OutcomeResource> = paylaod.results;
export interface ChapterModel extends APIResource, BaseChapter {
  clues: number[];
}

export interface ChapterResource extends APIResource, BaseChapter {
  clues:  ClueResource[]; // number (after deserializing) | Chapter
}

export type ChapterField = BaseChapter;

export type ChapterCollection = {
  [id: number]: ChapterModel;
};

export interface ClueField extends BaseClue {
  outcomes: Array<OutcomeResource | OutcomeField>;
}

export interface ClueModel extends BaseClue, APIResource {
  chapter: number;
  outcomes: number[];
}

export interface ClueResource extends BaseClue, APIResource {
  chapter: number;
  outcomes: OutcomeResource[];
}

export type ClueCollection = { [id: number]: ClueModel };
export interface OutcomeField extends BaseOutcome {}
export type OutcomeModel = OutcomeResource;
export interface OutcomeResource extends BaseOutcome, APIResource {
  clue: number;
}

export type OutcomeCollection = { [id: number]: OutcomeModel };
export interface Storyboard {
  // models
  chaptersById: ChapterCollection;
  cluesById: ClueCollection;
  outcomesById: OutcomeCollection;
  // ids
  chapters: number[];
  clues: number[];
  outcomes: number[];

  // metadata
  steps: SStep[];
  currentStep: StoryboardCreationStep;
  loading: boolean;
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

export interface EncounterListProps extends R.Router {
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

export enum StoryboardCreationStep {
  Setting,
  PointsOfInterest,
  NPCs
}


export interface AppState {
  race: RaceState;
  spells: SpellList;
  encounter: EncounterState;
  character: CharState;
  storyboard: Storyboard;
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
