export class Store {
    read() {
        const data = localStorage.tasks;

        try {
            const dataArr = JSON.parse(data);

            if (!Array.isArray(dataArr)) {
                throw new Error();
            }

            if (!dataArr.every(t => t.id && t.text && typeof t.completed === 'boolean')) {
                throw new Error();
            }

            return Promise.resolve(dataArr);
        } catch(ex) {
            console.log('wrong data, can\'t parse');

            return Promise.resolve([]);
        }
    }

    async changeTask(taskId, taskData) {
        const tasks = await this.read();
        const changedTaskIndex = tasks.findIndex(task => task.id === taskId);

        if (changedTaskIndex === -1) {
            throw new Error('task not found');
        }

        tasks[changedTaskIndex] = taskData;

        await this.save(tasks);

        return taskData;
    }

    removeTask(taskId) {
        return this.read()
            .then(tasks => {
                const newTasks = tasks.filter(task => task.id !== taskId);

                return newTasks;
            })
            .then((tasks) => this.save(tasks));
    }

    addTask(taskData) {
        if (!taskData.id) {
            taskData.id = Date.now();
        }

        return this.read()
            .then(tasks => {
                if (tasks.find(t => t.id === taskData.id)) {
                    throw new Error('duplicate id');
                }

                return tasks;
            })
            .then(tasks => {
                tasks.push(taskData);

                // eslint-disable-next-line promise/no-nesting
                return this.save(tasks)
                    .then(() => taskData);
            });
    }

    save(data) {
        return new Promise((resolve) => {
            localStorage.tasks = JSON.stringify(data);

            return resolve();
        });
    }
}
