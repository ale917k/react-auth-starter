import React, { useState, useContext } from "react";
import { renderEmail } from "react-html-email";

import Input from "../input/Input.component";
import Alert from "../alert/Alert.component";
import ContactEmail from "../../email/registration-confirmation/RegistrationConfirmation.email";

import { AppContext } from "../../../context/context";

import { addNewUser, loginUser, editUser } from "../../../api/users.api";

import "./CardForm.styles.scss";

/**
 * CardForm component used to handle any CRUD method through form and Hooks.
 * @param {string} title - Title to display on top of the form.
 * @param {Object} initialForm - Initial shape of the form data.
 * @param {array} inputList - List of inputs and related attributes to display on the form.
 * @param {string} requestType - Type of CRUD request to apply.
 * @param {string} buttonText - Text to display on submit button.
 * @return {JSX} - Generic form to apply CRUD methods to server.
 */
export default function CardForm({ title, initialForm, inputList, requestType, buttonText }) {
  // Context for retrieving and dispatching User state from and to AppContext
  const { state, dispatch } = useContext(AppContext);

  // Data to send to server for applying CRUD methods
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

  // Trigger CRUD request to server
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create temp form obj and remove empty fields
    const filteredForm = form;
    Object.keys(filteredForm).forEach((key) => filteredForm[key] === "" && delete filteredForm[key]);

    switch (requestType) {
      case "addNewUser":
        const messageHtml = renderEmail(<ContactEmail {...form} />);
        addNewUser({ ...form, messageHtml }, dispatch, setAlertMessage);
        break;
      case "loginUser":
        loginUser(form, dispatch, setAlertMessage);
        break;
      case "editUser":
        editUser(state.user, filteredForm, dispatch, setAlertMessage);
        break;
      default:
        break;
    }
  };

  return (
    <div className="card">
      <h2>{title}</h2>

      {alertMessage.isActive && <Alert severity={alertMessage.severity} message={alertMessage.message} />}

      <form onSubmit={handleSubmit}>
        {inputList.map(({ type, name, label, required }, index) => (
          <Input
            key={`${name}-${index}`}
            type={type}
            name={name}
            label={label}
            value={form[name]}
            onChange={handleChange}
            required={required}
          />
        ))}
        <button type="submit" className="primary-button">
          {buttonText}
        </button>
      </form>
    </div>
  );
}
