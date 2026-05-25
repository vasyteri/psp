class CalculatorPage {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        this.parent.innerHTML = `
            <div class="calculator-container">
                <div class="content-card">
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
        
        if (window.initCalculator) {
            setTimeout(() => window.initCalculator(), 0);
        }
    }
}