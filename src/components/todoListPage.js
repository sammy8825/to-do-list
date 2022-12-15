import React from "react"
import { nanoid } from "nanoid";
import { FaPencilAlt } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

import Update from "./updateToDo";

export default function ToDoList(props) {

    // Contains the to dos
    const [todoList, updateToDoList] = React.useState({});

    // Contains the to dos in the html
    const [display, setDisplay] = React.useState([]);

    // update a to do
    const [updateToDO, setUpdateToDo] = React.useState({ wantToUpdate: false, idToUpdate: "" });

    /**
     * Deletes the task from the list
     * @param {String} id ID of the task
     */
    function handleDelete(id) {
        updateToDoList(todos => {
            delete todos[id]
            return todos
        });
        setDisplay(todoDisplay => { return todoDisplay.filter(todoElement => todoElement.key !== id) })
    }

    /**
     * Updates the state so that update page can be viewed
     * @param {String} id ID of the task
     */
    function handleUpdate(id) {

        setUpdateToDo(() => {
            return {
                wantToUpdate: true,
                idToUpdate: id
            }
        })
    }

    /**
     * Adds a task to the list
     * @param {Event} event Event object passed to the function when an action is performed
     */
    function addToDO(event) {
        event.preventDefault();
        let uniqueID = nanoid();
        let entry = event.target[0].value;

        // updating the to do list
        updateToDoList((prevToDO) => {
            let newToDO = {};
            newToDO[uniqueID] = entry;
            return { ...newToDO, ...prevToDO };
        })

        // updataing the previous values
        setDisplay(prevDisplay => {
            let newDisplay = [
                <li key={uniqueID}>{entry} <AiFillDelete onClick={() => handleDelete(uniqueID)} /> <FaPencilAlt onClick={() => handleUpdate(uniqueID)} /> </li>
            ];
            return [...newDisplay, ...prevDisplay]
        })

        // clearing the previous input
        event.target[0].value = ""
    }

    return (
        <>
            <div>
                <h1 style={{ textTransform: 'capitalize' }}>welcome, {props.userName}!</h1>
            </div>
            {
                updateToDO.wantToUpdate === true ?
                    <Update
                        id={updateToDO.idToUpdate}
                        todoList={todoList}
                        updateToDoList={updateToDoList}
                        setDisplay={setDisplay}
                        updateToDO={setUpdateToDo}
                    />
                    :
                    <div>
                        <form onSubmit={addToDO}>
                            <input type="text" required placeholder="Add a To Do" />
                            <input type="submit" value="Add To Do" />
                        </form>
                        <ul>
                            {display}
                        </ul>
                    </div>
            }

        </>
    )
}