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

const listTasks = (status?: string): Task[] => {
    const currentTasks = loadTasks()

    if (!status) {
        return currentTasks
    }

    const filteredTasks = currentTasks.filter(t => t.status === status)

    return filteredTasks
}

const deleteTask = (id: number) => {
    const currentTasks = loadTasks()

    const survivingTasks = currentTasks.filter(t => t.id !== id)

    saveTasks(survivingTasks)

    return survivingTasks
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
        break;
    case "delete": 
        if (!args[1]) {
            console.log("ID missing, please write down an ID")
            break;
        }
        
        const id = parseInt(args[1])

        deleteTask(id)
        
        console.log("Task deleted succesfully")
        break;
    case "mark-in-progress":
        break;
    case "mark-done":
        break;
    case "list":
        const filteredTasks = listTasks(args[1])

        console.log(filteredTasks)
        break;
    default:
        console.log("Unknown command");
}