import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import TilesReducer from './reducer_tiles';
import AuthReducer from './reducer_auth';

const rootReducer = combineReducers({
  tiles: TilesReducer,
  auth: AuthReducer,
  form: formReducer
});

export default rootReducer;
