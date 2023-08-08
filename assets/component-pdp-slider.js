if (!customElements.get('pdp-slider')) {
  class ProductSlider extends HTMLElement {
    constructor() {
      super();
      this.swiperEl = this.querySelector('.pdp-swiper')
      this.options = {
        slidesPerView: 'auto',
        loop: true,
        threshold: 10,
        centeredSlides: false,
        preventClicksPropagation: false,
        navigation: {
          nextEl: '.pdp-next',
          prevEl: '.pdp-prev',
        },
        pagination: {
          el: '.swiper-fractions',
          type: 'custom',
          renderCustom: function (swiper, current, total) {
              return '(' + current + '/' + total + ')';
          }
        }
      }
    }

    create() {
      this.swiper = new Swiper(this.swiperEl, this.options)
    }

    connectedCallback() {
      if (typeof(Swiper) != 'undefined') {
        this.create()
      } else {
        document.addEventListener('swiperLoaded', () => {
          this.create()
        })
      }
    }

    disconnectedCallback() {
      if (this.swiper) {
        this.swiper.destroy();
      }
    }

  }
  customElements.define('pdp-slider', ProductSlider);
}
