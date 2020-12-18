// Context Actions
type ActionMap<M extends { [index: string]: Record<string, unknown> | null }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// Context user
type UserType = {
  _id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
} | null;

// Context initial state
type InitialStateType = {
  user: UserType;
};
