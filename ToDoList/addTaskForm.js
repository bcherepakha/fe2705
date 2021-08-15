export class AddTaskForm {
    constructor( addTaskHandler, changeInputHandler ) {
        this.formEl = document.querySelector('.header');
        this.inputEl = this.formEl.elements.task;
        this.completeEl = this.formEl.elements.complete;

        this.addTaskHandler = addTaskHandler;
        this.changeInputHandler = changeInputHandler;

        this.formEl.addEventListener('submit', this.addTask.bind(this));
        this.inputEl.addEventListener('input', this.onInput.bind(this));
    }

    onInput() {
        if (this.changeInputHandler) {
            this.changeInputHandler(this.inputEl.value);
        }
    }

    addTask(e) {
        e.preventDefault();

        const text = this.inputEl.value.trim();
        const completed = this.completeEl.checked;

        if (text.length < 5) {
            alert('Введите более 5 символов');

            return ;
        }

        this.inputEl.value = '';

        if (this.addTaskHandler) {
            this.addTaskHandler({ text, completed });
        }
    }
}
