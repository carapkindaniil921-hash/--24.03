console.log(new Date());


let visits = localStorage.getItem('visits') || 0;
visits = parseInt(visits) + 1;
localStorage.setItem('visits', visits);
console.log('Посещений: ' + visits);

let totalTime = localStorage.getItem('totalTime') || 0;
const startTime = Date.now();
window.addEventListener('beforeunload', () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    totalTime += timeSpent;
    localStorage.setItem('totalTime', totalTime);
    
    const avgTime = Math.floor(totalTime / visits);
    const minutes = Math.floor(avgTime / 60);
    const seconds = avgTime % 60;
    
});

function initCalculator() {
    if (document.title !== "Навыки") return;
    
    const main = document.querySelector('main');
    if (!main) return;
    
    const calcHTML = `
        <h3>Калькулятор</h3>
        <div class="calculator">
            <input type="text" class="calc-display" id="calcDisplay" value="0" readonly>
            <div class="calc-buttons">  
                <button class="calc-btn" onclick="addToCalc('7')">7</button>
                <button class="calc-btn" onclick="addToCalc('8')">8</button>
                <button class="calc-btn" onclick="addToCalc('9')">9</button>
                <button class="calc-btn operator" onclick="addToCalc('/')">/</button>
                <button class="calc-btn" onclick="addToCalc('4')">4</button>
                <button class="calc-btn" onclick="addToCalc('5')">5</button>
                <button class="calc-btn" onclick="addToCalc('6')">6</button>
                <button class="calc-btn operator" onclick="addToCalc('*')">×</button>
                <button class="calc-btn" onclick="addToCalc('1')">1</button>
                <button class="calc-btn" onclick="addToCalc('2')">2</button>
                <button class="calc-btn" onclick="addToCalc('3')">3</button>
                <button class="calc-btn operator" onclick="addToCalc('-')">-</button>
                <button class="calc-btn clear" onclick="clearCalc()">C</button>
                <button class="calc-btn" onclick="addToCalc('0')">0</button>
                <button class="calc-btn operator" onclick="addToCalc('+')">+</button>
                <button class="calc-btn" onclick="addToCalc('.')">.</button>
                <button class="calc-btn equals" onclick="calculate()" style="grid-column: span 2;">=</button>
            </div>
        </div>
    `;
    
    main.insertAdjacentHTML('beforeend', calcHTML);
}

let calcValue = "";

function addToCalc(val) {
    calcValue += val;
    document.getElementById('calcDisplay').value = calcValue;
}

const clearCalc = () => {
    calcValue = "";
    document.getElementById('calcDisplay').value = "0";
};

function calculate() {
    try {
        let result = eval(calcValue);
        document.getElementById('calcDisplay').value = result;
        calcValue = result.toString();
    } catch (e) {
        document.getElementById('calcDisplay').value = "Ошибка";
        calcValue = "";
    }
}


function initConverter() {
    if (document.title !== "Главная") return;
    
    const main = document.querySelector('main');
    if (!main) return;
    
    const rates = { RUB: 1, USD: 90, EUR: 98, KZT: 0.2 };
    window.currencyRates = rates;
    
    const converterHTML = `
        <h3>Самый крутой конвертер валют</h3>
        <div class="converter">
            <div class="conv-row">
                <input type="number" class="conv-input" id="convAmount" value="1" min="0">
                <select id="convFrom">
                    <option value="RUB">RUB</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="KZT">KZT</option>
                </select>
            </div>
            <div class="conv-row">
                <input type="text" class="conv-input" id="convResult" readonly placeholder="Результат">
                <select id="convTo">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="RUB">RUB</option>
                    <option value="KZT">KZT</option>
                </select>
            </div>
            <button class="btn" onclick="convertCurrency()" style="width: 100%;">Конвертировать</button>
        </div>
    `;
    
    main.insertAdjacentHTML('beforeend', converterHTML);
}

function convertCurrency() {
    const amount = parseFloat(document.getElementById('convAmount').value);
    const from = document.getElementById('convFrom').value;
    const to = document.getElementById('convTo').value;
    
    if (isNaN(amount)) {
        alert('Гений, а число записывать кто будет??!');
        return;
    }
    
    const inRub = amount * window.currencyRates[from];
    const result = inRub / window.currencyRates[to];
    
    document.getElementById('convResult').value = result.toFixed(2);
}


function initForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
 
    const dateInput = document.getElementById('contactDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        dateInput.addEventListener('input', function() {
            const error = document.getElementById('dateError');
            if (this.value < today) {
                error.style.display = 'block';
                this.style.borderColor = 'red';
            } else {
                error.style.display = 'none';
                this.style.borderColor = 'var(--brown-medium)';
            }
        });
    }
    
    const fullnameInput = document.getElementById('fullname');
    if (fullnameInput) {
        fullnameInput.addEventListener('input', function() {
            const output = document.getElementById('fullnameOutput');
            const parts = this.value.trim().split(' ');
            
            if (parts.length >= 2) {
                output.innerHTML = `Фамилия: <b>${parts[0]}</b>, Имя: <b>${parts[1]}</b>, Отчество: <b>${parts[2] || 'не указано'}</b>`;
            } else {
                output.innerHTML = '';
            }
        });
    }
    

    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            if (!x[2]) {
                e.target.value = x[1] ? '+7' : '';
            } else {
                e.target.value = !x[3] ? `+7 (${x[2]}` : `+7 (${x[2]}) ${x[3]}` + (x[4] ? `-${x[4]}` : '') + (x[5] ? `-${x[5]}` : '');
            }
        });
    }
    

    const photoInput = document.getElementById('photo');
    const photoPreview = document.getElementById('photoPreview');
    if (photoInput && photoPreview) {
        photoInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.addEventListener('load', function() {
                    photoPreview.src = this.result;
                    photoPreview.style.display = 'block';
                });
                reader.readAsDataURL(file);
            }
        });
    }
    

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fields = ['name', 'email', 'message'];
        let isValid = true;
        
        fields.forEach(id => {
            const el = document.getElementById(id);
            if (el && el.value.trim() === '') {
                el.style.borderColor = 'red';
                isValid = false;
            } else if (el) {
                el.style.borderColor = 'var(--brown-medium)';
            }
        });
        
        const phone = document.getElementById('phone').value;
        if (phone.length < 10) {
            document.getElementById('phoneError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('phoneError').style.display = 'none';
        }
        
        if (isValid) {
            showModal('Мегахорош', 'Твое сообщение было отправлено в никуда.');
            form.reset();
            photoPreview.style.display = 'none';
            document.getElementById('fullnameOutput').innerHTML = '';
        } else {
            showModal('Упс, ошибочка :з', 'Заполни все поля!');
        }
    });
}


function showModal(title, message) {
    const modal = document.getElementById('modal');
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalMessage').innerText = message;
    modal.style.display = 'flex';
}

window.closeModal = () => {
    document.getElementById('modal').style.display = 'none';
};


document.addEventListener('DOMContentLoaded', () => {
    initCalculator();
    initConverter();
    initForm();
});