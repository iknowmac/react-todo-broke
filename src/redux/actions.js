
import todoItems from '../lib/items';
import * as actions from './constants';

export const fetchTodos = () => async dispatch => {
  try {
    dispatch({ type: actions.FETCH_TODOS, payload: undefined });
    dispatch({ type: actions.FETCH_TODOS_SUCCESS, payload: todoItems });
  } catch (err) {
    dispatch({ type: actions.FETCH_TODOS_ERROR, payload: err });
  }
};

export const createTodo = todo => async dispatch => {
  try {
    dispatch({ type: actions.CREATE_TODO, payload: todo });
    dispatch({ type: actions.CREATE_TODO_SUCCESS, payload: todo });
  } catch (err) {
    dispatch({ type: actions.CREATE_TODO_ERROR, payload: err });
  }
};

export const updateTodo = todo => async dispatch => {
  try {
    dispatch({ type: actions.UPDATE_TODO, payload: todo });
  } catch (err) {
    dispatch({ type: actions.UPDATE_TODO_ERROR, payload: err });
  }
};

export const deleteTodo = todo => async dispatch => {
  try {
    dispatch({ type: actions.DELETE_TODO, payload: todo });
    dispatch({ type: actions.DELETE_TODO_SUCCESS, payload: todo });
  } catch (err) {
    dispatch({ type: actions.DELETE_TODO_ERROR, payload: err });
  }
};

