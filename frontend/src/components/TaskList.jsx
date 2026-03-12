import './TaskList.css'

function TaskList({ tasks, onDelete, onEdit }) {
    return (
        <>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input type="checkbox" onChange={() => onDelete(task.id)} />
                        {task.task}
                        <button onClick={() => onEdit(task.id)}>Edit</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default TaskList