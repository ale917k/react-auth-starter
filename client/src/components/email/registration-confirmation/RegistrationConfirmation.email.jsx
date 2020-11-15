import React from "react";
import { Email, Item } from "react-html-email";

/**
 * Registration Confirmation email sent once a new User registers.
 * @param {string} email - Email used by the user during registration.
 * @param {string} username - Username used by the user during registration.
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
