if (!customElements.get('madlib-text')) {
  class MadlibText extends HTMLElement {
    constructor() {
      super();
      this.currentIndex = 0
      this.phrases = JSON.parse(this.dataset.phrases)
      this.text = this.querySelector('.madlib-text__text')
      this.cursor = this.querySelector('.madlib-text__cursor')
      if (!(this.phrases && this.phrases.length > 0)) return;
      this.write()
    }

    next() {
      this.currentIndex = (this.currentIndex + 1) % this.phrases.length
      this.write()
    }

    get currentPhrase() {
      return this.phrases[this.currentIndex]
    }

    delete() {
      if (this.text.innerText.length == 0) {
        return setTimeout(this.next.bind(this), 200)
      }

      this.text.innerText = this.currentPhrase.slice(0, this.text.innerText.length - 1)
      setTimeout(this.delete.bind(this), 50)
    }

    write() {
      if (this.text.innerText.length == this.currentPhrase.length) {
        this.cursor.classList.remove('disabled')
        return setTimeout(() => {
          this.cursor.classList.add('disabled')
          this.delete()
        }, 1500)
      }
      this.text.innerText = this.currentPhrase.slice(0, this.text.innerText.length + 1)
      setTimeout(this.write.bind(this), 150)
    }
  }

  customElements.define('madlib-text', MadlibText);
}