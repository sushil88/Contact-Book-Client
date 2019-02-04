import { ADD_MESSAGE, DELETE_MESSAGE } from '../actions/types';
import shortid from 'shortid';

export default (state = [], action = {}) => {
  switch(action.type) {
    case ADD_MESSAGE:
      return [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text
        }
      ];
    case DELETE_MESSAGE:
      const index = state.findIndex((message) => message.id === action.id );
      if (index >= 0) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
      }
      return state;

    default: return state;
  }
}