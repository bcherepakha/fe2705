import { AddTaskForm } from './addTaskForm.js';
import { Task } from './Task.js';
import { List } from './List.js';
import { ServerStore } from './ServerStore.js';
import { Counter } from './counter.js';
import { Filter } from './filter.js';

new AddTaskForm( addTaskHandler, throttle(changeInputHandler, 400) );
const list = new List(isCompleted);
const store = new ServerStore();
const counter = new Counter();
const filter = new Filter();

init();

function init() {
    filter.addEventListener('change', onChangeFilterHandler);

    store.read()
        .then(tasks => list.addItems(tasks.map(createTask)))
        .then(updateCounter)
        .then(onChangeFilterHandler)
        .catch(error => console.log(error));
}

function isCompleted(item) {
    return item.data.completed;
}

async function changeTask(task, data) {
    try {
        const newData = await store.changeTask(data.id, data);

        task.changeData(newData);
        task.setVisibility( isTaskVisible(task) );
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
        .then(task => {
            list.addItem(task);
            task.setVisibility( isTaskVisible(task) );

            return task;
        })
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

function isTaskVisible(task) {
    const { currentFilter } = filter;

    switch (currentFilter) {
    case '#/active':
        return !task.data.completed;
    case '#/completed':
        return task.data.completed;
    default:
        return true;
    }
}

function onChangeFilterHandler() {
    list.filter( isTaskVisible );
}

function throttle(callback, time) {
    let _lastCall = 0;
    let timeoutId = null;

    return function (...args) {
        const previousCall = _lastCall;

        _lastCall = Date.now();

        if (_lastCall - previousCall < time && timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            _lastCall = 0;
            return callback.apply(this, args);
        }, time);
    };
}

function changeInputHandler(text) {
    // console.log(text);
    // list.filter(task => task.data.text.toLowerCase().includes(text.toLowerCase()));
    store.search(text)
        .then(data => console.log(data))
        .catch(err => console.log(err));
}
