// import {combineEpics} from 'redux-observable';
import {getBlockEpic} from './getBlockEpic';

export const rootEpic = getBlockEpic;
