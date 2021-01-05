import React from "react";

import Container from "../../components/global/container/Container.component";
import CardForm from "../../components/global/card-form/CardForm.component";

import "./Register.styles.scss";

/**
 * Register page for creating new accounts on form submission.
 * @return - Controlled form which triggers a POST request at /users on form submission.
 */
const Register: React.FC = () => {
  // Form for registering new User
  const registerForm = [
    {
      id: "reg_email",
      type: "email",
      name: "email",
      label: "Email",
      required: true,
    },
    {
      id: "reg_username",
      type: "username",
      name: "username",
      label: "Username",
      required: true,
    },
    {
      id: "reg_password",
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
};

export default Register;
