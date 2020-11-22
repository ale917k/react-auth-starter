import React, { useState, useContext } from "react";
import { renderEmail } from "react-html-email";
import { Store } from "../../context/Store";

import Container from "../../components/global/container/Container.component";
import Input from "../../components/global/input/Input.component";
import ContactEmail from "../../components/email/registration-confirmation/RegistrationConfirmation.email";

import "../../styles/form.styles.scss";
import "./Register.styles.scss";

/**
 * Register page for creating new accounts on form submission.
 * @return {JSX} - Controlled form which triggers a POST request at /users on form submission.
 */
export default function Register() {
  // Context for dispatching User updates on Store
  const { dispatch } = useContext(Store);

  // New User data used upon User registration
  const initialForm = {
    email: "",
    username: "",
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
    setAlertMessage(initialAlertMessage);
  };

  // Trigger POST request at /users on form submission for creating new user
  const handleSubmit = async (event) => {
    event.preventDefault();

    const messageHtml = renderEmail(<ContactEmail {...form} />);

    const data = await fetch("http://localhost:5000/users", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        messageHtml,
      }),
    });
    try {
      const signedUser = await data.json();
      if (signedUser.error) {
        if (signedUser.error.name === "UserExistsError") {
          setAlertMessage({
            isActive: true,
            severity: "error",
            message: "An user with the following credentials already exists.",
          });
        } else {
          setAlertMessage({
            isActive: true,
            severity: "error",
            message: "An error occurred, please try again later.",
          });
        }
      } else {
        dispatch({
          type: "SET_USER",
          payload: {
            ...signedUser.result,
          },
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

  return (
    <section className="register">
      <Container className="register-container">
        <div className="card">
          <h2>Register</h2>

          {alertMessage.isActive && (
            <div className="alert error">{alertMessage.message}</div>
          )}

          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              value={form.email}
              required
              onChange={handleChange}
            />
            <Input
              type="text"
              name="username"
              value={form.username}
              required
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              value={form.password}
              required
              onChange={handleChange}
            />
            <button type="submit" className="primary-button">
              Create new account
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
