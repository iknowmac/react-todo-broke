
import { combineReducers } from 'redux';
import * as actions from './constants';

const initialState = {
  isLoading: false,
  error: '',
  items: []
};

const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_TODOS:
      return {
        ...state,
        isLoading: true
      };
    case actions.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload
      };
    case actions.FETCH_TODOS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case actions.CREATE_TODO:
      return {
        ...state,
        isLoading: true
      };
    case actions.CREATE_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: insertItem(state.items, action.payload)
      };
    case actions.CREATE_TODO_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case actions.UPDATE_TODO:
      return {
        ...state,
        isLoading: true
      };
    case actions.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: updateItem(state.items, action.payload)
      };
    case actions.UPDATE_TODO_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

      case actions.DELETE_TODO:
        return {
          ...state,
          isLoading: true
        };
      case actions.DELETE_TODO_SUCCESS:
        return {
          ...state,
          isLoading: false,
          items: removeItem(state.items, action.payload)
        };
      case actions.DELETE_TODO_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };

    case actions.CLEAR_TODOS:
      return initialState;
    default:
      return state;
  }
}

const updateItem = (array, action) => {
  return array.map((item, index) => {
    if (index !== action.index) return item

    return { ...item, ...action.item }
  })
}

const insertItem = (array, action) => {
  let newArray = array.slice()
  newArray.splice(action.index, 0, action)

  return newArray
}

const removeItem = (array, action) => {
  let newArray = array.slice();
  newArray.splice(newArray.indexOf(action), 1);

  return newArray;
}

export default combineReducers({
  todos: TodoReducer
});
