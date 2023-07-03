class Slider {
  constructor(docSelectors, slides = ['no Link here']) {
    this._slides = slides;
    this._slider = document.querySelector(docSelectors.sliderSelector);
    this._container = this._slider.querySelector(docSelectors.containerSelector);
    this._sliderStripe = this._container.querySelector(docSelectors.sliderStripeSelector);
    this._leftButton = this._slider.querySelector(docSelectors.leftButtonSelector);
    this._rightButton = this._slider.querySelector(docSelectors.rightButtonSelector);
  }

  _setWidth() {
    this._offset = 0;
    this._width = this._container.getBoundingClientRect().width;
  }

  _prevSlide = () => {
    this._offset += this._width;
    if (this._offset > 0) this._offset = -(this._width * (this._slides.length - 1));
    this._sliderStripe.style.left = this._offset + 'px';
  };

  _nextSlide = () => {
    this._offset -= this._width;
    if (this._offset < -(this._width * (this._slides.length - 1))) this._offset = 0;
    this._sliderStripe.style.left = this._offset + 'px';
  };

  _addBehavior = () => {
    this._autoSlide = setInterval(this._nextSlide, 1500);
    this._leftButton.addEventListener('click', this._prevSlide);
    this._rightButton.addEventListener('click', this._nextSlide);
    this._slider.addEventListener('mouseenter', () => {
      clearInterval(this._autoSlide);
    });
    this._slider.addEventListener('mouseleave', () => {
      this._autoSlide = setInterval(this._nextSlide, 1500);
    });
    window.addEventListener('resize', () => {
      this._offset = 0;
      this._setWidth();
    });
  };

  renderSlides = () => {
    this._setWidth();
    this._slides.forEach(slideSrc => {
      const currentimage = document.createElement('img');
      currentimage.src = slideSrc;
      currentimage.classList.add('slider__image');
      this._sliderStripe.append(currentimage);
    });
    this._addBehavior();
  };
}

const slideSources = [
  'https://reqres.in/img/faces/1-image.jpg',
  'https://reqres.in/img/faces/2-image.jpg',
  'https://reqres.in/img/faces/3-image.jpg',
  'https://reqres.in/img/faces/4-image.jpg',
  'https://reqres.in/img/faces/5-image.jpg',
  'https://reqres.in/img/faces/6-image.jpg',
];

const selectors = {
  sliderSelector: '.slider',
  containerSelector: '.slider__container',
  sliderStripeSelector: '.slider__stripe',
  leftButtonSelector: '.slider__button_pos_left',
  rightButtonSelector: '.slider__button_pos_right',
};

const slider = new Slider(selectors, slideSources);

slider.renderSlides();
