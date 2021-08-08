import { AddTaskForm } from './addTaskForm.js';
import { Task } from './Task.js';
import { List } from './List.js';
import { Store } from './Store.js';

new AddTaskForm( addTaskHandler );
const list = new List();
const store = new Store();

init();

function init() {
    store.read()
        .then(tasks => list.addItems(tasks.map(createTask)))
        .catch(error => console.log(error));
}

function destroyTaskHandler(e) {
    console.log( e );
}

function addTaskHandler(taskData) {
    store.addTask(taskData)
        .then(createTask)
        .catch(error => {
            alert(error.message);
        });
}

function createTask(taskData) {
    const task = new Task(taskData);

    task.addEventListener('destroy', destroyTaskHandler);

    list.addItem(task);

    return task;
}
