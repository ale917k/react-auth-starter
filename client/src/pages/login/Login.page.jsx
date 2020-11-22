import React from "react";

import Container from "../../components/global/container/Container.component";
import CardForm from "../../components/global/card-form/CardForm.component";

import "./Login.styles.scss";

/**
 * Login page for logging into user account on form submission.
 * @return {JSX} - Controlled form which triggers a POST request at /users/signin on form submission.
 */
export default function Login() {
  // Form for logging User into account
  const loginForm = [
    {
      type: "username",
      name: "username",
      label: "Username",
      required: true,
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      required: true,
    },
  ];

  return (
    <section className="login">
      <Container className="login-container">
        <CardForm
          title="Login"
          initialForm={{
            email: "",
            username: "",
            password: "",
          }}
          inputList={loginForm}
          requestType="loginUser"
          buttonText="Login"
        />
      </Container>
    </section>
  );
}
