import React from "react";

import Container from "../../components/global/container/Container.component";
import CardForm from "../../components/global/card-form/CardForm.component";

import "./Register.styles.scss";

/**
 * Register page for creating new accounts on form submission.
 * @return {JSX} - Controlled form which triggers a POST request at /users on form submission.
 */
export default function Register() {
  // Form for registering new User
  const registerForm = [
    {
      type: "email",
      name: "email",
      label: "Email",
      required: true,
    },
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
    <section className="register">
      <Container className="register-container">
        <CardForm
          title="Register"
          initialForm={{
            email: "",
            username: "",
            password: "",
          }}
          inputList={registerForm}
          requestType="addNewUser"
          buttonText="Create new account"
        />
      </Container>
    </section>
  );
}
