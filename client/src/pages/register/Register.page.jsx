import React, { useState } from "react";
// import { renderEmail } from "react-html-email";

import Container from "../../components/global/container/Container.component";
import Input from "../../components/global/input/Input.component";
// import ContactEmail from "./contactEmail";

import "../../styles/form.styles.scss";
import "./Register.styles.scss";

/**
 * Register page for creating new accounts on form submission.
 * @return {JSX} - Controlled form which triggers AddUser event on form submission.
 */
export default function Register() {
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
  };

  // Trigger Add User action on form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // const messageHtml = renderEmail(<ContactEmail {...form} />);

    setAlertMessage({
      isActive: true,
      severity: "error",
      message: "An error occurred, please try again later.",
    });
    console.log("Form: ", form);

    // const data = await fetch("/api/send_email", {
    //   method: "post",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     email: form.email,
    //     messageHtml,
    //   }),
    // });
    // try {
    //   // const isEmailSent = await data.json();
    //   const isEmailSent = true;
    //   isEmailSent.error
    //     ? setAlertMessage({
    //         isActive: true,
    //         severity: "error",
    //         message:
    //           "Ooops, there seems to be a problem.. Please try later or drop me a call at ",
    //       })
    //     : setAlertMessage({
    //         isActive: true,
    //         severity: "success",
    //         message:
    //           "Thank you for being in touch with me. I'll be back to you sooner possible! If urgent, please drop me a call at ",
    //       });
    // } catch (err) {
    //   setAlertMessage({
    //     isActive: true,
    //     severity: "error",
    //     message:
    //       "Ooops, there seems to be a problem.. Please try later or drop me a call at ",
    //   });
    // }
    // setForm(initialForm);
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
              Submit
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
