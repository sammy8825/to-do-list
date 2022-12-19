import React from "react";
import { RiUserAddLine } from 'react-icons/ri'

import Welcome from "./components/welcomePage";
import ToDoList from "./components/todoListPage";

import "./assets/style.css"

export default function App() {
  const [userName, setUserName] = React.useState("");

  const [errorMessage, setErrorMessage] = React.useState("");
  /**
   * Updates the username
   * @param {Event} event The event object passed when the task is submitted
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    let username = event.target[0].value;

    if (/^[a-zA-Z\-]+$/.test(username)) {
      setUserName(username.toLowerCase());
      setErrorMessage("");
    }
    else
      setErrorMessage("The username should contain only capital and small letters")
  }

  function newUser() {
    setUserName("");
  }

  return (
    errorMessage !== "" || userName === "" ?
      <>
        <nav> <span>TODO</span> </nav>
        <Welcome handleSubmit={handleSubmit} />
        <p className="error-message">{errorMessage}</p>
      </>
      : <>
        <nav> <span>TODO</span> <button onClick={newUser} className="new-user"> <RiUserAddLine /> New User</button></nav>
        <ToDoList userName={userName} />
      </>
  );
}