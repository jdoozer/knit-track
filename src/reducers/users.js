import { handleActions } from 'redux-actions';


// REDUCER (default export)
const usersReducer = loginState => handleActions({

  UPDATE_LOGIN: (_, action) => ({ loggedIn: action.payload.loggedIn }),

}, { loggedIn: loginState });

export default usersReducer;


// SELECTORS (named exports)
export const getUserLoggedIn = state => state.loggedIn;
