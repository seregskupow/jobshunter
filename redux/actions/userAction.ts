import { type } from 'os';
import * as t from '../types';

export const setInfo = (username:string) => ({
    type: t.SET_NAME,
    payload:username
});