import React, { useState, useContext } from "react";
import { Store } from "../../context/Store";

import Container from "../../components/global/container/Container.component";
import Input from "../../components/global/input/Input.component";

import "./Account.styles.scss";

/**
 * Basic Account page.
 * @return {JSX} - Account page containing settings for updating User information.
 */
export default function Account() {
  // Context for retrieving User state from Store
  const { state, dispatch } = useContext(Store);

  // New User data used upon User profile update
  const initialForm = {
    email: state.user.email,
    username: state.user.username,
    password: "",
  };
  const [form, setForm] = useState(initialForm);

  // Alert message used for displaying error messages in case of server errors
  const initialAlertMessage = {
    isActive: false,
    severity: "",
    message: "",
  };
  const [alertMessage, setAlertMessage] = useState(initialAlertMessage);

  // Listen to form inputs and updates form state respectively
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // Trigger POST request at /users/signin on form submission for logging user
  const handleProfileUpdate = async (event) => {
    event.preventDefault();

    console.log(form);
    // Create temp form obj and remove empty fields
    const filteredForm = form;
    Object.keys(filteredForm).forEach(
      (key) => filteredForm[key] === "" && delete filteredForm[key]
    );

    console.log(form);
    console.log(filteredForm);

    // const data = await fetch(`http://localhost:5000/users/${state.user._id}`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });
    // try {
    //   const updatedUser = await data.json();

    //   if (updatedUser.error) {
    //     setAlertMessage({
    //       isActive: true,
    //       severity: "error",
    //       message: "An error occurred, please try again later.",
    //     });
    //   } else {
    //     dispatch({
    //       type: "SET_USER",
    //       payload: {
    //         ...updatedUser.result,
    //       },
    //     });
    //   }
    // } catch (err) {
    //   setAlertMessage({
    //     isActive: true,
    //     severity: "error",
    //     message: `An error occurred, please try again later. Ref: ${err}`,
    //   });
    // }
  };

  return (
    <div className="account">
      <Container className="account-container">
        <div className="card">
          <h1>{`Welcome ${state.user.username}`}</h1>
          <h2>Update your details:</h2>

          {alertMessage.isActive && (
            <div className="alert error">{alertMessage.message}</div>
          )}

          <form onSubmit={handleProfileUpdate}>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            <button type="submit" className="primary-button">
              Update
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
