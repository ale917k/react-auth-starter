declare module "react-html-email";

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

// Alert Messages
type AlertMessageType = {
  isActive: boolean;
  severity: string;
  message: string;
};

// Dispatch actions for UserType
type UserDispatchType = {
  type: string;
  payload: UserType;
};

// Log User form
type LogUserFormType = {
  username: string;
  password: string;
};

// Register User form
type RegUserFormType = {
  email: string;
  username: string;
  password: string;
  messageHtml: (ContactEmail: React.ReactNode) => void;
};

// Edit User form
type EditUserFormType = {
  email?: string;
  username?: string;
  oldPassword?: string;
  newPassword?: string;
};
