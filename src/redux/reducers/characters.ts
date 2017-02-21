import {
  AppState,
  SavedCharacter,
  CharState,
 } from '../../interfaces';
import {
  SAVE_CHARACTER,
  CHARACTER_LIST_LOAD,
  CHARACTER_SEARCH_RESULTS,
} from '../actions';


const initialState: CharState = {
  characters: [],
  charactersById: {}
};

function saveCharacter(state: CharState, character: SavedCharacter): CharState {
  let { charactersById } = state;
  charactersById = Object.assign({}, charactersById, { [character.id]: character });
  return Object.assign({}, state, {
    characters: [...state.characters, character.id],
    charactersById
  });
}

function characterListLoad(state: CharState, characters: SavedCharacter[]): CharState {
  const charactersById = {};
  const chars = [];
  for (let char of characters) {
    charactersById[char.id] = char;
    chars.push(char.id);
  }
  return Object.assign({}, state, { characters, charactersById });
}


export default function characters(state: CharState, action: any): CharState {
  if (!state) {
    return initialState;
  }

  switch (action.type) {
    case CHARACTER_LIST_LOAD:
    case CHARACTER_SEARCH_RESULTS:
      return characterListLoad(state, action.characters);
    case SAVE_CHARACTER:
      return saveCharacter(state, action.character);
    default: return state;
  }
}

export function addCharacterProps(state: AppState, props: any): {isOpen: boolean} {
  return props;
}
