// Elements

const form = document.getElementsByTagName("form")[0];

const inputs = form.getElementsByClassName("input_form");
const warnings = form.getElementsByTagName("p");
const data_show = document.getElementsByClassName("data_show");

const errors = ["Can't be blank", "Wrong format, letters only", "Wrong format, numbers only"]
const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "à", "á", "â", "ä", "é", "è", "ê", "ë", "ì", "í", "î", "ï", "ò", "ó", "ô", "ö", "ù", "ú", "û", "ü", "ç", "-", " "]
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " "];

const thank_you = document.getElementById("thank_you");
const continue_input = thank_you.getElementsByTagName("input")[0];

const light_front = document.getElementsByClassName("light")[0];
const light_back = document.getElementsByClassName("light")[1];

let total_success = true;

// Functions

/* resetAll : Reset all CSS styles applied due to warnings (warnings content and border color of inputs) */

function resetAll() {
    total_success = true;
    for (let index = 0; index < warnings.length; index = index + 1) {
        warnings[index].innerText = "";
    }
    for (let index = 0; index < inputs.length; index = index + 1) {
        inputs[index].style.borderColor = "#d5d5d5";
    }
}

/* checkBlank : Check if the given input is empty => used for all inputs */

function checkBlank(input, index) {
    if (input.value == "") {
        if (index == 3 || index == 4) {
            warnings[index - 1].innerText = errors[0];
        }
        else {
            warnings[index].innerText = errors[0];
        }
        input.style.borderColor = "hsl(0, 100%, 66%)";
        total_success = false;
        return true;
    }
    else {
        return false;
    }
}

/* checkLetters : Check that all characters in an input are letters only => used for the first input : card_name */

function checkLetters(input, index) {
    for (let character = 0; character < (input.value).length; character = character + 1) {
        if (letters.includes(((input.value).split("")[character]).toLowerCase()) == false) {
            warnings[index].innerText = errors[1];
            input.style.borderColor = "hsl(0, 100%, 66%)";
            total_success = false;
            break;
        }
    }
}

/* checkNumbers : Check that all characters in an input are numbers only => used for the second input : card_number */

function checkNumbers(input, index) {
    for (let character = 0; character < (input.value).length; character = character + 1) {
        if (numbers.includes((input.value).split("")[character]) == false) {
            warnings[index].innerText = errors[2];
            input.style.borderColor = "hsl(0, 100%, 66%)";
            total_success = false;
            break;
        }
    }
}

/* checkAll : Do all checks for a given input (when it is empty, it's not necessary to do the other checks) => used for all inputs */

function checkAll(input, index) {
    if (checkBlank(input, index) == false) {
        if (index == 0) {
            checkLetters(input, index)
        }
        else {
            checkNumbers(input, index)
        }
    }
}

/* showData : Show all inputs value in the card section when the user write them (it's updated in real time) and reset when inputs are empty => used for all inputs */

function showData(input, index) {
    if (input.value == "") {
        switch (index) {
            case 0:
                data_show[index + 1].innerText = "Jane Appleseed";
                break;
            case 1:
                data_show[index - 1].innerText = "0000 0000 0000 0000";
                break;
            case 2:
                data_show[index].innerText = "00";
                break;
            case 3:
                data_show[index].innerText = "00";
                break;
            default:
                data_show[index].innerText = "000";
        }
    }
    else {
        if (index == 0) {
            data_show[index + 1].innerText = input.value;
        }
        else if (index == 1) {
            data_show[index - 1].innerText = input.value;
        }
        else {
            data_show[index].innerText = input.value;
        }
    }
}

/* successForm : Display the confirmation section (Thank you) while hiding the previously submitted form */

function successForm() {
    form.style.filter = "opacity(0%)";
    setTimeout(function() {
        form.style.display = "none";
        thank_you.style.display = "flex";
        setTimeout(function() {
            thank_you.style.filter = "opacity(100%)";
            light_front.style.animationName = "shine_front";
            light_back.style.animationName = "shine_back";
        }, 50)
    }, 200)
}

/* resetForm : Display the form (and reset it) while hiding the previously displayed confirmation section */

function resetForm() {
    form.reset();
    for (let index = 0; index < inputs.length; index = index + 1) {
        showData(inputs[index], index);
    }
    thank_you.style.filter = "opacity(0%)";
    light_front.style.animationName = "none";
    light_back.style.animationName = "none";
    setTimeout(function() {
        thank_you.style.display = "none";
        form.style.display = "block";
        setTimeout(function() {
            form.style.filter = "opacity(100%)";
        }, 50)
    }, 200)
}

// Events

form.addEventListener("submit", function(event) {
    event.preventDefault();
    resetAll();
    for (let index = 0; index < inputs.length; index = index + 1) {
        checkAll(inputs[index], index);
    }
    if (total_success == true) {
        successForm();
    }
})

for (let index = 0; index < inputs.length; index = index + 1) {
    inputs[index].addEventListener("input", function() {
        showData(inputs[index], index);
    })
}

continue_input.addEventListener("click", resetForm);