const previousDisplay = document.querySelector(".previous-display");
const currentDisplay = document.querySelector(".current-display");
const delButton = document.querySelector("[data-DEL");
const clearButton = document.querySelector("[data-AC]");
const plusMinusButton = document.querySelector("[data-plusMinus]");
const operatorButtons = document.querySelectorAll("[data-operator");
const numberButtons = document.querySelectorAll("[data-number");
let currentOperand = "",
  previousOperand = "",
  operator = "";
result = "";

clearButton.addEventListener("click", clearDisplay);

delButton.addEventListener("click", deleteDigit);

plusMinusButton.addEventListener("click", negate);

numberButtons.forEach((number) =>
  number.addEventListener("click", (e) => appendNumber(e.target.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", (e) => compute(e.target.textContent))
);

function compute(button) {
  if (previousOperand === "") {
    operator = button;
    previousOperand = currentOperand;
    currentOperand = "";
    updateDisplay();
  } else if (currentOperand === "") {
    operator = button;
    updateDisplay();
    return;
  } else if (operator === "=") {
    operator = button;
    updateDisplay();
  } else {
    switch (operator) {
      case "+":
        result = parseFloat(previousOperand) + parseFloat(currentOperand);
        previousOperand = result;
        currentOperand = "";
        operator = button;
        displayResults();
        break;
      case "-":
        result = parseFloat(previousOperand) - parseFloat(currentOperand);
        previousOperand = result;
        currentOperand = "";
        operator = button;
        displayResults();
        break;
      case "X":
        result = parseFloat(previousOperand) * parseFloat(currentOperand);
        previousOperand = result;
        currentOperand = "";
        operator = button;
        displayResults();
        break;
      case "/":
        result = parseFloat(previousOperand) / parseFloat(currentOperand);
        previousOperand = result;
        currentOperand = "";
        operator = button;
        displayResults();
        break;
    }
  }
}

function appendNumber(button) {
  if (button === "." && currentOperand.includes(".")) {
    return;
  }
  if (currentOperand.length > 15) {
    return;
  }
  currentOperand = currentOperand + button;
  updateDisplay();
}

function updateDisplay() {
  previousDisplay.textContent = previousOperand + operator;
  currentDisplay.textContent = currentOperand;
}

function displayResults() {
  previousDisplay.textContent = result + operator;
  currentDisplay.textContent = result;
}

function negate() {
  if (currentOperand === "") {
    currentOperand = -result;
    updateDisplay();
  } else {
    currentOperand = -currentOperand;
    updateDisplay();
  }
}

function clearDisplay() {
  previousDisplay.textContent = "";
  currentDisplay.textContent = "";
  currentOperand = "";
  previousOperand = "";
  operator = "";
}

function deleteDigit() {
  currentOperand = Math.floor(currentOperand / 10);
  updateDisplay();
}
