import { combineReducers } from 'redux';
import { race } from './race';
import { tools } from './tools';
import { spells } from './spell';

export default combineReducers({ race, tools, spells });
