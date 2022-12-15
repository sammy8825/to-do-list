import React from "react";

import Welcome from "./components/welcomePage";
import ToDoList from "./components/todoListPage";

export default function App() {
  const [userName, setUserName] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserName(event.target[0].value);
  }


  return (
    userName === "" ? <Welcome handleSubmit={handleSubmit} /> : <ToDoList userName={userName} />
  );
}