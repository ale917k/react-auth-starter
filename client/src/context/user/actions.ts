import UserTypes from "./types";

type UserPayload = {
  [UserTypes.Set]: {
    _id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
  [UserTypes.Clear]: null;
};

type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export default UserActions;
