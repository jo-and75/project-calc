const page = document.getElementById("page");
const calculatorBase = document.createElement("div")
const firstRow = document.createElement("div");
const secondRow = document.createElement("div");
const thirdRow = document.createElement("div");
const fourthRow = document.createElement("div");
const fifthRow = document.createElement("div");

calculatorBase.classList.add("calc-base");
calculatorBase.setAttribute("style", "border: solid black;");
firstRow.classList.add("first-row");
secondRow.classList.add("second-row");
thirdRow.classList.add("third-row");
fourthRow.classList.add("fourth-row");
fifthRow.classList.add("fifth-row");

const inputField = document.createElement("input");
const acBtn = document.createElement("button");
const remainderBtn = document.createElement("button");
const negationBtn = document.createElement("button");
const divideBtn = document.createElement("button");
const num7 = document.createElement("button");
const num8 = document.createElement("button");
const num9 = document.createElement("button");
const multiplyBtn = document.createElement("button");
const num4 = document.createElement("button");
const num5 = document.createElement("button");
const num6 = document.createElement("button");
const minusBtn = document.createElement("button");
const num1 = document.createElement("button");
const num2 = document.createElement("button");
const num3 = document.createElement("button");
const addBtn = document.createElement("button");
const num0 = document.createElement("button");
const pointBtn = document.createElement("button");
const equalsBtn = document.createElement("button");

num0.classList.add("normal-button");
num1.classList.add("normal-button");
num2.classList.add("normal-button");
num3.classList.add("normal-button");
num4.classList.add("normal-button");
num5.classList.add("normal-button");
num6.classList.add("normal-button");
num7.classList.add("normal-button");
num8.classList.add("normal-button");
num9.classList.add("normal-button");
pointBtn.classList.add("normal-button");

addBtn.classList.add("operators");
minusBtn.classList.add("operators");
multiplyBtn.classList.add("operators");
divideBtn.classList.add("operators"); 

acBtn.classList.add("greyBtns"); 
remainderBtn.classList.add("greyBtns"); 
negationBtn.classList.add("greyBtns");



equalsBtn.classList.add("equalsbtn")
num0.classList.add("btn");
inputField.classList.add("input");
inputField.setAttribute("type", "text");
inputField.setAttribute("readonly", "true"); // Prevents one from typing directly into input field.

acBtn.textContent = "AC";
remainderBtn.textContent = "%";
negationBtn.textContent = "(-)";
divideBtn.textContent = "÷";
num7.textContent = "7";
num8.textContent = "8";
num9.textContent = "9";
multiplyBtn.textContent = "x";
num4.textContent = "4";
num5.textContent = "5";
num6.textContent = "6";
minusBtn.textContent = "-";
num1.textContent = "1";
num2.textContent = "2";
num3.textContent = "3";
addBtn.textContent = "+";
num0.textContent = "0";
pointBtn.textContent = ".";
equalsBtn.textContent = "=";

page.appendChild(calculatorBase);
calculatorBase.appendChild(inputField);
calculatorBase.appendChild(firstRow);
calculatorBase.appendChild(secondRow);
calculatorBase.appendChild(thirdRow);
calculatorBase.appendChild(fourthRow);
calculatorBase.appendChild(fifthRow);
firstRow.appendChild(acBtn);
firstRow.appendChild(remainderBtn);
firstRow.appendChild(negationBtn);
firstRow.appendChild(divideBtn);
secondRow.appendChild(num7);
secondRow.appendChild(num8);
secondRow.appendChild(num9);
secondRow.appendChild(multiplyBtn);
thirdRow.appendChild(num4);
thirdRow.appendChild(num5);
thirdRow.appendChild(num6);
thirdRow.appendChild(minusBtn);
fourthRow.appendChild(num1);
fourthRow.appendChild(num2);
fourthRow.appendChild(num3);
fourthRow.appendChild(addBtn);
fifthRow.appendChild(num0);
fifthRow.appendChild(pointBtn);
fifthRow.appendChild(equalsBtn);

let currentNumber = "";
let operator = null;
let intermediateResults = null;

function updateDisplay(content) {
    document.querySelector("input").value = content;
}

let calculationCompleted = false;
let operatorClicked = false;

// Event listener for numbers
document.querySelectorAll(".normal-button").forEach(button => {
    button.addEventListener("click", () => {
        // Resets variable for new calculation 
        if (calculationCompleted && !operatorClicked) {
            intermediateResults = null;
            operator = null;
            currentNumber = "";
            calculationCompleted = false;
            operatorClicked = false;
        }
        currentNumber += button.textContent;
        updateDisplay(currentNumber);
    })
})

// Event listener for operators
document.querySelectorAll(".operators").forEach((button) => {
    button.addEventListener("click", () => {
        if (currentNumber !== "") {
            if (intermediateResults == null) {
                intermediateResults = Number(currentNumber)
            } else {
                intermediateResults = operate(operator, intermediateResults, Number(currentNumber));
            }
            currentNumber = "";
        }
        operatorClicked = true;
        operator = button.textContent;
        button.setAttribute("style", "transition : background-color;")
        updateDisplay(intermediateResults); // This shows result after each operator is pressed.
    }); 
});

// Event listener for the percentage button
remainderBtn.addEventListener("click", () => {
    if (currentNumber !== "") {
        let percentageValue = Number(currentNumber)/100;
        currentNumber = percentageValue; 
        updateDisplay(currentNumber);
    }else{ 
        return "ERROR"
    }
});

// Event listener for the equals button
equalsBtn.addEventListener("click", () => {
    let result;
    if (currentNumber !== "" && intermediateResults !== null && operator !== null) {
        result = operate(operator, intermediateResults, Number(currentNumber));
        calculationCompleted = true;
        updateDisplay(result);
    } else if (currentNumber !== "" && intermediateResults == null && operator == null) {
        result = currentNumber;
        updateDisplay(result); // when number selected & equals pressed, returns number and not blank
    } else {
        result = "ERROR";
        updateDisplay(result);
    }
    operatorClicked = false;
}) 



// Event listener for negation button
negationBtn.addEventListener("click", () => {
    if (currentNumber == "") {
        currentNumber = "-" + currentNumber;
        updateDisplay(currentNumber);
    }
})

// Event listener for Clear button
acBtn.addEventListener("click", () => {
    currentNumber = "";
    operator = null;
    intermediateResults = null;
    calculationCompleted = false;
    updateDisplay(currentNumber);
})

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    if (b == 0) {
        return "MATH ERROR";
    } else {
        return a / b;
    }
}

function multiply(a, b) {
    return a * b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "÷":
            return divide(a, b);
        case "x":
            return multiply(a, b);
        default:
            return "ERROR, INVALID OPERATOR";
    }
}
