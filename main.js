class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.isGenerating = false;

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'lotto-wrapper');

    const toast = document.createElement('div');
    toast.setAttribute('class', 'toast');
    toast.textContent = '잠시만 기다려주세요';

    const button = document.createElement('button');
    button.textContent = '번호 추첨';
    button.addEventListener('click', () => this.generateNumbers());

    const numbersContainer = document.createElement('div');
    numbersContainer.setAttribute('class', 'numbers-container');
    numbersContainer.setAttribute('aria-live', 'polite');

    const style = document.createElement('style');
    style.textContent = `
      @keyframes number-appear {
        from { opacity: 0; transform: scale(0.5) rotate(-180deg); }
        to { opacity: 1; transform: scale(1) rotate(0); }
      }

      @keyframes fade-in-out {
        0% { opacity: 0; transform: translateY(10px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-10px); }
      }

      .lotto-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        position: relative;
      }

      .toast {
        position: absolute;
        top: -45px;
        background: #ff4757;
        color: white;
        padding: 0.6rem 1.2rem;
        border-radius: 12px;
        font-size: 0.9rem;
        font-weight: bold;
        opacity: 0;
        pointer-events: none;
        box-shadow: 0 4px 12px rgba(255, 71, 87, 0.3);
        z-index: 10;
      }

      .toast.show {
        animation: fade-in-out 1.5s forwards;
      }

      button {
        background-color: var(--heading-color, #007bff);
        color: white;
        border: none;
        padding: 1rem 2.5rem;
        border-radius: 50px;
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
      }

      button:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0, 123, 255, 0.4); }
      button:active { transform: scale(0.95); }

      .numbers-container {
        display: flex;
        gap: 0.8rem;
        flex-wrap: wrap;
        justify-content: center;
        min-height: 70px;
      }

      .number {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--ball-bg, #e9ecef);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3rem;
        font-weight: bold;
        color: var(--ball-text, #495057);
        border: 2px solid var(--ball-border, #ced4da);
        box-shadow: 0 4px 8px var(--shadow-color, rgba(0,0,0,0.1));
        animation: number-appear 0.5s forwards;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(toast);
    wrapper.appendChild(button);
    wrapper.appendChild(numbersContainer);
  }

  showToast() {
    const toast = this.shadowRoot.querySelector('.toast');
    toast.classList.remove('show');
    void toast.offsetWidth; 
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1500);
  }

  generateNumbers() {
    if (this.isGenerating) {
      this.showToast();
      return;
    }

    this.isGenerating = true;
    const numbersContainer = this.shadowRoot.querySelector('.numbers-container');
    numbersContainer.innerHTML = '';
    
    const numbers = new Set();
    while (numbers.size < 7) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a,b) => a-b);
    
    sortedNumbers.forEach((number, index) => {
        setTimeout(() => {
            const numberElement = document.createElement('div');
            numberElement.setAttribute('class', 'number');
            numberElement.textContent = number;
            numbersContainer.appendChild(numberElement);
            
            if (index === sortedNumbers.length - 1) {
              this.isGenerating = false;
            }
        }, index * 150);
    });
  }
}

customElements.define('lotto-generator', LottoGenerator);

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    if (themeToggle) {
        themeToggle.onclick = () => {
            html.classList.toggle('dark-mode');
            const isDarkMode = html.classList.contains('dark-mode');
            themeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
        };
    }
});
