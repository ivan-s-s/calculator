/* Display */
const DEFAULT_VALUE = 0;
const DEFAULT_EXPRESSION = '';

let currentValue = DEFAULT_VALUE;
let currentExpression = DEFAULT_EXPRESSION;

const currentTablo = document.querySelector('.tablo_current');
currentTablo.textContent = `${currentValue}`;

const expressionTablo = document.querySelector('.tablo_expression');
expressionTablo.textContent = `${currentExpression}`;

let numMode = false;

function setValue(newValue) {
    if (currentValue.toString().split('').includes('.') === true && newValue === '.') {
        currentValue += '';
        +currentValue;
    } else if (currentValue === 0 && newValue === '.') {
        currentValue += newValue;
        +currentValue;
    } else if (numMode === false && newValue === '.') {
        currentValue = `0${newValue}`
    } else if (currentValue === 0 && newValue === '00') {
        currentValue = 0;
        +currentValue;
    } else if (numMode === false && newValue === '00') {
        currentValue = 0;
        +currentValue;
    } else if (currentValue === 0 || numMode === false) {
        currentValue = '';
        currentValue = newValue;
        +currentValue;
    } else {
        currentValue += newValue;
        +currentValue;
    }

    numMode = true;
    currentTablo.textContent = `${currentValue}`;
}

function setExpression(newValue) {
    numMode = false;
    if (newValue === 'Root') {
        currentExpression = `√(${currentValue})`;
    } else if (newValue === 'C') {
        currentValue = 0;
        currentExpression = '';
        currentTablo.textContent = `${currentValue}`;
    } else if (currentValue[currentValue.length - 1] === '.') {
        currentExpression += '';
        numMode = true;
    } else if (currentValue !== 0 && !currentExpression) {
        currentExpression += `${currentValue} ${newValue}`;
    } else {
        currentExpression += ' ';
        currentExpression += `${currentValue} ${newValue}`;
    }

    expressionTablo.textContent = `${currentExpression}`;
}



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

/* 
Listeners of number buttons
    'btn7' - 7, 'btn8' - 8, 'btn9' - 9, 
    'btn13' - 4, 'btn14' - 5, 'btn15' - 6, 
    'btn19' - 1, 'btn20' - 2, 'btn21' - 3, 
    'btn25' - 0, 'btn26' - 00, 'btn27' - .
*/
const numBtnIds = ['btn7', 'btn8', 'btn9', 'btn13', 'btn14', 'btn15', 'btn19', 'btn20', 'btn21', 'btn25', 'btn26', 'btn27'];
for (let i = 0; i < numBtnIds.length; i++) {
    const numBtn = document.getElementById(`${numBtnIds[i]}`);
    numBtn.addEventListener('click', (e) => {
        setValue(e.target.value)
        // console.log(e.target.value)
        // console.log(currentValue)
    });
}

/* Listeners of operators buttons

*/

const opBtnIds = ['btn0', 'btn1', 'btn2', 'btn3', 'btn4', 'btn5', 'btn6', 'btn10', 'btn11', 'btn12', 'btn16', 'btn17', 'btn18', 'btn22', 'btn24'];
for (let i = 0; i < opBtnIds.length; i++) {
    const opBtn = document.getElementById(`${opBtnIds[i]}`);
    opBtn.addEventListener('click', (e) => {
        setExpression(e.target.value)
        // console.log(e.target.value)
        // console.log(currentExpression)
    });
}

/* Expressions */
const equal = document.getElementById('btn23');
equal.addEventListener('click', () => getResult());

function getResult() {
    currentExpression += ' ' + currentValue;
    expressionTablo.textContent = `${currentExpression}`;
    calculation();
}

function calculation() {
    const currentExpr = currentExpression.split(' ');

    const nums = currentExpr.filter((e, i) => (i % 2) === 0);
    const operators = currentExpr.filter((e, i) => (i % 2) !== 0);

    let result = +nums[0];

    for (let i = 0; i < operators.length; i++) {
        switch (operators[i]) {
            case '+':
                result += +nums[i + 1];
                break;
            case '*':
                result *= +nums[i + 1];
                break;
            case '-':
                result -= +nums[i + 1];
                break;
            case '/':
                result /= +nums[i + 1];
                break;
            case '^':
                result **= +nums[i + 1];
                break;
        }
    }

    currentValue = result;
    currentTablo.textContent = `${currentValue}`;
    console.log(nums);
    console.log(operators);
    console.log(result);
}