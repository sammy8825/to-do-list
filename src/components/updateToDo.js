import { FaPencilAlt } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';


/**
 * Updates the task that the user wants
 * @param {*} props contains the task list and its update function, and the state function to disable the update page
 * @returns {JSX Element} Form containing the task which is to be updated
 */
export default function Update(props) {
    const { id, todoList, updateToDoList, setDisplay, updateToDO } = props;

    function handleUpdate(event) {
        event.preventDefault()
        let entry = event.target[0].value;

        updateToDoList(todo => {
            todo[id] = entry
            return todo
        });

        setDisplay(
            list => {
                let newList = []

                list.forEach(todo => {
                    if (todo.key === id) {
                        let newToDo = <li key={id}>{entry} <AiFillDelete onClick={todo.props.children[2].props.onClick} /> <FaPencilAlt onClick={todo.props.children[4].props.onClick} /> </li>
                        newList.push(newToDo)
                    }
                    else
                        newList.push(todo)
                })
                return newList
            }
        )

        updateToDO(() => {
            return {
                wantToUpdate: false,
                idToUpdate: ''
            }
        })
    }


    return (
        <form onSubmit={handleUpdate}>
            <input type="text" defaultValue={todoList[id]} required placeholder="Add a To Do" />
            <input type="submit" value="Update" />
        </form>
    );
}