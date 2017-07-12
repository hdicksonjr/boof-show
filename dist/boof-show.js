'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BoofShow = function (_HTMLElement) {
  _inherits(BoofShow, _HTMLElement);

  _createClass(BoofShow, null, [{
    key: 'observedAttributes',
    get: function get() {
      return ['current-slide'];
    }
  }]);

  function BoofShow() {
    _classCallCheck(this, BoofShow);

    var _this = _possibleConstructorReturn(this, (BoofShow.__proto__ || Object.getPrototypeOf(BoofShow)).call(this));

    _this.currentSlide = 0;
    var root = _this.attachShadow({ mode: 'open' });

    root.appendChild(_this.template.content.cloneNode(true));
    return _this;
  }

  _createClass(BoofShow, [{
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attr, oldVal, newVal) {
      switch (attr) {
        case 'current-slide':
          this.querySelector('div[index="' + oldVal + '"]').setAttribute('hidden', true);
          this.querySelector('div[index="' + newVal + '"]').removeAttribute('hidden');
      }
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      var _this2 = this;

      var backBtn = this.shadowRoot.querySelector('button.back-button');
      backBtn.addEventListener('click', function () {
        if (_this2.currentSlide === 0) {
          return;
        }
        var count = _this2.getAttribute('current-slide') - 1;
        _this2.currentSlide -= 1;
        _this2.setAttribute('current-slide', _this2.currentSlide);
      });
      var nextBtn = this.shadowRoot.querySelector('button.next-button');
      nextBtn.addEventListener('click', function () {
        if (_this2.currentSlide + 1 >= _this2.maxIndex) {
          return;
        }
        _this2.currentSlide += 1;
        _this2.setAttribute('current-slide', _this2.currentSlide);
      });
    }
  }, {
    key: 'createSlide',
    value: function createSlide(slideData, index) {
      var slide = document.createElement('div');

      if (!this.firstSlideCreated) {
        this.firstSlideCreated = true;
      } else {
        slide.setAttribute('hidden', true);
      }
      slide.setAttribute('index', index);

      slide.innerHTML = '\n      <img src="' + slideData.img + '">\n      <p>' + slideData.caption + '</p>';

      this.appendChild(slide);
      this.maxIndex += 1;
    }
  }, {
    key: 'template',
    get: function get() {
      if (this._template) {
        return this._templatea;
      } else {
        this._template = document.createElement('template');
      }

      var body = document.createElement('div');
      body.id = 'boof-show';
      body.innerHTML = '\n      <div>\n        <div class="gallery">\n          <slot></slot>\n        </div>\n        <button class="back-button">back</button>\n        <button class="next-button">next</button>\n      </div>';
      this._template.content.appendChild(body);

      return this._template;
    }
  }, {
    key: 'slides',
    set: function set(slides) {
      this.maxIndex = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = slides[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var i = _step.value;

          this.createSlide(i, this.maxIndex);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return BoofShow;
}(HTMLElement);

customElements.define('boof-show', BoofShow);
