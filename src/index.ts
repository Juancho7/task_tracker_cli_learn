import * as fs from "fs";

const args = process.argv.slice(2);

const command = args[0]

interface Task {
    id: number;
    description: string;
    status: "todo" | "in-progress" | "done";
    createdAt: Date;
    updatedAt: Date;
}

const loadTasks = (): Task[] => {
    if (!fs.existsSync("tasks.json")) {
        return [];
    } else {
        const content = fs.readFileSync("tasks.json", "utf-8");

        return JSON.parse(content)
    }
};

const saveTasks = (tasks: Task[]) => {
    const content = JSON.stringify(tasks)

    fs.writeFileSync("tasks.json", content)
}

const addTask = (tasks: Task[], description: string) => {
    const lastId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
    const newId = lastId + 1;

    const newTask: Task = {
    id: newId,
    description: description,
    status: "todo",
    createdAt: new Date(),
    updatedAt: new Date()
    };

    tasks.push(newTask)

    saveTasks(tasks)

    console.log("Task added successfully with ID: ", newId)
}

const updateTask = (id: number, newDescription: string): Task[] => {
    const currentTasks = loadTasks()

    const updatedTasks = currentTasks.map(t => {
        if (t.id === id) {
            return { ...t, description: newDescription, updatedAt: new Date() }
        }
        return t
    })

    saveTasks(updatedTasks)

    return updatedTasks
}

const deleteTask = (id: number): Task[] => {
    const currentTasks = loadTasks()

    const survivingTasks = currentTasks.filter(t => t.id !== id)

    saveTasks(survivingTasks)

    return survivingTasks
}

const markInProgress = (id: number): Task[] => {
    const currentTasks = loadTasks()

    const updatedTasks = currentTasks.map(t => {
        if (t.id === id) {
            return { ...t, status: "in-progress" as Task["status"], updatedAt: new Date() }
        }
        return t
    })

    saveTasks(updatedTasks)

    return updatedTasks
}

const markDone = (id: number): Task[] => {
    const currentTasks = loadTasks()

    const updatedTasks = currentTasks.map(t => {
        if (t.id === id) {
            return { ...t, status: "done" as Task["status"], updatedAt: new Date() }
        }
        return t
    })

    saveTasks(updatedTasks)

    return updatedTasks
}

const listTasks = (status?: string): Task[] => {
    const currentTasks = loadTasks()

    if (!status) {
        return currentTasks
    }

    const filteredTasks = currentTasks.filter(t => t.status === status)

    return filteredTasks
}

switch (command) {
    case "add":
        const currentTasks = loadTasks()    
        const description = args[1]

        if (!description || description.length == 0) {
            console.log("Description missing, please write down a description")
            break;
        }

        addTask(currentTasks, description)
        break;
    case "update":
        const newDescription = args[2]
        
        if (!args[1] || !newDescription) {
            console.log("Some data missing, please write down the missing data, ID or a new description for the task")
            break;
        }
        
        const taskId = parseInt(args[1])

        updateTask(taskId, newDescription)
        break;
    case "delete": {
        if (!args[1]) {
            console.log("ID missing, please write down an ID")
            break;
        }

        const id = parseInt(args[1])

        deleteTask(id)

        console.log("Task deleted succesfully")
        break;
    }
    case "mark-in-progress": {
        if (!args[1]) {
            console.log("ID missing, please write down an ID")
            break;
        }

        const id = parseInt(args[1])

        markInProgress(id)

        console.log("Task marked as in progress succesfully")
        break;
    }
    case "mark-done":
        {
        if (!args[1]) {
            console.log("ID missing, please write down an ID")
            break;
        }

        const id = parseInt(args[1])

        markDone(id)

        console.log("Task marked as done succesfully")
        break;
    }
    case "list":
        const taskStatus = args[1]
        const filteredTasks = listTasks(taskStatus)

        console.log(filteredTasks)
        break;
    default:
        console.log("Unknown command");
}