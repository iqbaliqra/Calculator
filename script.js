const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const historyBtn = document.getElementById('historyBtn');
const historyPanel = document.getElementById('historyPanel');
const historyList = document.getElementById('historyList');

let currentInput = '';
let operator = null;
let firstNumber = '';
let secondNumber = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'C') {
      currentInput = '';
      firstNumber = '';
      secondNumber = '';
      operator = null;
      display.value = '';
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (firstNumber === '' && currentInput !== '') {
        firstNumber = currentInput;
        currentInput = '';
        operator = value;
        display.value += value;
      }
    } else if (value === '=') {
      if (firstNumber !== '' && currentInput !== '') {
        secondNumber = currentInput;
        const result = calculateManual(firstNumber, operator, secondNumber);
        addToHistory(`${firstNumber} ${operator} ${secondNumber} = ${result}`);
        display.value = result;
        currentInput = result.toString();
        firstNumber = '';
        secondNumber = '';
        operator = null;
      }
    } else {
      currentInput += value;
      display.value += value;
    }
  });
});

historyBtn.addEventListener('click', () => {
  historyPanel.classList.toggle('hidden');
});

function calculateManual(a, op, b) {
  let num1 = parseFloat(a);
  let num2 = parseFloat(b);
  let result = 0;

  if (op === '+') {
    result = num1 + num2;
  } else if (op === '-') {
    result = num1 - num2;
  } else if (op === '*') {
    result = num1 * num2;
  } else if (op === '/') {
    if (num2 === 0) return 'Error';
    result = num1 / num2;
  }

  return result;
}

function addToHistory(entry) {
  const li = document.createElement('li');
  li.textContent = entry;
  historyList.prepend(li);
}
