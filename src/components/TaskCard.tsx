import type { Task, TaskStatus } from "../models/Task";
import editIcon from '../assets/edit.png'
import deleteIcon from '../assets/delete.png'

type TaskCardProps = {
    tasks: Task[]
    status: TaskStatus
    deleteTask: (id: number) => void
    changeTask: (id: number) => void
    onDragStart: (id: number) => void
}

function TaskCard({ tasks, status, deleteTask, changeTask, onDragStart }: TaskCardProps) {

    return (
        <div className='cards'>
            {tasks.filter(task => task.status === status).map(task => ( //dont use map(task, id ) & key= {id} bc id is index in array not task.id
                <div className='task' key={task.id}
                    draggable
                    onDragStart={() => onDragStart(task.id)}
                >
                    <div className='data'>
                        <div className='title'>{task.title}</div>
                        <div className='definition'>{task.description}</div>
                    </div>
                    <div className='actions'>
                        <button className="icon" onClick={() => changeTask(task.id)}><img src={editIcon} alt="Edit" /></button>
                        <button className="icon" onClick={() => deleteTask(task.id)}><img src={deleteIcon} alt="Delete" /></button>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default TaskCard;