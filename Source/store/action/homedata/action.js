export const setHomeData = (data) => {
  // console.log("minal at reducser", data);
  return (dispatch) => {
    dispatch({ type: "SET_HOME_DATA", data });
  };
};
