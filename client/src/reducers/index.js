import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { navbarReducer } from "./navbarReducer";
import { errorReducer } from "./errorReducer";
import { candyWarsReducer } from './candyWarsReducer';
import { successReducer } from './successReducer';

export default combineReducers({
  auth: authReducer,
  nav: navbarReducer,
  error: errorReducer,
  success: successReducer,
  candy: candyWarsReducer
});
