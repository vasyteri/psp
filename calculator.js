window.onload = function() { 

    let a = '';           
    let b = '';           
    let expressionResult = '';  
    let selectedOperation = null;  

    const outputElement = document.getElementById("result");

    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');
    


    /**
     * Функция обработки нажатия на цифровые кнопки и точку
     * @param {string} digit - нажатая цифра или точка
     */
    function onDigitButtonClicked(digit) {
        
        if (!selectedOperation) {
           
            if (digit !== '.' || !a.includes('.')) {
                a += digit;
                
                if (a.length > 1 && a[0] === '0' && a[1] !== '.') {
                    a = a.slice(1);
                }
            }
            outputElement.innerHTML = a || '0';
        } 
        
        else {
            if (digit !== '.' || !b.includes('.')) {
                b += digit;
                
                if (b.length > 1 && b[0] === '0' && b[1] !== '.') {
                    b = b.slice(1);
                }
            }
            outputElement.innerHTML = b || '0';
        }
    }

    /**
     * Функция для удаления последнего символа (backspace)
     */
    function onBackspaceClicked() {
        if (!selectedOperation) {
            // Работаем с первым числом
            a = a.slice(0, -1);
            outputElement.innerHTML = a || '0';
        } else {
            // Работаем со вторым числом
            b = b.slice(0, -1);
            outputElement.innerHTML = b || '0';
        }
    }



    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    // Кнопка очистки (C)
    document.getElementById("btn_op_clear").onclick = function() { 
        a = '';
        b = '';
        selectedOperation = null;
        expressionResult = '';
        outputElement.innerHTML = '0';
    }

    // Кнопка backspace (стирание последнего символа)
    document.getElementById("btn_op_backspace").onclick = function() {
        onBackspaceClicked();
    }


    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '' || a === '0') return;
        selectedOperation = '×';  
        b = '';
    }

    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '' || a === '0') return;
        selectedOperation = '+';
        b = '';
    }

    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '' || a === '0') return;
        selectedOperation = '-';
        b = '';
    }

    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '' || a === '0') return;
        selectedOperation = '/';
        b = '';
    }

    // Кнопка равно
    document.getElementById("btn_op_equal").onclick = function() { 
        
        if (a === '' || b === '' || !selectedOperation) {
            return;
        }
            
        switch(selectedOperation) {
            case '×':
                expressionResult = parseFloat(a) * parseFloat(b);
                break;
            case '+':
                expressionResult = parseFloat(a) + parseFloat(b);
                break;
            case '-':
                expressionResult = parseFloat(a) - parseFloat(b);
                break;
            case '/':
                if (parseFloat(b) === 0) {
                    alert('Ошибка: деление на ноль!');
                    return;
                }
                expressionResult = parseFloat(a) / parseFloat(b);
                break;
            default:
                return;
        }
        
        // Ограничиваем количество знаков после запятой
        if (typeof expressionResult === 'number' && 
            !Number.isInteger(expressionResult) && 
            expressionResult.toString().split('.')[1]?.length > 10) {
            expressionResult = expressionResult.toFixed(10);
        }
        
        
        a = expressionResult.toString();
        b = '';
        selectedOperation = null;

        
        outputElement.innerHTML = a;
    } 

};