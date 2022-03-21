export const setToken = (token) => {
  console.log("tokentoken", token);
  return (dispatch) => {
    dispatch({ type: "SET_TOKEN", token: token });
  };
};

export const signout = () => {
  return (dispatch) => {
    dispatch({ type: "SIGN_OUT" });
  };
};

export const setLoggedIn = () => {
  return (dispatch) => {
    dispatch({
      type: "SET_LOGGED",
    });
  };
};
export const setUserType = (user) => {
  console.log("user at action", user);
  return (dispatch) => {
    dispatch({
      type: "SET_USER_TYPE",
      user,
    });
  };
};
export const setInitialroute = (route) => {
  console.log("user at action", route);
  return (dispatch) => {
    dispatch({
      type: "SET_INITIAL_ROUTE",
      route,
    });
  };
};
