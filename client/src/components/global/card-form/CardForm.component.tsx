import React, { useState, useContext } from "react";
import { renderEmail } from "react-html-email";
import Input from "../input/Input.component";
import Alert from "../alert/Alert.component";
import RegistrationConfirmation from "../../email/registration-confirmation/RegistrationConfirmation.email";
import { AppContext } from "../../../context/context";
import { addNewUser, authenticateUser, editUser } from "../../../api/users.api";
import "./CardForm.styles.scss";

type InputType = {
  id: string;
  type: string;
  name: string;
  label: string;
  required: boolean;
};

type PropsType = {
  title: string;
  initialForm: Record<string, string>;
  inputList: Array<InputType>;
  requestType: string;
  buttonText: string;
};

/**
 * Handle any CRUD method through dynamic form and Hooks.
 * @param {string} title - Title to display on top of the form.
 * @param {Object} initialForm - Initial shape of the form data.
 * @param {array} inputList - List of inputs and related attributes to display on the form.
 * @param {string} requestType - Type of CRUD request to apply.
 * @param {string} buttonText - Text to display on submit button.
 * @return - Generic form to apply CRUD methods to server.
 */
const CardForm: React.FC<PropsType> = ({ title, initialForm, inputList, requestType, buttonText }: PropsType) => {
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
  const handleChange = (event: React.SyntheticEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setForm({ ...form, [name]: value });
    setAlertMessage(initialAlertMessage);
  };

  // Trigger CRUD request to server
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create temp form obj and remove empty fields
    const filteredForm = Object.entries(form).reduce(
      (acc, [key, value]) => ({ ...acc, ...(value !== "" && { [key]: value }) }),
      {},
    );

    switch (requestType) {
      case "addNewUser":
        const messageHtml = renderEmail(<RegistrationConfirmation email={form.email} username={form.username} />);
        addNewUser(
          { email: form.email, username: form.username, password: form.password, messageHtml },
          dispatch,
          setAlertMessage,
        );
        break;
      case "loginUser":
        authenticateUser(form as LogUserFormType, dispatch, setAlertMessage);
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
        {inputList.map(({ id, type, name, label, required }, index) => (
          <Input
            key={`${name}-${index}`}
            id={id}
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
};

export default CardForm;
