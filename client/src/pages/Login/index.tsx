import React from "react";
import Container from "../../components/global/Container";
import CardForm from "../../components/global/CardForm";
import "./styles.scss";

/**
 * Login page for logging into user account on form submission.
 * @return - Controlled form which triggers a POST request at /users/signin on form submission.
 */
const Login: React.FC = () => {
  // Form for logging User into account
  const loginForm = [
    {
      id: "log_username",
      type: "username",
      name: "username",
      label: "Username",
      required: true,
    },
    {
      id: "log_password",
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
};

export default Login;
