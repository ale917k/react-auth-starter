import UserActions from "../context/user/actions";
import UserTypes from "../context/user/types";

/**
 * Retrieve list of all Users.
 * @param {function} setData - Hook function for updating the state of the User data.
 * @param {function} setAlertMessage - Hook state for displaying error / success messages.
 */
export const retrieveUsers = async (
  setData: (user: UserType) => void,
  setAlertMessage: (alertMessage: AlertMessageType) => void,
): Promise<void> => {
  const data = await fetch("/users", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  try {
    const retrievedUsers = await data.json();
    if (!retrievedUsers.error) {
      setData(retrievedUsers.result);
    } else {
      setAlertMessage({
        isActive: true,
        severity: "error",
        message: `Error retrieving users. Error Reference: ${retrievedUsers.message}: ${retrievedUsers.error}`,
      });
    }
  } catch (err) {
    setAlertMessage({
      isActive: true,
      severity: "error",
      message: `Error retrieving users. Error Reference: ${err}`,
    });
  }
};

/**
 * Retrieve specific User.
 * @param {function} setData - Hook function for updating the state of the User data.
 * @param {function} setAlertMessage - Hook state for displaying error / success messages.
 */
export const retrieveUser = async (
  userId: string,
  setData: React.Dispatch<UserActions>,
  setAlertMessage?: (alertMessage: AlertMessageType) => void,
): Promise<void> => {
  const data = await fetch(`/users/${userId}`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  try {
    const retrievedUser = await data.json();
    if (!retrievedUser.error) {
      setData({
        type: UserTypes.Set,
        payload: retrievedUser.result,
      });
    } else {
      setAlertMessage &&
        setAlertMessage({
          isActive: true,
          severity: "error",
          message: `Error retrieving user. Error Reference: ${retrievedUser.message}: ${retrievedUser.error}`,
        });
    }
  } catch (err) {
    setAlertMessage &&
      setAlertMessage({
        isActive: true,
        severity: "error",
        message: `Error retrieving user. Error Reference: ${err}`,
      });
  }
};

/**
 * Login specific User through session tokens.
 * @param {Object} authData - Object containing the User info for login authentication.
 * @param {function} setData - Context Hook function for updating the state of the User data.
 * @param {function} setAlertMessage - Hook state for displaying error / success messages.
 */
export const loginUserWithToken = async (token: string): Promise<string> => {
  const data = await fetch("/users/signin", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token, // prettier-ignore
    },
  });
  const authenticatedUser = await data.json();
  if (!authenticatedUser.error && authenticatedUser.id) {
    return authenticatedUser.id;
  }
  return "";
};

/**
 * Authenticate User logging in.
 * @param {Object} authData - Object containing the User info for login authentication.
 * @param {function} setData - Context Hook function for updating the state of the User data.
 * @param {function} setAlertMessage - Hook state for displaying error / success messages.
 */
export const authenticateUser = async (
  authData: LogUserFormType,
  setData: React.Dispatch<UserActions>,
  setAlertMessage: (alertMessage: AlertMessageType) => void,
): Promise<void> => {
  const data = await fetch("/users/signin", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authData),
  });
  try {
    const authenticatedUser = await data.json();
    if (!authenticatedUser.error) {
      retrieveUser(authenticatedUser.userId, setData, setAlertMessage);
      // Set localStorage token
      window.localStorage.setItem("token", authenticatedUser.token);
    } else if (authenticatedUser.error === "Unauthorized Access") {
      setAlertMessage({
        isActive: true,
        severity: "error",
        message: "The details entered don't match any account. Please try again",
      });
    } else {
      setAlertMessage({
        isActive: true,
        severity: "error",
        message: `An error occurred, please try again later. Ref: ${authenticatedUser.message}: ${authenticatedUser.error}`,
      });
    }
  } catch (err) {
    setAlertMessage({
      isActive: true,
      severity: "error",
      message: `An error occurred, please try again later. Ref: ${err}`,
    });
  }
};

/**
 * Add new User with name, username, default password, profession and admin permissions.
 * @param {Object} newData - Object containing the new User entry to insert into the database.
 * @param {function} setData - Context Hook function for updating the state of the User data.
 * @param {function} setAlertMessage - Hook state for displaying error / success messages.
 */
export const addNewUser = async (
  newData: RegUserFormType,
  setData: React.Dispatch<UserActions>,
  setAlertMessage: (alertMessage: AlertMessageType) => void,
): Promise<void> => {
  const data = await fetch("/users", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: newData.username,
      email: newData.email,
      password: newData.password,
      messageHtml: newData.messageHtml,
    }),
  });
  try {
    const newUser = await data.json();
    if (!newUser.error) {
      retrieveUser(newUser.userId, setData, setAlertMessage);
      // Set localStorage token
      window.localStorage.setItem("token", newUser.token);
    } else if (
      newUser.error.name === "UserExistsError" ||
      (newUser.error.name === "MongoError" && newUser.error.keyPattern)
    ) {
      setAlertMessage({
        isActive: true,
        severity: "error",
        message: "An user with the following credentials already exists.",
      });
    } else {
      setAlertMessage({
        isActive: true,
        severity: "error",
        message: `An error occurred, please try again later. Ref: ${newUser.message}: ${newUser.error}`,
      });
    }
  } catch (err) {
    setAlertMessage({
      isActive: true,
      severity: "error",
      message: `An error occurred, please try again later. Ref: ${err}`,
    });
  }
};

/**
 * Edit User information.
 * @param {Object} oldData - Object containing the old User information.
 * @param {Object} newData - Object containing the new User information which need to be updated.
 * @param {function} setData - Context Hook function for updating the state of the User data.
 * @param {function} setAlertMessage - Hook state for displaying error / success messages.
 */
export const editUser = async (
  oldData: UserType,
  newData: EditUserFormType,
  setData: React.Dispatch<UserActions>,
  setAlertMessage: (alertMessage: AlertMessageType) => void,
): Promise<void> => {
  if (oldData) {
    const data = await fetch(`/users/${oldData._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    try {
      const editedUser = await data.json();
      if (!editedUser.error) {
        setAlertMessage({
          isActive: true,
          severity: "success",
          message: "Successfully updated details.",
        });
        setData({
          type: UserTypes.Set,
          payload: {
            ...oldData,
            ...newData,
          },
        });
        // Clear out success message after 5s
        setTimeout(() => {
          setAlertMessage({
            isActive: false,
            severity: "",
            message: "",
          });
        }, 5000);
      } else if (editedUser.error.name === "IncorrectPasswordError") {
        setAlertMessage({
          isActive: true,
          severity: "error",
          message: "Sorry, your old password is incorrect, please try again.",
        });
      } else {
        setAlertMessage({
          isActive: true,
          severity: "error",
          message: `An error occurred, please try again later. Ref: ${editedUser.message}: ${editedUser.error}`,
        });
      }
    } catch (err) {
      setAlertMessage({
        isActive: true,
        severity: "error",
        message: `An error occurred, please try again later. Ref: ${err}`,
      });
    }
  }
};
