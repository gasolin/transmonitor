import {combineEpics} from 'redux-observable';
import {getBlockEpic} from './getBlockEpic';
import {quicklyGetBlockEpic} from './quicklyGetBlockEpic';
import {watchBlocksEpic} from './watchBlocksEpic';

export const rootEpic = combineEpics(getBlockEpic, quicklyGetBlockEpic, watchBlocksEpic);
