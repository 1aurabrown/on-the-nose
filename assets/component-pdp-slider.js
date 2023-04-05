if (!customElements.get('pdp-slider')) {
  customElements.define('pdp-slider', class PdpSlider extends HTMLElement {
    constructor() {
      super();

      this.onThumbClick = this.onThumbClick.bind(this);
      this.onSlideChanged = this.onSlideChanged.bind(this);
      this.elements = {
        liveRegion: this.querySelector('[id^="GalleryStatus"]'),
        viewer: this.querySelector('[id^="GalleryViewer"]'),
        thumbnails: this.querySelector('[id^="GalleryThumbnails"]'),
        thumbButtons: this.querySelectorAll('[id^="GalleryThumbnails"] button')
      }
    }

    bindEvents() {
      this.viewerEmbla.on("select", this.onSlideChanged);
      this.onSlideChanged()
      this.elements.thumbButtons.forEach((button) => {
        button.addEventListener("click", this.onThumbClick, false);
      });
    }

    //

    connectedCallback() {
      const init = () => {
        if (!this.elements.viewer.hasAttribute('data-slider')) return;
        this.viewerEmbla = EmblaCarousel(this.elements.viewer, {loop: true, speed: 20, align: 'center', draggable: true })
        this.thumbsEmbla = EmblaCarousel(this.elements.thumbnails, { containScroll: true, loop: false, speed: 20, align: 0, draggable: true })
        this.bindEvents()
      }
      if (typeof(EmblaCarousel) != 'undefined') {
        init()
      } else {
        document.addEventListener('emblaLoaded', () => {
          init()
        })
      }
    }

    disconnectedCallback() {
      if (this.viewerEmbla) this.viewerEmbla.destroy();
    }


    //

    onThumbClick(e) {
      this.viewerEmbla.scrollTo(e.currentTarget.dataset.index);
    }

    selectImageById(id) {
      const slide = this.querySelector('#' + id)
      this.viewerEmbla.scrollTo(slide.dataset.mediaPosition);
    }

    onSlideChanged() {
      const index = this.viewerEmbla.selectedScrollSnap();
      this.selectThumbBtn(index);
      this.selectMainImage(index);
    }

    selectThumbBtn(index) {
      this.thumbsEmbla.scrollTo(index);
      const currentButton = this.thumbsEmbla.containerNode().querySelector(`[data-index="${index}"]`)
      this.elements.thumbButtons.forEach((button) => {
        if (button == currentButton) {
          currentButton.setAttribute('aria-current', true);
          currentButton.classList.remove('opacity-60');
          currentButton.classList.add('opacity-100', 'blur-none');
        } else {
          button.removeAttribute('aria-current');
          button.classList.remove('opacity-100', 'blur-none');
          button.classList.add('opacity-60');
        }
      })

    }

    selectMainImage(index) {
      const currentSlide = this.viewerEmbla.slideNodes()[index]
      this.viewerEmbla.slideNodes().forEach((node) => {
        if (node == currentSlide) {
          currentSlide.setAttribute('aria-current', true);
        } else {
          node.removeAttribute('aria-current');
        }
      })
    }

  });
}
