const SERVER_BASE = 'https://5d9969125641430014051850.mockapi.io';

export class ServerStore {
    search(searchStr) {
        let { search } = location;

        if (!search.includes('?')) {
            search = '?';
        } else {
            search += '&';
        }

        search += `search=${encodeURI(searchStr)}`;

        return fetch(`${SERVER_BASE}/tasks${search}`)
            .then(response => response.json())
            .catch(err => {
                alert('Server not responded');
                console.error(err.message);

                return [];
            });
    }

    read() {
        return fetch(`${SERVER_BASE}/tasks${location.search}`)
            .then(response => response.json())
            .catch(err => {
                alert('Server not responded');
                console.error(err.message);

                return [];
            });
    }

    changeTask(taskId, taskData) {
        return fetch(`${SERVER_BASE}/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData)
        })
            .then(response => response.json());
    }

    removeTask(taskId) {
        return fetch(`${SERVER_BASE}/tasks/${taskId}`, {
            method: 'DELETE'
        })
            .then(response => response.json());
    }

    addTask(taskData) {
        return fetch(`${SERVER_BASE}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData)
        })
            .then(response => response.json())
            .catch(err => {
                // alert('Server not responded');
                console.error(err.message);

                throw new Error('Server not responded');
            });
    }
}
