const previousInput = document.getElementById("calculateInputPrev");
const currentInput = document.getElementById("calculateInputCurr");
const numButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operator");
const allClearButton = document.querySelector(".all-clear");
const deleteButton = document.querySelector(".delete");
const pointButton = document.getElementById("point");
const equalsButton = document.getElementById("EqualBtn");

let currentOperation = undefined;

// Function to delete the last character
const deletion = () => {
  currentInput.value = currentInput.value.toString().slice(0, -1);
};

// Function to clear all inputs
const allClear = () => {
  currentInput.value = "";
  previousInput.value = "";
  currentOperation = undefined;
};

// Function to append numbers
const appendNumber = (number) => {
  if (number === "0" && currentInput.value === "0") return; // Avoid multiple leading zeros
  currentInput.value += number;
};

// Function to handle operation selection
const chooseOperation = (operation) => {
  if (currentInput.value === "") return;
  if (previousInput.value !== "") {
    compute();
  }
  currentOperation = operation;
  previousInput.value = currentInput.value + " " + operation;
  currentInput.value = "";
};

// Function to compute the result
const compute = () => {
  if (!currentOperation || currentInput.value === "") return;

  const prev = parseFloat(previousInput.value);
  const current = parseFloat(currentInput.value);

  if (isNaN(prev) || isNaN(current)) return;

  let computation;
  switch (currentOperation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = current !== 0 ? prev / current : "Error";
      break;
    default:
      return;
  }

  currentInput.value = computation;
  previousInput.value = "";
  currentOperation = undefined;
};

// Event listeners
allClearButton.addEventListener("click", allClear);
deleteButton.addEventListener("click", deletion);

numButtons.forEach((numButton) => {
  numButton.addEventListener("click", () => {
    appendNumber(numButton.textContent);
  });
});

operationButtons.forEach((operator) => {
  operator.addEventListener("click", () => {
    chooseOperation(operator.textContent);
  });
});

equalsButton.addEventListener("click", compute);

pointButton.addEventListener("click", () => {
  if (currentInput.value.includes(".")) return;
  currentInput.value += ".";
});
