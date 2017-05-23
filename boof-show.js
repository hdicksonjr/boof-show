class BoofShow extends HTMLElement {

  static get observedAttributes() {
    return ['current-slide'];
  }

  constructor() {
    super();

    this.currentSlide = 0;
    const root = this.attachShadow({mode: 'open'});

    root.appendChild(this.template.content.cloneNode(true))
  }

  get template() {
    if(this._template) {
      return this._templatea;
    } else {
      this._template = document.createElement('template');
    }

    let body = document.createElement('div');
    body.id = 'boof-show';
    body.innerHTML = `
      <div>
        <div class="gallery">
          <slot></slot>
        </div>
        <button class="back-button">back</button>
        <button class="next-button">next</button>
      </div>`
    this._template.content.appendChild(body);

    return this._template;
  }

  set slides(slides) {
    this.maxIndex = 0;
    for (var i of slides) {
      this.createSlide(i, this.maxIndex)
    }
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    switch (attr) {
      case 'current-slide':
        this.querySelector(`div[index="${oldVal}"]`).setAttribute('hidden', true);
        this.querySelector(`div[index="${newVal}"]`).removeAttribute('hidden');
    }
  }

  connectedCallback() {
    var backBtn = this.shadowRoot.querySelector('button.back-button');
    backBtn.addEventListener('click', () => {
      if (this.currentSlide === 0) {
        return
      }
      var count = this.getAttribute('current-slide') - 1;
      this.currentSlide -= 1;
      this.setAttribute('current-slide', this.currentSlide);
    });
    var nextBtn = this.shadowRoot.querySelector('button.next-button');
    nextBtn.addEventListener('click', () => {
      if ((this.currentSlide + 1) >= this.maxIndex) {
        return
      }
      this.currentSlide += 1;
      this.setAttribute('current-slide', this.currentSlide);
    });
  }

  createSlide(slideData, index) {
    let slide = document.createElement('div')

    if (!this.firstSlideCreated) {
      this.firstSlideCreated = true;
    } else {
      slide.setAttribute('hidden', true);
    }
    slide.setAttribute('index', index)

    slide.innerHTML = `
      <img src="${slideData.img}">
      <p>${slideData.caption}</p>`

    this.appendChild(slide);
    this.maxIndex += 1;
  }
}

customElements.define('boof-show', BoofShow);