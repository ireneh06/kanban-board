export type TaskStatus = "todo" | "inProgress" | "done"

export type Task = {
    id: number,
    title: string,
    description: string,
    status: TaskStatus
}