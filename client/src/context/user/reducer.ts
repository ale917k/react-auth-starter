import UserActions from "./actions";
import UserTypes from "./types";

const userReducer = (state: UserType, action: UserActions): UserType => {
  switch (action.type) {
    case UserTypes.Set:
      return { ...state, ...action.payload };
    case UserTypes.Clear:
      return null;
    default:
      return state;
  }
};

export default userReducer;
