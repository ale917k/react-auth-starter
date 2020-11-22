import React, { useState, useContext } from "react";
import { renderEmail } from "react-html-email";
import { Store } from "../../context/Store";

import Container from "../../components/global/container/Container.component";
import Input from "../../components/global/input/Input.component";
import Alert from "../../components/global/alert/Alert.component";
import ContactEmail from "../../components/email/registration-confirmation/RegistrationConfirmation.email";

import { addNewUser } from "../../api/users.api";

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

    addNewUser({ ...form, messageHtml }, dispatch, setAlertMessage);
  };

  return (
    <section className="register">
      <Container className="register-container">
        <div className="card">
          <h2>Register</h2>

          {alertMessage.isActive && (
            <Alert
              severity={alertMessage.severity}
              message={alertMessage.message}
            />
          )}

          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
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
              Create new account
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
