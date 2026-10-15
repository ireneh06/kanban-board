import { useState } from 'react'
import type { TaskStatus, Task } from '../models/Task.ts'


type TaskFormProps = {
    chosenTask: Task | undefined
    selectedStatus: TaskStatus
    onClose: () => void
    onSave: (title: string, description: string, status: TaskStatus) => void
};


function TaskForm({ chosenTask, selectedStatus, onClose, onSave }: TaskFormProps) {

    const [title, setTitle] = useState(chosenTask?.title || '')
    const [description, setDescription] = useState(chosenTask?.description || '')
    const [status, setStatus] = useState<TaskStatus>(chosenTask?.status || selectedStatus)


    function checkInput() {
        if (title.trim() == "" || description.trim() === "") {
            alert("Complete input to continue!")
            return
        }
        onSave(title, description, status)
    }

    return (
        <div className="formOverlay">
            <div className="taskForm">
                <div className="taskFormNewTask">
                    <p>{chosenTask ? "Edit Task" : "Create new Task"}</p>
                </div>
                <div className="taskFormTitle">
                    <p>Title:</p>
                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" />
                </div>
                <div className="taskFormDescription">
                    <p>Description:</p>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div className="taskFormStatus">
                    <p>Select status:</p>
                    <select value={status} onChange={e => setStatus(e.target.value as TaskStatus)}>
                        <option value="todo">ToDo</option>
                        <option value="inProgress">in Progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>
                <div className="taskFormButtons">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={() => checkInput()}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default TaskForm;