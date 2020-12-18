import React, { createContext, useReducer, Dispatch } from "react";
import PropTypes from "prop-types";
import UserActions from "./user/actions";
import userReducer from "./user/reducer";

// Context Initial State
const initialState = {
  user: null,
};

// AppContext for consuming Context on App
const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<UserActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Main Context reducer
const mainReducer = ({ user }: InitialStateType, action: UserActions) => ({
  user: userReducer(user, action),
});

// Context Provider
const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node,
};

export { AppProvider, AppContext };
