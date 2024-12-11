// Import the required module
const fs = require('fs');
const path = require('path');

// File to store tasks
const TASK_FILE = path.join(__dirname, 'tasks.json');

// Helper to load tasks from the JSON file
function loadTasks() {
    if (!fs.existsSync(TASK_FILE)) {
        return [];
    }
    try {
        const data = fs.readFileSync(TASK_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading tasks file:', error.message);
        return [];
    }
}

// Helper to save tasks to the JSON file
function saveTasks(tasks) {
    try {
        fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error('Error writing to tasks file:', error.message);
    }
}

// Generate a unique ID for tasks
function generateId(tasks) {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
}

// Add a new task
function addTask(description) {
    const tasks = loadTasks();
    const newTask = {
        id: generateId(tasks),
        description,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
}

// Update a task description
function updateTask(id, description) {
    const tasks = loadTasks();
    const task = tasks.find(task => task.id === id);
    if (!task) {
        console.error('Task not found.');
        return;
    }
    task.description = description;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log('Task updated successfully.');
}

// Delete a task
function deleteTask(id) {
    let tasks = loadTasks();
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== id);
    if (tasks.length === initialLength) {
        console.error('Task not found.');
        return;
    }
    saveTasks(tasks);
    console.log('Task deleted successfully.');
}

// Mark a task as in progress
function markInProgress(id) {
    updateStatus(id, 'in-progress');
}

// Mark a task as done
function markDone(id) {
    updateStatus(id, 'done');
}

// Update the status of a task
function updateStatus(id, status) {
    const tasks = loadTasks();
    const task = tasks.find(task => task.id === id);
    if (!task) {
        console.error('Task not found.');
        return;
    }
    task.status = status;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task marked as ${status}.`);
}

// List tasks with optional filter
function listTasks(filter) {
    const tasks = loadTasks();
    let filteredTasks = tasks;

    if (filter) {
        filteredTasks = tasks.filter(task => task.status === filter);
    }

    if (filteredTasks.length === 0) {
        console.log('No tasks found.');
        return;
    }

    filteredTasks.forEach(task => {
        console.log(`ID: ${task.id}, Description: ${task.description}, Status: ${task.status}, CreatedAt: ${task.createdAt}, UpdatedAt: ${task.updatedAt}`);
    });
}

// Main CLI logic
function main() {
    const [action, arg1, ...args] = process.argv.slice(2);
    const arg2 = args.join(' ');

    switch (action) {
        case 'add':
            if (!arg1) {
                console.error('Please provide a task description.');
                break;
            }
            addTask(arg1);
            break;
        case 'update':
            if (!arg1 || !arg2) {
                console.error('Please provide a task ID and description.');
                break;
            }
            updateTask(Number(arg1), arg2);
            break;
        case 'delete':
            if (!arg1) {
                console.error('Please provide a task ID.');
                break;
            }
            deleteTask(Number(arg1));
            break;
        case 'mark-in-progress':
            if (!arg1) {
                console.error('Please provide a task ID.');
                break;
            }
            markInProgress(Number(arg1));
            break;
        case 'mark-done':
            if (!arg1) {
                console.error('Please provide a task ID.');
                break;
            }
            markDone(Number(arg1));
            break;
        case 'list':
            listTasks(arg1);
            break;
        default:
            console.log('Invalid command.');
            console.log('Usage: task-cli <command> [arguments]');
            console.log('Commands: add, update, delete, mark-in-progress, mark-done, list');
            break;
    }
}

main();
