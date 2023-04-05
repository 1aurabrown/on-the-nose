if (!customElements.get('embla-wrapper')) {
  class EmblaWrapper extends HTMLElement {
    constructor() {
      super();

      this.prevButtonNode = this.querySelector('.embla__prev')
      this.nextButtonNode = this.querySelector('.embla__next')

      const options = (this.dataset.options ? JSON.parse(this.dataset.options) : {})
      this.emblaEl = this.querySelector('.embla') || this
      this.options = Object.assign({
        speed: 20,
        containScroll: 'keepSnaps'
      }, options)
    }

    create() {
      this.embla = EmblaCarousel(this.emblaEl, this.options)

      if (this.prevButtonNode && this.nextButtonNode) {
        this.prevButtonNode.addEventListener('click', this.embla.scrollPrev, false)
        this.nextButtonNode.addEventListener('click', this.embla.scrollNext, false)
      }
    }

    connectedCallback() {
      if (typeof(EmblaCarousel) != 'undefined') {
        this.create()
      } else {
        document.addEventListener('emblaLoaded', () => {
          this.create()
        })
      }
    }

    disconnectedCallback() {
      if (this.embla) {
        this.embla.destroy();
      }
    }

  }
  customElements.define('embla-wrapper', EmblaWrapper);
}
