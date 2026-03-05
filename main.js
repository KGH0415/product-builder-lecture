class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'lotto-wrapper');

    const button = document.createElement('button');
    button.textContent = '번호 추첨';
    button.addEventListener('click', () => this.generateNumbers());

    const numbersContainer = document.createElement('div');
    numbersContainer.setAttribute('class', 'numbers-container');
    numbersContainer.setAttribute('aria-live', 'polite'); // Accessibility improvement

    const style = document.createElement('style');
    style.textContent = `
      @keyframes number-appear {
        from {
          opacity: 0;
          transform: scale(0.5);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .lotto-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
      }

      button {
        background-color: #00aaff;
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
        box-shadow:
          0 0 5px #00aaff,
          0 0 10px #00aaff,
          0 0 20px #00aaff;
      }

      button:hover {
        background-color: #0088cc;
        box-shadow:
          0 0 10px #00aaff,
          0 0 20px #00aaff,
          0 0 40px #00aaff;
      }

      button:active {
        transform: scale(0.95);
      }

      .numbers-container {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
      }

      .number {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.8rem;
        font-weight: bold;
        color: #fff;
        border: 2px solid #444;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        animation: number-appear 0.5s ease-out forwards;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(button);
    wrapper.appendChild(numbersContainer);
  }

  generateNumbers() {
    const numbersContainer = this.shadowRoot.querySelector('.numbers-container');
    numbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a,b) => a-b);

    sortedNumbers.forEach((number, index) => {
        setTimeout(() => {
            const numberElement = document.createElement('div');
            numberElement.setAttribute('class', 'number');
            numberElement.textContent = number;
            numbersContainer.appendChild(numberElement);
        }, index * 100); // Stagger the animation
    });
  }
}

customElements.define('lotto-generator', LottoGenerator);
