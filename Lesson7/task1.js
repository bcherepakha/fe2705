/* eslint-disable no-unused-vars */
// 1. Вывести в консоль числа от 1 до n, где n - это произвольное целое число большее 1.
// 2. Вывести в консоль простые числа от 1 до n.
// 3. Вывести в консоль числа кратные k, в диапазоне от 1 до n. => in home (for)
// 4. В третьей задаче добавить пользователю возможность ввести значения переменных. => in home
// 5. Выводить в консоль простые числа от 1 до n до тех пор, пока пользователь не скажет хватить.

function consoleNumbers(n) {
    let result = '';
    let i = 1;

    for (; i <= n; i++) {
        if (i>1) {
            result = result + ', ';
        }

        result = result + i;
    }

    console.log(result);
}

// consoleNumbers(1); // 1
// consoleNumbers(5); // 1, 2 ... 5

function isSimple(n) {
    // for (let d = 2; d < n; d++) {
    //     if (n % d === 0) {
    //         return false;
    //     }
    // }

    // return true;
    let d = 2;

    while (d < n) {
        if (n % d === 0) {
            return false;
        }

        d++;
    }

    return true;
}

function consoleSimpleNumbers(n) {
    let result = '';
    let i = 1;

    while (i<=n) {
        if (isSimple(i)) {
            if (result.length > 0) {
                result += ', ';
            }

            result += i; //* result = result + i
        }

        i++;
    }

    console.log(result);
}

// consoleSimpleNumbers(30);

function consoleNumbersDividdedByK(n, k) {

}

consoleNumbersDividdedByK(10, 2); //* 2, 4, 6, 8, 10
consoleNumbersDividdedByK(20, 3); //* 3, 6, 9, 12, 15, 18
