import { combineReducers } from 'redux';
import { race } from './race';
import characters from './characters';
import { encounter } from './encounters';
import { spells } from './spell';

export default combineReducers({ race, encounter, characters, spells });
