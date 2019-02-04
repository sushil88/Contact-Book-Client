import { combineReducers } from 'redux';

import messages from './reducers/messages';
import auth from './reducers/auth';

export default combineReducers({
  messages,
  auth
});