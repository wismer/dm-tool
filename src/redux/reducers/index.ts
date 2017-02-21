import { combineReducers } from 'redux';
import { race } from './race';
import characters from './characters';
import encounters from './encounters';
import { spells } from './spell';

export default combineReducers({ race, encounters, characters, spells });
