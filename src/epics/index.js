import {combineEpics} from 'redux-observable';
import {getBlockEpic} from './getBlockEpic';
import {quicklyGetBlockEpic} from './quicklyGetBlockEpic';

export const rootEpic = combineEpics(getBlockEpic, quicklyGetBlockEpic);
