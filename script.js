/* Display */
const DEFAULT_VALUE = 0;

const currentTablo = document.querySelector('.tablo_current');
currentTablo.textContent = `${DEFAULT_VALUE}`;

const expressionTablo = document.querySelector('.tablo_expression');
expressionTablo.textContent = `${DEFAULT_VALUE}`;


/* Buttons */
const btnsArray = [
    'MC', 'MR', 'M-', 'M+', '&#8730;', 'x<sup>y</sup>',
    '&#11104;', '7', '8', '9', '&#247;', '%',
    '+/-', '4', '5', '6', 'x', '-',
    'AC', '1', '2', '3', '+', '=',
    'C', '0', '00', '.'
];

const btnsTitleArray = [
    'Memory Clear', 'Memory Recall', 'Memory Subtraction', 'Memory Addition', 'Square Root', 'The Power of Two Numbers',
    'Backspace', 'Seven', 'Eigth', 'Nine', 'Division', 'Percent',
    'Change Sign', 'Four', 'Five', 'Six', 'Multiplication', 'Subtraction',
    'All Clear', 'One', 'Two', 'Three', 'Addition', 'Result',
    'Clear', 'Zero', 'Double Zero', 'Decimal Point'
];

const btnsValueArray = [
    'MC', 'MR', 'M-', 'M+', 'Root', '^',
    'Backspace', '7', '8', '9', '/', '%',
    '+/-', '4', '5', '6', '*', '-',
    'AC', '1', '2', '3', '+', '=',
    'C', '0', '00', '.'
];

const calculatorBtns = document.querySelector('.calculator_buttons');

for (let i = 0; i < btnsArray.length; i++) {
    const btn = document.createElement('button');
    btn.setAttribute('id', `btn${i}`);
    btn.style.cssText = `grid-area: gb${i}`;
    btn.classList.add('btn');
    btn.setAttribute('title', `${btnsTitleArray[i]}`);
    btn.setAttribute('value', `${btnsValueArray[i]}`);
    btn.innerHTML = `${btnsArray[i]}`
    calculatorBtns.appendChild(btn);
}

document.addEventListener('keydown', (e) => {
    console.log(e)
})
