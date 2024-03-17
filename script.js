function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return "Divided by zero";
  }
  return num1 / num2;
}

function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return "Invalid operator";
  }
}

function updateDisplay() {
  displayDiv.textContent = displayValue;
}

function clearDisplay() {
  displayValue = "";
  updateDisplay();
}

function calc() {}

const displayDiv = document.querySelector(".display");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector("#equal");
const allClear = document.querySelector("#all-clear");
let displayValue = "";
let num = "";
let num1;
let num2;
let operator;
let result;
let isNum1Set = false;
let isNum2Set = false;
let opClicked = false;

// Event function of digit buttons
digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    if (!opClicked) {
      opClicked = false;
      displayValue += digit.textContent;
      updateDisplay();
    } else {
      opClicked = false;
      clearDisplay();
      displayValue += digit.textContent;
      updateDisplay();
    }
  });
});

// Event function for operator buttons
operators.forEach((op) => {
  op.addEventListener("click", () => {
    if (!isNum1Set) {
      opClicked = true;
      isNum1Set = true;
      num1 = parseFloat(displayValue);
      operator = op.textContent;
    } else if (!opClicked) {
      opClicked = true;
      num2 = parseFloat(displayValue);
      result = operate(num1, num2, operator);
      num1 = result;
      num2 = undefined;
      operator = op.textContent;
      isNum2Set = false;
      displayValue = result;
      updateDisplay();
    } else if (opClicked) {
      operator = op.textContent;
    }
  });
});

// Event function for equal button
equal.addEventListener("click", () => {
  opClicked = true;
  if (!isNum1Set) {
    return;
  }
  if (!isNum2Set) {
    isNum2Set = true;
    num2 = parseFloat(displayValue);
    displayValue = operate(num1, num2, operator);
    updateDisplay();
  }
  console.log("hello");
  console.log("num1: " + num1);
  console.log("num2: " + num2);
  console.log("operator: " + operator);
  result = operate(num1, num2, operator);
  num1 = result;
  num2 = undefined;
  isNum1Set = true;
  isNum2Set = false;
  console.log("result: " + result);
  displayValue = result;
  updateDisplay();
});

allClear.addEventListener("click", () => {
  isNum1Set = false;
  isNum2Set = false;
  opClicked = false;
  num1 = undefined;
  num2 = undefined;
  operator = undefined;
  clearDisplay();
});
