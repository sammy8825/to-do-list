import React from "react"
import { nanoid } from "nanoid";
import { FaPencilAlt } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { BiCalendarCheck } from 'react-icons/bi';

import Update from "./updateToDo";

export default function ToDoList(props) {

    // Contains the to dos
    const [todoList, updateToDoList] = React.useState({});

    // Contains the completed tasks
    const [completedTasks, updateCompletedTasks] = React.useState([]);

    // Contains the to dos in the html
    const [pendingTasks, updatePendingTasks] = React.useState([]);

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

        updatePendingTasks(pendingToDo => { return pendingToDo.filter(todo => todo.key !== id) })
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
     * Moving the completed tasks to the completed section and undo the completed one
     * @param {String} id 
     */

    function handleCompletion(id) {

        updateToDoList(todos => {
            todos[id].didComplete = !todos[id].didComplete;

            let task = <li key={id}>
                <button className="completed" onClick={() => handleCompletion(id)}><BiCalendarCheck /></button>
                {todos[id].task}
                <AiFillDelete onClick={() => handleDelete(id)} />
                <FaPencilAlt onClick={() => handleUpdate(id)} />
            </li>

            if (todos[id].didComplete) {
                updateCompletedTasks(oldCompleted => {
                    return [task, ...oldCompleted];
                })

                updatePendingTasks(prevToDos => prevToDos.filter(todo => todo.key !== id));
            } else {
                updatePendingTasks(oldToDo => {
                    return [task, ...oldToDo];
                })

                updateCompletedTasks(oldCompleted => oldCompleted.filter(todo => todo.key !== id));
            }
            return todos;
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

        let newToDO = {};
        newToDO[uniqueID] = { task: entry, didComplete: false };


        // updating the to do list
        updateToDoList((prevToDO) => {
            return { ...newToDO, ...prevToDO };
        })

        // updataing the previous values
        updatePendingTasks(prevDisplay => {

            return [
                <li key={uniqueID}>
                    <button className="completed" onClick={() => handleCompletion(uniqueID)}><BiCalendarCheck /></button>
                    {entry}
                    <AiFillDelete onClick={() => handleDelete(uniqueID)} />
                    <FaPencilAlt onClick={() => handleUpdate(uniqueID)} />
                </li>
                ,
                ...prevDisplay
            ]

        })
        // clearing the previous input
        event.target[0].value = ""
    }

    /**
     * Deleting all the completed tasks
     */
    function deleteCompleted() {
        updateCompletedTasks([]);
    }

    return (
        <>
            <h1>welcome, {props.userName}!</h1>
            <div className="task-area">

                <div className="pending-tasks">
                    <h2>Thing's to do !</h2>
                    {
                        updateToDO.wantToUpdate === true ?
                            <Update
                                id={updateToDO.idToUpdate}
                                todoList={todoList}
                                updateToDoList={updateToDoList}
                                updatePendingTasks={updatePendingTasks}
                                updateToDO={setUpdateToDo}
                            />
                            :
                            <div>
                                <form onSubmit={addToDO}>
                                    <input type="text" required placeholder="Add a To Do" />
                                    <input type="submit" value="Add Task" />
                                </form>
                                <ul className="pendingTasks">
                                    {pendingTasks}
                                </ul>
                            </div>
                    }
                </div>
                <div className="completed-tasks ">
                    <h2>Tasks Completed</h2>
                    <ul className="completedTasks">
                        {completedTasks}
                    </ul>
                    <button onClick={deleteCompleted}>Clear All</button>
                </div>
            </div>
        </>
    )
}