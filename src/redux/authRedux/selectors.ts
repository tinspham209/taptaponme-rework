import { IRootState } from '../rootReducer';

export const getCurrentUser = (state: IRootState) => state.auth.user;
