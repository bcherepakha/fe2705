import { AddTaskForm } from './addTaskForm.js';
import { Task } from './Task.js';
import { List } from './List.js';
import { Store } from './Store.js';
import { Counter } from './counter.js';

new AddTaskForm( addTaskHandler );
const list = new List(isCompleted);
const store = new Store();
const counter = new Counter();

init();

function init() {
    store.read()
        .then(tasks => list.addItems(tasks.map(createTask)))
        .then(updateCounter)
        .catch(error => console.log(error));
}

function isCompleted(item) {
    return item.data.completed;
}

async function changeTask(task, data) {
    try {
        const newData = await store.changeTask(data.id, data);

        task.changeData(newData);
        updateCounter();
    } catch(err) {
        console.log(err);
    }
}

async function changeTextHandler(e) {
    const { target: task, data } = e;

    return await changeTask(task, data);
}

async function toggleCompletedHandler(e) {
    const task = e.target;
    const taskData = {...task.data};

    taskData.completed = !taskData.completed;

    // store.changeTask(taskData.id, taskData)
    //     .then(newData => {

    //     })
    //     .catch(...)
    return changeTask(task, taskData);
}

function destroyTaskHandler(e) {
    const task = e.target;

    store.removeTask(task.data.id)
        .then(() => list.removeItem(task))
        .then(updateCounter)
        .catch((err) => console.log(err));
}

function addTaskHandler(taskData) {
    store.addTask(taskData)
        .then(createTask)
        .then(task => list.addItem(task))
        .then(updateCounter)
        .catch(error => {
            alert(error.message);
        });
}

function createTask(taskData) {
    const task = new Task(taskData);

    task.addEventListener('destroy', destroyTaskHandler);
    task.addEventListener('toggleCompleted', toggleCompletedHandler);
    task.addEventListener('changeText', changeTextHandler);

    return task;
}

function updateCounter() {
    counter.setValue(list.size, list.completed);
}
