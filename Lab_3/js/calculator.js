function initCalculator() {
    let firstNum = '';
    let secondNum = '';
    let operation = null;
    const resultDiv = document.getElementById('result');
    
    // Нажатие на цифры
    document.querySelectorAll('.my-btn:not(.primary):not(.secondary)').forEach(btn => {
        const id = btn.id;
        if (['0','1','2','3','4','5','6','7','8','9','dot'].includes(id)) {
            btn.onclick = () => {
                let digit = btn.innerHTML;
                if (digit === '.' && (operation ? secondNum : firstNum).includes('.')) return;
                
                if (!operation) {
                    firstNum += digit;
                    resultDiv.innerHTML = firstNum;
                } else {
                    secondNum += digit;
                    resultDiv.innerHTML = secondNum;
                }
            };
        }
    });
    
    // Операции
    document.getElementById('plus').onclick = () => { if (firstNum) { operation = '+'; } };
    document.getElementById('minus').onclick = () => { if (firstNum) { operation = '-'; } };
    document.getElementById('multiply').onclick = () => { if (firstNum) { operation = '*'; } };
    document.getElementById('divide').onclick = () => { if (firstNum) { operation = '/'; } };
    
    // Очистка
    document.getElementById('clear').onclick = () => {
        firstNum = '';
        secondNum = '';
        operation = null;
        resultDiv.innerHTML = '0';
    };
    
    // Backspace
    document.getElementById('backspace').onclick = () => {
        if (!operation) {
            firstNum = firstNum.slice(0, -1);
            resultDiv.innerHTML = firstNum || '0';
        } else {
            secondNum = secondNum.slice(0, -1);
            resultDiv.innerHTML = secondNum || '0';
        }
    };
    
    // Равно
    document.getElementById('equal').onclick = () => {
        if (!firstNum || !secondNum || !operation) return;
        
        let a = parseFloat(firstNum);
        let b = parseFloat(secondNum);
        let res = 0;
        
        if (operation === '+') res = a + b;
        else if (operation === '-') res = a - b;
        else if (operation === '*') res = a * b;
        else if (operation === '/') {
            if (b === 0) { alert('На ноль делить нельзя!'); return; }
            res = a / b;
        }
        
        firstNum = res.toString();
        secondNum = '';
        operation = null;
        resultDiv.innerHTML = firstNum;
    };
}

window.initCalculator = initCalculator;