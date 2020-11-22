import React, { useState, useContext } from "react";
import { Store } from "../../context/Store";

import Container from "../../components/global/container/Container.component";
import Input from "../../components/global/input/Input.component";
import Alert from "../../components/global/alert/Alert.component";

import { loginUser } from "../../api/users.api";

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

    loginUser(form, dispatch, setAlertMessage);
  };

  return (
    <section className="login">
      <Container className="login-container">
        <div className="card">
          <h2>Login</h2>

          {alertMessage.isActive && (
            <Alert
              severity={alertMessage.severity}
              message={alertMessage.message}
            />
          )}

          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="username"
              label="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="password"
              label="Password"
              value={form.password}
              onChange={handleChange}
              required
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
