import React, { useState, useContext } from "react";

import Input from "../input/Input.component";
import Alert from "../alert/Alert.component";

import { Store } from "../../../context/Store";

import {
  addNewUser,
  loginUser,
  editUser,
  deleteUser,
} from "../../../api/users.api";

import "./CardForm.styles.scss";

/**
 * CardForm component used to handle any CRUD method through form and Hooks.
 * @param {string} title - Title to display on top of the form.
 * @param {string} initialForm - Initial shape of the form data.
 * @param {string} inputList - List of inputs and related attributes to display on the form.
 * @param {string} requestType - Type of CRUD request to apply.
 * @return {JSX} - Generic form to apply CRUD methods to server.
 */
export default function CardForm({
  title,
  initialForm,
  inputList,
  requestType,
}) {
  // Context for retrieving and dispatching User state from and to Store
  const { state, dispatch } = useContext(Store);

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
  };

  // Trigger CRUD request to server
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create temp form obj and remove empty fields
    const filteredForm = form;
    Object.keys(filteredForm).forEach(
      (key) => filteredForm[key] === "" && delete filteredForm[key]
    );

    switch (requestType) {
      case "addUser":
        // addNewUser(state.user, filteredForm, dispatch, setAlertMessage);
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

      {alertMessage.isActive && (
        <Alert
          severity={alertMessage.severity}
          message={alertMessage.message}
        />
      )}

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
          Update
        </button>
      </form>
    </div>
  );
}
