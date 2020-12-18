/**
 * Retrieve list of all Users.
 * @param {function} setData - Hook function for updating the state of the User data.
 * @param {function} setAlertMessage - Hook state for displaying error / success messages.
 */
export const retrieveUsers = async (setData, setAlertMessage) => {
  const data = await fetch("http://localhost:5000/users", {
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
export const retrieveUser = async (userId, setData, setAlertMessage) => {
  const data = await fetch(`http://localhost:5000/users/${userId}`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  try {
    const retrievedUser = await data.json();
    if (!retrievedUser.error) {
      setData({
        type: "SET_USER",
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
export const loginUserWithToken = async (token) => {
  const data = await fetch("http://localhost:5000/users/signin", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token, // prettier-ignore
    },
  });
  const authenticateUser = await data.json();
  if (!authenticateUser.error && authenticateUser.id) {
    return authenticateUser.id;
  }
};

/**
 * Authenticate User logging in.
 * @param {Object} authData - Object containing the User info for login authentication.
 * @param {function} setData - Context Hook function for updating the state of the User data.
 * @param {function} setAlertMessage - Hook state for displaying error / success messages.
 */
export const authenticateUser = async (authData, setData, setAlertMessage) => {
  const data = await fetch("http://localhost:5000/users/signin", {
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
export const addNewUser = async (newData, setData, setAlertMessage) => {
  const data = await fetch("http://localhost:5000/users", {
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
      setData({
        type: "SET_USER",
        payload: newUser.result,
      });
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
export const editUser = async (oldData, newData, setData, setAlertMessage) => {
  const data = await fetch(`http://localhost:5000/users/${oldData._id}`, {
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
        type: "SET_USER",
        payload: {
          ...oldData,
          ...newData,
        },
      });
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
};

/**
 * Remove User entry.
 * @param {Object} oldData - Object containing the old User which needs to be removed.
 * @param {function} setData - Hook function for updating the state of the User data.
 * @param {function} setAlertMessage - Hook state for displaying error / success messages.
 */
export const removeUser = async (oldData, setData, setAlertMessage) => {
  const data = await fetch(`http://localhost:5000/users/${oldData._id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
  });
  try {
    const deletedUser = await data.json();
    if (!deletedUser.error) {
      setAlertMessage({
        isActive: true,
        severity: "success",
        message: "Utente eliminato con successo.",
      });
      setData((prevState) => {
        const data = [...prevState];
        data.splice(data.indexOf(oldData), 1);
        return data;
      });
    } else {
      setAlertMessage({
        isActive: true,
        severity: "error",
        message: `Error removing user. Error Reference: ${deletedUser.message}: ${deletedUser.error}`,
      });
    }
  } catch (err) {
    setAlertMessage({
      isActive: true,
      severity: "error",
      message: `Error removing user. Error Reference: ${err}`,
    });
  }
};
