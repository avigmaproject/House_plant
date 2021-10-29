export const setProfile = (profile) => {
  console.log("at reducer", profile);
  return (dispatch) => {
    dispatch({ type: "SET_PROFILE", profile });
  };
};
