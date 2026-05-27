export class CalculatorPage {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        this.parent.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; min-height: 70vh; padding: 20px;">
                <div style="background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); border-radius: 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.15); padding: 30px; max-width: 450px; width: 100%;">
                    <div id="result" style="background: #2b5278; color: white; border-radius: 15px; text-align: right; font-size: 36px; font-weight: bold; padding: 20px; margin-bottom: 20px; font-family: monospace; min-height: 80px; box-shadow: inset 0 2px 5px rgba(0,0,0,0.1);">0</div>
                    <div class="buttons-container">
                        <div class="button-row" style="display: flex; gap: 10px; margin-bottom: 10px;">
                            <button class="my-btn secondary" id="backspace" style="background: #6c757d; color: white; border: none; border-radius: 15px; width: 70px; height: 70px; font-size: 24px; font-weight: bold; cursor: pointer; transition: all 0.2s;">⌫</button>
                            <button class="my-btn secondary" id="clear" style="background: #dc3545; color: white; border: none; border-radius: 15px; width: 70px; height: 70px; font-size: 24px; font-weight: bold; cursor: pointer; transition: all 0.2s;">C</button>
                            <button class="my-btn secondary" id="divide" style="background: #ff6b35; color: white; border: none; border-radius: 15px; width: 70px; height: 70px; font-size: 24px; font-weight: bold; cursor: pointer; transition: all 0.2s;">/</button>
                        </div>
                        <div class="button-row" style="display: flex; gap: 10px; margin-bottom: 10px;">
                            <button class="my-btn" id="1" style="background: #e9ecef; color: #333; border: none; border-radius: 15px; width: 70px; height: 70px; font-size: 24px; font-weight: bold; cursor: pointer; transition: all 0.2s;">1</button>
                            <button class="my-btn" id="2" style="background: #e9ecef; color: #333; border: none; border-radius: 15px; width: 70px; height: 70px; font-size: 24px; font-weight: bold; cursor: pointer; transition: all 0.2s;">2</button>
                            <button class="my-btn" id="3" style="background: #e9ecef; color: #333; border: none; border-radius: 15px; width: 70px; height: 70px; font-size: 24px; font-weight: bold; cursor: pointer; transition: all 0.2s;">3</button>
                            <button class="my-btn primary" id="multiply" style="background: #ff6b35; color: white; border: none; border-radius: 15px; width: 70px; height: 70px; font-size: 24px; font-weight: bold; cursor: pointer; transition: all 0.2s;">×</button>
                        </div>
                        <div class="button-row" style="display: flex; gap: 10px; margin-bottom: 10px;">
                            <button class="my-btn" id="4" style="background: #e9ecef; color: #333; border: none; border-radius: 15px; width: 70px; height: 70px; font-size: 24px; font-weight: bold; cursor: pointer; transition: all 0.2s;">4</button>
                            <button class="my-btn" id="5" style="background: #e9ecef; color: #333; border: none; border-radius: 15px; width: 70px; height: 70px; font-size: 24px; font-weight: bold; cursor: pointer; transition: all 0.2s;">5</button>
                            <button class="my-btn" id="6" style="background: #e9ecef; color: #333; border: none; border-radius: 15px; width: 70px; height: 70px; font-size: 24px; font-weight: bold; cursor: pointer; transition: all 0.2s;">6</button>
                            <button class="my-btn primary" id="minus" style="background: #ff6b35; color: white; border: none; border-radius: 15px; width: 70px; height: 70px; font-size: 24px; font-weight: bold; cursor: pointer; transition: all 0.2s;">−</button>
                        </div>
                        <div class="button-row" style="display: flex; gap: 10px; margin-bottom: 10px;">
                            <button class="my-btn" id="7" style="background: #e9ecef; color: #333; border: none; border-radius: 15px; width: 70px; height: 70px; font-size: 24px; font-weight: bold; cursor: pointer; transition: all 0.2s;">7</button>
                            <button class="my-btn" id="8" style="background: #e9ecef; color: #333; border: none; border-radius: 15px; width: 70px; height: 70px; font-size: 24px; font-weight: bold; cursor: pointer; transition: all 0.2s;">8</button>
                            <button class="my-btn" id="9" style="background: #e9ecef; color: #333; border: none; border-radius: 15px; width: 70px; height: 70px; font-size: 24px; font-weight: bold; cursor: pointer; transition: all 0.2s;">9</button>
                            <button class="my-btn primary" id="plus" style="background: #ff6b35; color: white; border: none; border-radius: 15px; width: 70px; height: 70px; font-size: 24px; font-weight: bold; cursor: pointer; transition: all 0.2s;">+</button>
                        </div>
                        <div class="button-row" style="display: flex; gap: 10px;">
                            <button class="my-btn" id="0" style="background: #e9ecef; color: #333; border: none; border-radius: 15px; width: 70px; height: 70px; font-size: 24px; font-weight: bold; cursor: pointer; transition: all 0.2s;">0</button>
                            <button class="my-btn" id="dot" style="background: #e9ecef; color: #333; border: none; border-radius: 15px; width: 70px; height: 70px; font-size: 24px; font-weight: bold; cursor: pointer; transition: all 0.2s;">.</button>
                            <button class="my-btn primary execute" id="equal" style="background: #28a745; color: white; border: none; border-radius: 15px; width: 152px; height: 70px; font-size: 24px; font-weight: bold; cursor: pointer; transition: all 0.2s;">=</button>
                        </div>
                    </div>
                    <style>
                        .my-btn:hover {
                            transform: translateY(-2px);
                            filter: brightness(0.95);
                            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                        }
                        .my-btn:active {
                            transform: translateY(1px);
                        }
                    </style>
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