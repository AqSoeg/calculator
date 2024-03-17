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
    clearAll();
    return "ERROR";
  }
  return num1 / num2;
}

function operate(num1, num2, operator) {
  let res;
  switch (operator) {
    case "+":
      res = add(num1, num2);
      break;
    case "-":
      res = subtract(num1, num2);
      break;
    case "*":
      res = multiply(num1, num2);
      break;
    case "/":
      res = divide(num1, num2);
      break;
    default:
      return "Invalid operator";
  }
  if (res.toString().includes(".")) {
    res = res.toFixed(6);
  }
  return res;
}

function updateDisplay() {
  displayDiv.textContent = displayValue;
}

function clearDisplay() {
  displayValue = "";
  updateDisplay();
}

function clearAll() {
  isNum1Set = false;
  isNum2Set = false;
  opClicked = false;
  displayValue = "";
  num1 = 0;
  num2 = 0;
  result = 0;
  operator = undefined;
}

const displayDiv = document.querySelector(".display");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector("#equal");
const allClear = document.querySelector("#all-clear");
const back = document.querySelector("#back");
const percentage = document.querySelector("#percentage");
let displayValue = "";
let num1 = 0;
let num2 = 0;
let operator;
let result;
let isNum1Set = false;
let isNum2Set = false;
let opClicked = false;

// Event function of digit buttons
digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    if (displayValue === "ERROR" || displayValue === "Invalid operator")
      clearAll();
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

// Event function for + - * / buttons
operators.forEach((op) => {
  op.addEventListener("click", () => {
    if (displayValue === "ERROR" || displayValue === "Invalid operator")
      clearAll();
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

// Event function for = button
equal.addEventListener("click", () => {
  opClicked = true;
  if (displayValue === "ERROR" || displayValue === "Invalid operator")
    clearAll();
  if (!isNum1Set) {
    return;
  }
  if (!isNum2Set) {
    isNum2Set = true;
    num2 = parseFloat(displayValue);
    result = operate(num1, num2, operator);
    displayValue = result;
    num1 = result;
    num2 = undefined;
    isNum1Set = true;
    isNum2Set = false;
    displayValue = result;
    updateDisplay();
  }
});

// Event function for AC button
allClear.addEventListener("click", () => {
  clearAll();
  clearDisplay();
});

// Back button
back.addEventListener("click", () => {
  if (displayValue === "ERROR" || displayValue === "Invalid operator")
    clearAll();
  else if (displayValue === "") return;
  isNum1Set = false;
  displayValue = displayValue.toString().slice(0, -1);
  updateDisplay();
});
