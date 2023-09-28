const DEFAULT_VALUE = 0;
const DEFAULT_EXPRESSION = '';

let currentValue = DEFAULT_VALUE;
let currentExpression = DEFAULT_EXPRESSION;

window.addEventListener('keydown', keybouardEvent);

const currentTablo = document.querySelector('.tablo_current');
currentTablo.textContent = `${currentValue}`;

const expressionTablo = document.querySelector('.tablo_expression');
expressionTablo.textContent = `${currentExpression}`;

let numMode = false; // First number (false complitely new, true plus to the same number)
let numMode2 = false; // New expression run after result
let clearMode = false;
let doubleOperationMode = false;
let resultBtn = false;
let rootSwitch = false;
let percentageMode = false;

function updateCurrentTablo() {
    currentTablo.textContent = `${currentValue}`;
}

function updateCurrentExprTablo() {
    expressionTablo.textContent = `${currentExpression}`;
}

function point(value) {
    if (currentValue.toString().split('').includes('.') === true && value === '.') {
        currentValue += '';
    } else if (numMode === false && value === '.') {
        currentValue = `0${value}`;
        currentExpression = '';
    } else if (currentValue === 0 && value === '.' || currentValue !== 0 && value === '.') {
        currentValue += value;;
    }
}

function doubleZero(value) {
    if (currentValue === 0 && value === '00' || numMode === false && value === '00') {
        currentValue = 0;
    } else {
        currentValue += value;;
    }
}

function setValue(newValue) {
    doubleOperationMode = false;

    if (newValue === '.') {
        point(newValue);
    } else if (newValue === '00') {
        doubleZero(newValue);
    } else if (numMode2 === false) {
        currentValue = '';
        currentValue = newValue;
        currentExpression = '';
    } else if (currentValue === 0 || numMode === false) {
        currentValue = '';
        currentValue = newValue;
    } else {
        currentValue += newValue;
    }
    updateCurrentTablo();

    numMode2 = true;
    numMode = true;
    rootSwitch = false;
}

function doubleOperation(value) {
    currentExpression = `${currentValue} ${value}`;
    // console.log(`doubleOperation: 1`);
}

function clear() {
    currentValue = 0;
    currentExpression = '';
    // console.log(`clear: 1`);
}

function clearAllExpressions(newValue) {
    if (newValue === 'C') {
        clear();
        // console.log(`C start`);
    } else if (newValue === 'AC') {
        clear();
        memoryValue = '';
        mc.setAttribute('disabled', '');
        mr.setAttribute('disabled', '');
        // console.log(`AC start`);
    }
    updateCurrentTablo();
    updateCurrentExprTablo();
}

function reverseCurrentValue() {
    if (currentValue === 0) {
        currentValue = 0;
        // console.log('operation: 0 and +/-');
    } else if (typeof currentValue === 'number' && resultBtn === true) {
        currentExpression = `nagete(${currentValue})`;
        currentValue = -currentValue;
        // console.log(`reverse: 1`);
    } else if (typeof currentValue === 'number') {
        currentValue = -currentValue;
        // console.log(`reverse: 2`);
    } else if (typeof currentValue === 'string') {
        currentValue = +currentValue;
        currentValue = -currentValue;
        currentValue.toString();
        // console.log(`reverse: 3`);
    }
    updateCurrentTablo();
    numMode = true;
    // console.log(`+/- start`);
}

function backspaceFunk() {
    if (typeof currentValue === 'number') {
        currentExpression = '';
        updateCurrentExprTablo();
        // console.log(`backspace: 1`);
    } else if (currentValue.length === 1 || currentValue.length === 0 || !currentValue) {
        currentValue = 0;
        // console.log(`backspace: 2`);
    } else {
        currentValue = currentValue.slice(0, -1);
        // console.log(`backspace: 3`);
    }
    updateCurrentTablo();
    numMode = true;
    doubleOperationMode === false;
    // console.log(`backspace start`);
}

