// import axios from 'axios'
// import { useDispatch } from 'react-redux'
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

// const config = {
//   headers: {
//      "Content-Type": "application/json"
//   }
// }

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
     
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case "UPDATE_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.user = action.payload.user;
      return {
        ...state,
      };
    case "LOGOUT_SUCCESS":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case "UPDATE_FAIL":
      return {
        ...state,
      };
    default:
      return state;
  }
};
