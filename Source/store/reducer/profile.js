export const initialState = {
  profile: [],
  membership: false,
  status: false,
  question: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROFILE": {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case "SET_MEMBERSHIP": {
      return {
        ...state,
        membership: action.membership,
      };
    }
    case "SET_MEMBERSHIP_STATUS": {
      return {
        ...state,
        status: action.status,
      };
    }
    case "SET_QUESTION_ID": {
      return {
        ...state,
        question: action.question,
      };
    }
    default: {
      return state;
    }
  }
};
export default reducer;
