export const initialState = {
  profile: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROFILE": {
      return {
        ...state,
        profile: action.profile,
      };
    }
    default: {
      return state;
    }
  }
};
export default reducer;
