//* Загадать число 0 ... 10
//* Произвольно выбирает число из того же диаппазона
//* если числа совпали, то пользователь получает 2 балла
//* если они отличаются не более, чем на 40% от максимума, то 1 балл
//* иначе 0 баллов

const localStorageKey = 'task1';

function checkUserNumber(userNumber, computerNumber, diff = 1) {
    if (userNumber === computerNumber) {
        return 2;
    }

    //* userNumber = 5
    //* computerNumber = 8
    //* userNumber - computerNumber <= diff && userNumber > computerNumber
    //* computerNumber - userNumber <= diff && userNumber < computerNumber
    //* (5 - 8 <= 1 && 5 > 8) || (8 - 5 <= 1 && 5 < 8)
    //* (-3 <= 1 && false) || (3 <= 1 && true)
    //* false || false
    // if ((userNumber - computerNumber <= diff && userNumber > computerNumber)
    //     || (computerNumber - userNumber <= diff && userNumber < computerNumber)) {
    //     return 1;
    // }

    if (Math.abs(userNumber - computerNumber) <= diff) {
        return 1;
    }

    return 0;
}

function getRandomNumber(min = 0, max = 10) {
    return Math.round(Math.random()*(max - min) + min);
}

function inRange(num, min = 0, max = 10) {
    return num >= min && num <= max;
}

function getDiff(min = 0, max = 10, complexity = .4) {
    return Math.max(Math.round(complexity * (max - min)), 1);
}

function askUserNumber(min, max, submitHandler) {
    showPrompt(
        `Введите число от ${min} до ${max}`,
        min,
        (num) => {
            return submitHandler(num === null ? null : parseInt(num, 10));
        }
    );
}

function printResult() {
    const resultEl = document.querySelector('.task1 [data-value="result"]');
    const currentValue = parseInt(readFromLocalStorage(), 10);

    resultEl.innerText = currentValue;
}

function addResult(result) {
    const resultEl = document.querySelector('.task1 [data-value="result"]');
    const currentValue = parseInt(resultEl.innerText, 10);
    const newValue = currentValue + result;

    resultEl.innerText = newValue;
    saveToLocalStorage(newValue);
}

function resetResult() {
    const resultEl = document.querySelector('.task1 [data-value="result"]');

    resultEl.innerText = 0;
    saveToLocalStorage(0);
}

function showPrompt(text, defaultValue, submitHandler) {
    if (!showPrompt.rootEl) {
        showPrompt.rootEl = document.querySelector('.modal.prompt');
        showPrompt.textEl = showPrompt.rootEl.querySelector('.modal__text');
        showPrompt.promtInput = showPrompt.rootEl.querySelector('[name="value"]');
        showPrompt.formEl = showPrompt.rootEl.querySelector('form');
    }

    showPrompt.promtInput.value = defaultValue;
    showPrompt.textEl.innerText = text;
    showPrompt.rootEl.hidden = false;
    showPrompt.promtInput.focus();

    showPrompt.formEl.addEventListener('submit', e => {
        e.preventDefault();

        showPrompt.rootEl.hidden = true;

        if (submitHandler) {
            submitHandler(showPrompt.promtInput.value);
        }
    }, {
        once: true
    });

    showPrompt.formEl.addEventListener('reset', e => {
        e.preventDefault();

        showPrompt.rootEl.hidden = true;

        if (submitHandler) {
            submitHandler(null);
        }
    }, {
        once: true
    });
}

function printDiff(minInputEl, maxInputEl, complexityEl) {
    return function () {
        const min = parseInt(minInputEl.value, 10);
        const max = parseInt(maxInputEl.value, 10);
        const complexity = parseFloat(complexityEl.value);
        const diff = getDiff(min, max, complexity);
        const diffEl = document.querySelector('.task1 [data-name="diff"]');

        diffEl.innerText = diff;
    };
}

function saveToLocalStorage(value) {
    localStorage[localStorageKey] = value;
}

function readFromLocalStorage() {
    return localStorage[localStorageKey] || '0';
}

function prepareGame() {
    const formEl = document.querySelector('.task1 form');
    const resetBtn = document.querySelector('.task1 [data-action="reset"]');
    const maxInputEl = formEl.elements.max;
    const minInputEl = formEl.elements.min;
    const complexityEl = formEl.elements.complexity;
    const printDiffHandler = printDiff(minInputEl, maxInputEl, complexityEl);

    printDiffHandler();
    printResult();

    formEl.addEventListener('change', printDiffHandler);
    formEl.addEventListener('input', printDiffHandler);

    resetBtn.addEventListener('click', resetResult);

    formEl.addEventListener('submit', e => {
        e.preventDefault();
        const min = parseInt(minInputEl.value, 10);
        const max = parseInt(maxInputEl.value, 10);
        const complexity = parseFloat(complexityEl.value);

        askUserNumber(min, max, num => {
            console.log( num );

            if (num !== null) {
                if (!inRange(num, min, max)) {
                    return alert('Вы задумали не правильное число!');
                }

                const computerNumber = getRandomNumber(min, max);
                const result = checkUserNumber(num, computerNumber, getDiff(min, max, complexity));

                alert(`Компьютер загадал: ${computerNumber}. Вы получили ${result} баллов`);

                addResult(result);
            }
        });

    });
}

prepareGame();
