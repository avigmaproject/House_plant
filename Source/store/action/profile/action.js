export const setProfile = (profile) => {
  return (dispatch) => {
    dispatch({ type: "SET_PROFILE", profile });
  };
};
export const setMembership = (membership) => {
  return (dispatch) => {
    dispatch({ type: "SET_MEMBERSHIP", membership });
  };
};

export const setMembershipStauts = (status) => {
  return (dispatch) => {
    dispatch({ type: "SET_MEMBERSHIP_STATUS", status });
  };
};
export const setQuestionId = (question) => {
  return (dispatch) => {
    dispatch({ type: "SET_QUESTION_ID", question });
  };
};
