function validate(input) {
    if (!checkInt(input)) return false;
    if (!check1(input)) return false;
    if (!check2(input)) return false;
    if (!check3(input)) return false;
    if (!check4(input)) return false;
    return true;
}

function checkInt(val) {
    return Number.isInteger(val);
}

function check1(val) {

    if (val.toString().length >= 6) return true;
    else return false;
}

function check2(val) {
    let chkarr = 0
    let arr = val.toString().split("");
    for (let i = 0; i < arr.length; i += 2) {
        if (arr[i] == arr[i + 1]) {
            chkarr += 1;
        }

    }
    if (chkarr > 2) return false
    return true;
}

function check3(val) {
    let chkarr = 0
    let arr = val.toString().split("");
    for (let i = 0; i < arr.length; i++) {
        const currentDigit = arr[i];
        const nextDigit = arr[i + 1];
        // console.log()
        if (

            currentDigit - nextDigit == 1 ||
            currentDigit - nextDigit == -1
        ) {
            chkarr += 1;
            if (chkarr == 2) return false;
        }
        else {
            chkarr = 0
        }
    }
    if (chkarr > 2) return false
    return true;
}

function check4(input) {
    const digitSets = new Set();
    let arr = input.toString().split("");
    for (let i = 0; i < arr.length; i += 2) {
        if (arr[i] == arr[i + 1]) {
            const set = arr.slice(i, i + 2);
            digitSets.add(set);
        }
        if (digitSets.size > 2) return false;
    }
    return true;
}

console.log(validate(118822))