function rootFunk() {
    currentExpression = `√(${currentValue})`;
    currentValue = currentValue ** (0.5);
    updateCurrentTablo();
    updateCurrentExprTablo();
    rootSwitch = true;
    doubleOperationMode === false;
    numMode = false;
    // console.log(`root start`);
}

function percentageFunk() {
    percentageMode = true;
    if (currentExpression.split(' ').length < 2) {
        currentExpression = 0;
        currentValue = 0;
        updateCurrentExprTablo();
        updateCurrentTablo();
    } else {
        currentValue = (currentValue / 100) * currentValue;
        currentExpression += ` ${currentValue}`;
        updateCurrentTablo();
        updateCurrentExprTablo();
    }
}

function setExpression(newValue) {
    numMode = false;
    numMode2 = true;

    if (doubleOperationMode === true) {
        doubleOperation(newValue);
        // console.log(`doubleOperationMode start`);
    } else if (currentValue[currentValue.length - 1] === '.') {
        currentExpression += '';
        numMode = true;
        // console.log('operation: last .');
    } else if (clearMode === true) {
        currentExpression = '';
        currentExpression += `${currentValue} ${newValue}`;
        clearMode = false;
        // console.log('operation: clear mode');
    } else if (currentValue !== 0 && !currentExpression) {
        currentExpression += `${currentValue} ${newValue}`;
        // console.log('operation: not 0 and not value');
    } else if (rootSwitch === true) {
        currentExpression = '';
        currentExpression += `${currentValue} ${newValue}`;
    } else {
        currentExpression += ` ${currentValue}`;
        calculation();
        clearMode = false;
        currentExpression = `${currentValue} ${newValue}`;
        // console.log('operation: main value');
    }

    doubleOperationMode = true;
    resultBtn = false;
    updateCurrentExprTablo();
}

const btnsArray = [
    'MC', 'MR', 'M-', 'M+', '√', 'x<sup>y</sup>', '←', '7', '8', '9',
    '&#247;', '%', '+/-', '4', '5', '6', 'x', '-', 'AC', '1', '2', '3', '+', '=', 'C', '0', '00', '.'
];

const btnsTitleArray = [
    'Memory Clear', 'Memory Recall', 'Memory Subtraction', 'Memory Addition', 'Square Root', 'The Power of Two Numbers',
    'Backspace', 'Seven', 'Eigth', 'Nine', 'Division', 'Percent',
    'Change Sign', 'Four', 'Five', 'Six', 'Multiplication', 'Subtraction',
    'All Clear', 'One', 'Two', 'Three', 'Addition', 'Result',
    'Clear', 'Zero', 'Double Zero', 'Decimal Point'
];

