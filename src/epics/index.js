import {combineEpics} from 'redux-observable';
import {loadBlockEpic} from './loadBlockEpic';
import {getBlockEpic} from './getBlockEpic';

export const rootEpic = combineEpics(loadBlockEpic, getBlockEpic);
