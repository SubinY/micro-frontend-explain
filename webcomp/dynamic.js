class TextReverse extends HTMLElement {
  constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      const text = this.getAttribute('text') || '';
      const wrapper = document.createElement('span');

      // css
      const style = document.createElement('style');
      style.textContent = `* {
          background: red;
      }`
      shadowRoot.appendChild(style);

      wrapper.textContent = text.split('').reverse().join('');
      shadowRoot.appendChild(wrapper);
  }
}

customElements.define(
  'text-reverse',
  TextReverse
)