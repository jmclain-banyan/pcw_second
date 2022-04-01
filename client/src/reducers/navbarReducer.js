const initialState = {
  showSideMenu: false,
  showLoginModal: false,
  showRegisterModal: false,
  showProfileSettingsModal: false,
  isLoading: false,
};

export const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_NAV_MENU":
      return {
        ...state,
        showSideMenu: !state.showSideMenu,
      };
    case "TOGGLE_REGISTER_MODAL":
      return {
        ...state,
        showSideMenu: false,
        showRegisterModal: !state.showRegisterModal,
      };
    case "TOGGLE_LOGIN_MODAL":
      return {
        ...state,
        showSideMenu: false,
        showLoginModal: !state.showLoginModal,
      };
    case "TOGGLE_PROFILE_MODAL":
      return {
        ...state,
        showSideMenu: false,
        showProfileSettingsModal: !state.showProfileSettingsModal,
      };
      case "LOADING": 
      return {
        ...state,
        isLoading: true,
      }
      case "LOADED":
        return {
          ...state,
          isLoading: false
        }
    default:
      return state;
  }
};
