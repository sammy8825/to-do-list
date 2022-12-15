import React from "react";

import Welcome from "./components/welcomePage";
import ToDoList from "./components/todoListPage";

export default function App() {
  const [userName, setUserName] = React.useState("");

  /**
   * Updates the username
   * @param {Event} event The event object passed when the task is submitted
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    setUserName(event.target[0].value);
  }


  return (
    userName === "" ? <Welcome handleSubmit={handleSubmit} /> : <ToDoList userName={userName} />
  );
}