// Get references to the HTML elements
const displayResult = document.getElementById("display-result");
const buttonContainer = document.getElementById("button-container");

// Labels for the buttons
const buttonLabels = [
    'AC', 'DE', '/', '*', 
    '7', '8', '9', '-', 
    '4', '5', '6', '+', 
    '1', '2', '3', '.', 
    '0', '00', '='
];

// Regular expression for identifying operators
const operatorPattern = /(\+|\-|\*|\/)/;

// Generate buttons dynamically
buttonLabels.forEach((label, index) => {
    // Create a button element
    const buttonElement = document.createElement("button");

    // Determine if the button is a control key (e.g., AC, DE, =)
    const isControlKey = label === "AC" || label === "DE" || label === "=";

    // Set button ID and text content
    buttonElement.id = `key-${index}`;
    buttonElement.textContent = label;

    // Assign classes based on button type
    if (operatorPattern.test(label)) {
        buttonElement.className = "methods";
    } else {
        buttonElement.className = isControlKey 
            ? `operators num-${index}` 
            : `numbers num-${index}`;
    }

    // Add click event listener
    buttonElement.onclick = () => {
        if (isControlKey) {
            handleControlKey(label);
        } else {
            handleInput(label);
        }
    };

    // Append the button to the container
    buttonContainer.appendChild(buttonElement);
});

// Handle control buttons (AC, DE, =)
const handleControlKey = (key) => {
    switch (key) {
        case "AC":
            // Clear the display
            displayResult.textContent = "0";
            break;

        case "DE":
            // Delete the last character, or reset to 0 if empty
            displayResult.textContent = displayResult.textContent.length > 1
                ? displayResult.textContent.slice(0, -1)
                : "0";
            break;

        case "=":
            // Avoid evaluating if the expression ends with an operator
            if (!operatorPattern.test(displayResult.textContent.slice(-1))) {
                displayResult.textContent = calculateResult(displayResult.textContent);
            }
            break;
    }
};

// Handle numeric and operator input
const handleInput = (input) => {
    // Limit the display to a maximum of 7 characters
    if (displayResult.textContent.length >= 7) return;

    const lastChar = displayResult.textContent.slice(-1);

    // Avoid consecutive operators
    if (operatorPattern.test(lastChar) && operatorPattern.test(input)) return;

    // Replace leading zero unless adding an operator
    if (parseFloat(displayResult.textContent) === 0 && !operatorPattern.test(input)) {
        displayResult.textContent = input;
    } else {
        displayResult.textContent += input;
    }
};

// Calculate the result of the expression
const calculateResult = (expression) => {
    // Split the expression into numbers and operators
    const tokens = expression.replace(/\s/g, "").split(operatorPattern);
    let result = parseFloat(tokens[0]);
    let currentOperator = null;

    // Evaluate the expression step by step
    tokens.forEach((token, index) => {
        if (index % 2 === 0) {
            // Even indices are numbers
            const number = parseFloat(token);
            if (currentOperator) {
                switch (currentOperator) {
                    case "+":
                        result += number;
                        break;
                    case "-":
                        result -= number;
                        break;
                    case "*":
                        result *= number;
                        break;
                    case "/":
                        result /= number;
                        break;
                }
            }
        } else {
            // Odd indices are operators
            currentOperator = token;
        }
    });

    return result;
};