const btnsValueArray = [
    'MC', 'MR', 'M-', 'M+', 'Root', '^', 'Backspace', '7', '8', '9', '/',
    '%', '+/-', '4', '5', '6', '*', '-', 'AC', '1', '2', '3', '+', '=', 'C', '0', '00', '.'
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


const numBtnIds = ['btn7', 'btn8', 'btn9', 'btn13', 'btn14', 'btn15', 'btn19', 'btn20', 'btn21', 'btn25', 'btn26', 'btn27'];
for (let i = 0; i < numBtnIds.length; i++) {
    const numBtn = document.getElementById(`${numBtnIds[i]}`);
    numBtn.addEventListener('click', (e) => {
        setValue(e.target.value);
    });
}

const opBtnIds = ['btn5', 'btn10', 'btn16', 'btn17', 'btn18', 'btn22', 'btn24'];
for (let i = 0; i < opBtnIds.length; i++) {
    const opBtn = document.getElementById(`${opBtnIds[i]}`);
    opBtn.addEventListener('click', (e) => {
        setExpression(e.target.value);
    });
}

const percentageBtn = document.getElementById('btn11');
percentageBtn.addEventListener('click', () => {
    percentageFunk();
});

const rootBtn = document.getElementById('btn4');
rootBtn.addEventListener('click', () => {
    rootFunk();
});

const deleteBtn = document.getElementById('btn6');
deleteBtn.addEventListener('click', () => {
    backspaceFunk();
});

const plusMinus = document.getElementById('btn12');
plusMinus.addEventListener('click', (e) => {
    reverseCurrentValue(e.target.value);
});

const clearBtns = ['btn18', 'btn24'];
for (let i = 0; i < clearBtns.length; i++) {
    const clearBtn = document.getElementById(`${clearBtns[i]}`);
    clearBtn.addEventListener('click', (e) => {
        clearAllExpressions(e.target.value);
    });
}

const equal = document.getElementById('btn23');
equal.addEventListener('click', () => getResult());

function getResult() {
    numMode2 = false;
    doubleOperationMode = false;
    if (currentValue[currentValue.length - 1] === '.') {
        currentValue = currentValue.slice(0, -1);
        currentExpression = currentValue + ' =';
        updateCurrentTablo();
        updateCurrentExprTablo();
        // console.log('11');
    } else if (rootSwitch === true) {
        currentExpression = currentExpression + ' =';
        updateCurrentExprTablo();
        rootSwitch = false;
        currentExpression = '';
        // console.log('22');
    } else if (currentExpression.split(' ').length < 2) {
        currentExpression = currentValue + ' =';
        updateCurrentTablo();
        updateCurrentExprTablo();
        numMode = false;
        currentExpression = '';
        // console.log('33');
    } else if (percentageMode === true) {
        calculation();
        percentageMode = false;
        resultBtn = true;
    } else if (resultBtn === false) {
        currentExpression += ' ' + currentValue;
        updateCurrentExprTablo();
        calculation();
        resultBtn = true;
        // console.log('44');
    } else {
        const alternativeExpression = currentExpression.split(' ');
        const newExpressionPart = alternativeExpression.slice(-2);
        currentExpression = [currentValue].concat(newExpressionPart).join(' ');
        updateCurrentExprTablo();
        calculation();
        // console.log('55');
    }
}

function calculation() {
    console.log(numMode)
    numMode = false;

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

    clearMode = true;
    currentValue = result;
    updateCurrentTablo();
    // console.log(numMode);
}

let memoryValue = '';

const memoryBtn = ['btn0', 'btn1', 'btn2', 'btn3'];

for (let i = 0; i < memoryBtn.length; i++) {
    const btn = document.getElementById(`${memoryBtn[i]}`);
    btn.addEventListener('click', (e) => {
        memoryActivate(e.target.value);
    });
}

const mc = document.getElementById('btn0');
const mr = document.getElementById('btn1');

function setAttr() {
    mc.setAttribute('disabled', '');
    mr.setAttribute('disabled', '');
}

function removeAttr() {
    mc.removeAttribute('disabled', '');
    mr.removeAttribute('disabled', '');
}

function addClassDisabled() {
    mc.classList.add('disabled');
    mr.classList.add('disabled');
}

function removeClassDesabled() {
    mc.classList.remove('disabled');
    mr.classList.remove('disabled');
}

setAttr();
addClassDisabled();

function memoryActivate(newValue) {
    if (newValue === 'MC') {
        memoryValue = '';
        setAttr();
    } else if (newValue === 'MR') {
        currentExpression = '';
        currentValue = memoryValue.toString();
        updateCurrentTablo();
    } else if (newValue === 'M+') {
        memoryValue = Number(memoryValue);
        memoryValue += currentValue;
        removeAttr();
        removeClassDesabled();
    } else if (newValue === 'M-') {
        memoryValue = Number(memoryValue);
        console.log(memoryValue);
        memoryValue -= +currentValue;
        removeAttr();
        removeClassDesabled();
    }
}

function keybouardEvent(e) {
    if (e.key >= 0 && e.key <= 9) setValue(e.key);
    if (e.key === '.') setValue(e.key);
    if (e.key === '=' || e.key === 'Enter') getResult();
    if (e.key === 'Backspace') backspaceFunk();
    if (e.key === 'Escape') clearAllExpressions('C');
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        setExpression(e.key);
}