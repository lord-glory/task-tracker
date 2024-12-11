# CLI Task Tracker

## Description
The CLI Task Tracker is a command-line application that allows users to track and manage their tasks efficiently. It supports adding, updating, deleting, and listing tasks with specific statuses. Tasks are stored in a JSON file, ensuring persistence across sessions.

## Features
- Add a new task.
- Update an existing task's description.
- Delete a task.
- Mark a task as "in progress" or "done."
- List all tasks or filter tasks by their status: "todo," "in-progress," or "done."

## Task Properties
Each task includes the following properties:
- **id**: A unique identifier for the task.
- **description**: A short description of the task.
- **status**: The status of the task ("todo," "in-progress," "done").
- **createdAt**: The date and time when the task was created.
- **updatedAt**: The date and time when the task was last updated.

## Usage
Run the application using the command line. Below are the available commands:

### Add a Task
```bash
task-cli add "Task description"
