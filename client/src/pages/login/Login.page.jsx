import React, { useState, useContext } from "react";
import { Store } from "../../context/Store";

import Container from "../../components/global/container/Container.component";
import Input from "../../components/global/input/Input.component";

import "../../styles/form.styles.scss";
import "./Login.styles.scss";

/**
 * Login page for logging into user account on form submission.
 * @return {JSX} - Controlled form which triggers a POST request at /users/signin on form submission.
 */
export default function Login() {
  // Context for dispatching User updates on Store
  const { dispatch } = useContext(Store);

  // New User data used upon User registration
  const initialForm = {
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

  // Trigger POST request at /users/signin on form submission for logging user
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await fetch("http://localhost:5000/users/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    try {
      const loggedUser = await data.json();

      if (loggedUser.error) {
        if (loggedUser.error === "Unauthorized Access") {
          setAlertMessage({
            isActive: true,
            severity: "error",
            message:
              "The details entered don't match any account. Please try again",
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
            ...loggedUser.result,
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
    <section className="login">
      <Container className="login-container">
        <div className="card">
          <h2>Login</h2>

          {alertMessage.isActive && (
            <div className="alert error">{alertMessage.message}</div>
          )}

          <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
