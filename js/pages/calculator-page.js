export class CalculatorPage {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        this.parent.innerHTML = `
            <div class="calculator-container">
                <div class="content-card" style="max-width: 450px; margin: 0 auto;">
                    <div id="result" class="result">0</div>
                    <div class="buttons-container">
                        <div class="button-row">
                            <button class="my-btn secondary" id="backspace">⌫</button>
                            <button class="my-btn secondary" id="clear">C</button>
                            <button class="my-btn secondary" id="divide">/</button>
                        </div>
                        <div class="button-row">
                            <button class="my-btn" id="1">1</button>
                            <button class="my-btn" id="2">2</button>
                            <button class="my-btn" id="3">3</button>
                            <button class="my-btn primary" id="multiply">×</button>
                        </div>
                        <div class="button-row">
                            <button class="my-btn" id="4">4</button>
                            <button class="my-btn" id="5">5</button>
                            <button class="my-btn" id="6">6</button>
                            <button class="my-btn primary" id="minus">−</button>
                        </div>
                        <div class="button-row">
                            <button class="my-btn" id="7">7</button>
                            <button class="my-btn" id="8">8</button>
                            <button class="my-btn" id="9">9</button>
                            <button class="my-btn primary" id="plus">+</button>
                        </div>
                        <div class="button-row">
                            <button class="my-btn" id="0">0</button>
                            <button class="my-btn" id="dot">.</button>
                            <button class="my-btn primary execute" id="equal">=</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.initCalculator();
    }
    
    initCalculator() {
        let firstNum = '', secondNum = '', operation = null;
        const resultDiv = document.getElementById('result');
        
        document.querySelectorAll('.my-btn:not(.primary):not(.secondary)').forEach(btn => {
            const id = btn.id;
            if (['0','1','2','3','4','5','6','7','8','9','dot'].includes(id)) {
                btn.onclick = () => {
                    let digit = btn.innerHTML;
                    if (digit === '.' && (operation ? secondNum : firstNum).includes('.')) return;
                    if (!operation) { firstNum += digit; resultDiv.innerHTML = firstNum; }
                    else { secondNum += digit; resultDiv.innerHTML = secondNum; }
                };
            }
        });
        
        document.getElementById('plus').onclick = () => { if (firstNum) operation = '+'; };
        document.getElementById('minus').onclick = () => { if (firstNum) operation = '-'; };
        document.getElementById('multiply').onclick = () => { if (firstNum) operation = '*'; };
        document.getElementById('divide').onclick = () => { if (firstNum) operation = '/'; };
        
        document.getElementById('clear').onclick = () => { firstNum = ''; secondNum = ''; operation = null; resultDiv.innerHTML = '0'; };
        document.getElementById('backspace').onclick = () => {
            if (!operation) { firstNum = firstNum.slice(0, -1); resultDiv.innerHTML = firstNum || '0'; }
            else { secondNum = secondNum.slice(0, -1); resultDiv.innerHTML = secondNum || '0'; }
        };
        
        document.getElementById('equal').onclick = () => {
            if (!firstNum || !secondNum || !operation) return;
            let a = parseFloat(firstNum), b = parseFloat(secondNum), res = 0;
            if (operation === '+') res = a + b;
            else if (operation === '-') res = a - b;
            else if (operation === '*') res = a * b;
            else if (operation === '/') { if (b === 0) { alert('На ноль делить нельзя!'); return; } res = a / b; }
            firstNum = res.toString(); secondNum = ''; operation = null; resultDiv.innerHTML = firstNum;
        };
    }
}