export const initialState = {
  data: [],
  plantimage: [],
  plantimagearr: [],
};
const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_HOME_DATA": {
      return {
        ...state,
        data: action.data,
      };
    }
    case "SET_PLANT_IMAGE": {
      return {
        ...state,
        plantimage: [...state.plantimage, action.plantimage],
      };
    }
    case "DELETE_PLANT_IMAGE": {
      return {
        ...state,
        plantimage: [],
        plantimagearr: [],
      };
    }
    case "SET_PLANT_IMAGE_ARR": {
      return {
        ...state,
        plantimagearr: action.plantimagearr,
      };
    }
    default: {
      return state;
    }
  }
};
export default reducer;
