import React from "react";
import { Email, Item } from "react-html-email";

/**
 * Registration Confirmation email sent once a new User registers.
 * @param {string} email - Wrapped children elements.
 * @param {string} subject - Additional class names parsed.
 * @param {string} message - Additional class names parsed.
 * @return {JSX} - Registration Confirmation email template.
 */
export default function RegistrationConfirmation({ email, username }) {
  return (
    <Email title="Portfolio Email!">
      <Item>
        Thank you for registering a new account with us. You can review your
        information below:
      </Item>
      <Item>Email: {email}</Item>
      <Item>Username: {username}</Item>
    </Email>
  );
}
