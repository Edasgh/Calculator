const previousInput = document.getElementById("calculateInputPrev");
const currentInput = document.getElementById("calculateInputCurr");
const numButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operator");
const allClearButton = document.querySelector(".all-clear");
const deleteButton = document.querySelector(".delete");
const pointButton = document.getElementById("point");
const equalsButton = document.getElementById("EqualBtn");
const zeroBtn = document.getElementById("zeroBtn");

const deletion = () => {
  currentInput.value = currentInput.value.toString().slice(0, -1);
};

const allClear = () => {
  currentInput.value = "";
  previousInput.value = "";
};
allClearButton.addEventListener("click", allClear);
deleteButton.addEventListener("click", deletion);
numButtons.forEach((numButton) => {
  numButton.addEventListener("click", () => {
   if(numButton.id=="zeroBtn"){
   if(currentInput.value=="0"){
    return;
   }else{
      currentInput.value += zeroBtn.textContent;
   }
   }else{
    currentInput.value += numButton.textContent;
   }
  });
});

operationButtons.forEach((operator) => {
  operator.addEventListener("click", () => {
    let operation = operator.textContent;
    if (currentInput.value == "") return;
    if (previousInput.value.includes(operation)) return;
    previousInput.value = currentInput.value + operation;
    currentInput.value = "";
    equalsButton.addEventListener("click", () => {
      let computation;
      let current = parseFloat(currentInput.value);
      let prev = parseFloat(previousInput.value);
      if (isNaN(prev) || isNaN(current)) return;
      if (!current) return;
      switch (operation) {
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
          computation = prev / current;
          break;

        default:
          return;
      }

      currentInput.value = computation;
      previousInput.value = "";
      operation = undefined;
    });
  });
});

pointButton.addEventListener("click", () => {
  if (currentInput.value.includes("."))
    return;
  currentInput.value += pointButton.textContent;
});
