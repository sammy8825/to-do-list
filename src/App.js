import React from "react";

import Welcome from "./components/welcomePage";
import ToDoList from "./components/todoListPage";

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
      setUserName(username);
      setErrorMessage("");
    }
    else
      setErrorMessage("The username should contain only capital and small letters")
  }
  return (
    errorMessage !== "" || userName === "" ?
      <><Welcome handleSubmit={handleSubmit} /> <p >{errorMessage}</p></>
      :
      <ToDoList userName={userName} />
  );
}