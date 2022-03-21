export const setHomeData = (data) => {
  return (dispatch) => {
    dispatch({ type: "SET_HOME_DATA", data });
  };
};
export const setPlantImage = (plantimage) => {
  return (dispatch) => {
    dispatch({ type: "SET_PLANT_IMAGE", plantimage });
  };
};
export const DeletePlantImage = () => {
  return (dispatch) => {
    dispatch({ type: "DELETE_PLANT_IMAGE" });
  };
};
export const setPlantImageArr = (plantimagearr) => {
  return (dispatch) => {
    dispatch({ type: "SET_PLANT_IMAGE_ARR", plantimagearr });
  };
};
