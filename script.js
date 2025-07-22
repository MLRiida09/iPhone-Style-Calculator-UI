const screen = document.getElementById("screen").querySelector("p");
const buttons = document.querySelectorAll(".number-div li");
const acButton = document.querySelector('.AC');
const acLabel = acButton.querySelector('span'); 

let currentInput = "";
let operator = "";
let previousValue = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    // AC / delete
    if (button.classList.contains("AC")) {
      if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        screen.textContent = currentInput || "0";
      } else {
        currentInput = "";
        previousValue = "";
        operator = "";
        screen.textContent = "0";
      }
      updateAC();
    }

    else if (button.classList.contains("Change-Sign")) {
      if (currentInput) {
        currentInput = String(parseFloat(currentInput) * -1);
        screen.textContent = currentInput;
      }
    }

    else if (button.classList.contains("Percentage")) {
      if (currentInput) {
        currentInput = String(parseFloat(currentInput) / 100);
        screen.textContent = currentInput;
      }
    }

    else if (
      button.classList.contains("Division") ||
      button.classList.contains("Multiplication") ||
      button.classList.contains("Minus") ||
      button.classList.contains("plus")
    ) {
      operator = value;
      previousValue = currentInput;
      currentInput = "";
    }

    else if (button.id === "equal") {
      if (currentInput && previousValue && operator) {
        let result;
        const a = parseFloat(previousValue);
        const b = parseFloat(currentInput);

        switch (operator) {
          case "÷": result = a / b; break;
          case "×": result = a * b; break;
          case "-": result = a - b; break;
          case "+": result = a + b; break;
        }

        screen.textContent = result;
        currentInput = String(result);
        operator = "";
        previousValue = "";
        updateAC();
      }
    }

    else if (value === "," || value === ".") {
      if (!currentInput.includes(".")) {
        currentInput += ".";
        screen.textContent = currentInput;
      }
    }

    else {
      currentInput += value;
      screen.textContent = currentInput;
    }

    updateAC();
  });
});

function updateAC() {
  const isDelete = currentInput.length > 0;
  const newContent = isDelete ? '<i class="fa-solid fa-delete-left"></i>' : 'AC';

  // Add a class for the  fade  effect
  acLabel.classList.remove('fade-in');
  acLabel.classList.add('fade-out');

  setTimeout(() => {
    // Change the text after the fade 
    acLabel.innerHTML = newContent;

    // Add fade effect
    acLabel.classList.remove('fade-out');
    acLabel.classList.add('fade-in');
  }, 150); 
}


