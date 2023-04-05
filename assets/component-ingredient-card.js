if (!customElements.get('ingredient-card')) {
  customElements.define('ingredient-card', class IngredientCard extends HTMLElement {
    constructor() {
      super();
      this.showButton = this.querySelector('.ingredient-card__button-show');
      this.hideButton = this.querySelector('.ingredient-card__button-hide');
      this.bindEvents()
   }

    show() {
      this.classList.add('ingredient-card--flipped')
    }

    hide() {
      this.classList.remove('ingredient-card--flipped')
    }

    bindEvents() {
      this.show = this.show.bind(this)
      this.hide = this.hide.bind(this)
      this.clickOutside = this.clickOutside.bind(this)
    }

    // Single listener for clicking outside of all ingredient cards.
    clickOutside(e) {
      if(!this.contains(e.target)) {
        if (this.classList.contains('ingredient-card--flipped')) this.hide()
      }
    }

    connectedCallback() {
      this.showButton.addEventListener('click', this.show)
      this.hideButton.addEventListener('click', this.hide)
      document.addEventListener('click', this.clickOutside);
    }

    disconnectedCallback() {
      this.showButton.removeEventListener('click', this.show)
      this.hideButton.removeEventListener('click', this.hide)
      document.removeEventListener('click', this.clickOutside);
    }
  });
}
