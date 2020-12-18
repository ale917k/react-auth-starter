import React, { useContext } from "react";
import { AppContext } from "../../context/context";

import Container from "../../components/global/container/Container.component";
import CardForm from "../../components/global/card-form/CardForm.component";

import "./Account.styles.scss";

/**
 * Basic Account page.
 * @return {JSX} - Account page containing forms for updating User information and password.
 */
export default function Account() {
  // Context for retrieving User state from AppContext
  const { state } = useContext(AppContext);

  // Form for editing User information
  const editDetailsForm = [
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
  ];

  // Form for editing User password
  const editPasswordForm = [
    {
      type: "password",
      name: "oldPassword",
      label: "Old Password",
      required: true,
    },
    {
      type: "password",
      name: "newPassword",
      label: "New Password",
      required: true,
    },
  ];

  return (
    <div className="account">
      <Container className="account-container">
        <h1>{`Welcome ${state.user.username}`}</h1>

        <div className="card-wrapper">
          <CardForm
            title="Update your details"
            initialForm={{
              email: state.user.email,
              username: state.user.username,
            }}
            inputList={editDetailsForm}
            requestType="editUser"
            buttonText="Update"
          />

          <CardForm
            title="Update your password"
            initialForm={{
              oldPassword: "",
              newPassword: "",
            }}
            inputList={editPasswordForm}
            requestType="editUser"
            buttonText="Update"
          />
        </div>
      </Container>
    </div>
  );
}
