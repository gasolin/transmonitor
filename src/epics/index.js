import {combineEpics} from 'redux-observable';
import {watchBlocksEpic} from './watchBlocksEpic';
import {quicklyGetBlockEpic} from './quicklyGetBlockEpic';

export const rootEpic = combineEpics(watchBlocksEpic, quicklyGetBlockEpic);
