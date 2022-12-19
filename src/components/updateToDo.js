import { FaPencilAlt } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { BiCalendarCheck } from 'react-icons/bi';

/**
 * Updates the task that the user wants
 * @param {*} props contains the task list and its update function, and the state function to disable the update page
 * @returns {JSX Element} Form containing the task which is to be updated
 */
export default function Update(props) {
    const { id, todoList, updateToDoList, updatePendingTasks, updateToDO } = props;

    function handleUpdate(event) {

        event.preventDefault()

        let entry = event.target[0].value;

        updateToDoList(todo => {
            // updating the task with the given id
            todo[id].task = entry
            return todo
        });

        updatePendingTasks(
            list => {
                let newList = []

                list.forEach(todo => {

                    if (todo.key === id) {
                        let newToDo = <li key={id}>
                            <button className="completed" onClick={todo.props.children[0].props.onClick}><BiCalendarCheck /></button>
                            <p>{entry}</p>
                            <AiFillDelete onClick={todo.props.children[2].props.onClick}/>
                            {/* taking the on click function directly from the previous list */}
                            <FaPencilAlt onClick={todo.props.children[3].props.onClick} />
                        </li>

                        // pushing the updated list into the new list
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
        <form onSubmit={handleUpdate} className="task-updater">
            <input type="text" defaultValue={todoList[id].task} required placeholder="Add a To Do" />
            <input type="submit" value="Update" />
        </form>
    );
}