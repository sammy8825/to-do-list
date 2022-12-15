import React from "react"
import { nanoid } from "nanoid";

export default function ToDoList(props) {

    // Contains the to dos
    const [todoList, updateToDoist] = React.useState({});

    // Contains the to dos in the html
    const [display, setDisplay] = React.useState([]);

    function addToDO(event) {
        event.preventDefault();
        let uniqueID = nanoid();
        let entry = event.target[0].value;

        // updating the to do list
        updateToDoist((prevToDO) => {
            let newToDO = {};
            newToDO[uniqueID] = entry;
            return { ...newToDO, ...prevToDO };
        })

        // updataing the previous values
        setDisplay(prevDisplay => {
            let newDisplay = [<li key={uniqueID}>{entry}</li>];
            return [ ...newDisplay, ...prevDisplay ]
        })

        // clearing the previous input
        event.target[0].value = ""
    }

    // console.log(display.length !== 0 ? display[0].key : "" )

    return (<>
        <div>
            <h1 style={{ textTransform: 'capitalize' }}>welcome, {props.userName}!</h1>
        </div>

        <div>
            <form onSubmit={addToDO}>
                <input type="text" required placeholder="Add a To Do" />
                <input type="submit" value="Add To Do" />
            </form>
            <ul>
                {display}
            </ul>
        </div>

    </>)
}