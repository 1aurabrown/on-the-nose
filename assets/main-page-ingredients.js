if (!customElements.get('main-page-ingredients')) {
  customElements.define('main-page-ingredients', class MainPageIngredients extends HTMLElement {
    constructor() {
      super();
      this.loadButton = this.querySelector('.main-page-ingredients__load-more');

      this.filtersItemsWrapper = this.querySelector('.main-page-ingredients__filters-items');
      this.filtersWrapper = this.querySelector('.main-page-ingredients__filters');
      this.filtersForm = this.querySelector('.filters-form');
      this.filtersProducts = this.querySelectorAll('.filters-form__input');
      this.filtersToggle = this.querySelector('.main-page-ingredients__filters-toggle')

      this.ingredientsItems = this.querySelectorAll('.main-page-ingredients__item');
      this.ingredientCards = this.querySelectorAll('.ingredient-card');

      this.pagesVisible = 1;
      this.pageSize = parseInt(this.dataset.pageSize) || 4
      this.filterProducts = []
      this.transitionDuration = 250
      this.bindEvents()
   }

    update() {
      const filterProducts = this.filterProducts || []
      const maxItems = this.pageSize * this.pagesVisible;
      var matchCount = 0;

      this.ingredientsItems.forEach((el, index) => {
        const itemProducts = JSON.parse(el.dataset.products)

        // Find maxItems + 1 matches to determine if Load More button must be shown.
        // After that, computation of filter matching is not necessary.
        const isMatch = (matchCount <= maxItems + 1 ) &&
          (
            filterProducts.length == 0 ||
            filterProducts.filter(value => itemProducts.includes(value)).length > 0
          )

        if (isMatch) matchCount += 1;

        const isVisible = isMatch && (matchCount <= maxItems)
        if (isVisible && el.classList.contains('hidden')) {
          el.classList.add('opacity-0');
          el.classList.remove('hidden');
          setTimeout(() => { el.classList.remove('opacity-0')}, 0);
        } else if (!isVisible && !el.classList.contains('hidden')) {
          el.classList.add('hidden')
        }
      })

      matchCount > maxItems ? this.showLoadButton() : this.hideLoadButton();
    }

    loadMore() {
      this.pagesVisible += 1;
      this.update();
    }


    fadeOut() {
      this.ingredientsItems.forEach((el, index) => {
        if (!el.classList.contains('hidden')) {
          el.classList.add('opacity-0');
          setTimeout(() => el.classList.add('hidden'), this.transitionDuration)
        }
      })
    }

    showLoadButton() {
      if (this.loadButton.classList.contains('hidden')) {
        this.loadButton.classList.add('opacity-0');
        this.loadButton.classList.remove('hidden');
        setTimeout(() => { this.loadButton.classList.remove('opacity-0')}, 0);
      }
    }

    hideLoadButton() {
      if (!this.loadButton.classList.contains('hidden')) {
        this.loadButton.classList.add('opacity-0')
        setTimeout(() => { this.loadButton.classList.add('hidden') }, this.transitionDuration)
      }
    }

    toggleFilters() {
      this.filtersItemsWrapper.classList.contains('hidden') ? this.showFilters() : this.hideFilters()
    }

    showFilters() {
      if (this.filtersItemsWrapper.classList.contains('hidden')) {
        this.filtersItemsWrapper.classList.add('opacity-0');
        this.filtersItemsWrapper.classList.remove('hidden');
        setTimeout(() => { this.filtersItemsWrapper.classList.remove('opacity-0')}, 0);
      }
    }

    hideFilters() {
      if (!this.filtersItemsWrapper.classList.contains('hidden')) {
        this.filtersItemsWrapper.classList.add('opacity-0')
        setTimeout(() => { this.filtersItemsWrapper.classList.add('hidden') }, this.transitionDuration)
      }
    }

    filterChanged() {
      this.filterProducts = Array.from(this.filtersProducts).reduce((acc, filter) => {
        if (filter.checked) acc.push(filter.value)
        return acc
      }, [])
      this.pagesVisible = 1;
      this.fadeOut()
      setTimeout(this.update, this.transitionDuration);
    }

    bindEvents() {
      this.loadMore = this.loadMore.bind(this)
      this.update = this.update.bind(this)
      this.fadeOut = this.fadeOut.bind(this)
      this.filterChanged = this.filterChanged.bind(this)
      this.hideFilters = this.hideFilters.bind(this)
      this.toggleFilters = this.toggleFilters.bind(this)
      this.showFilters = this.showFilters.bind(this)
      this.clickOutside = this.clickOutside.bind(this)
    }

    connectedCallback() {
      this.loadButton.addEventListener('click', this.loadMore)
      this.filtersToggle.addEventListener('click', this.toggleFilters)
      this.filtersProducts.forEach(el => {
        el.addEventListener('change', this.filterChanged)
      })

      document.addEventListener('click', this.clickOutside);
    }

    // Single listener for clicking outside of all ingredient cards.
    clickOutside(e) {
      if(!e.target.closest('.main-page-ingredients__filters')) {
        this.hideFilters();
      }
    }

    disconnectedCallback() {
      document.removeEventListener('click', this.clickOutside);
      this.loadButton.removeEventListener('click', this.loadMore)
      this.filtersProducts.forEach(el => {
        el.removeEventListener('change', this.filterChanged)
      })
    }
  });
}
