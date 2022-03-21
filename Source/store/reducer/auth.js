export const initialState = {
  token: null,
  loggedin: false,
  usertype: false,
  route: "Home",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGGED": {
      return {
        ...state,
        loggedin: true,
      };
    }
    case "SIGN_OUT": {
      return {
        ...state,
        loggedin: false,
        token: null,
      };
    }
    case "SET_USER_TYPE": {
      return {
        ...state,
        usertype: action.user,
      };
    }
    case "SET_TOKEN": {
      return {
        ...state,
        token: action.token,
      };
    }
    case "SET_INITIAL_ROUTE": {
      return {
        ...state,
        route: action.route,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
