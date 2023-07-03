class FormValidator {
  constructor(formSelector, config) {
    this._form = document.querySelector(formSelector);
    this._config = config;
    this._inputs = this._form.querySelectorAll('.form__input');
    this._currentPass = '';
    this._submitButton = this._form.querySelector('[type="submit"]');
  }

  _fulfillInputError(input, errorMessage) {
    const error = this._form.querySelector(`.${input.name}-error`);
    error.textContent = errorMessage;
  }

  _clearInputError(input) {
    const error = this._form.querySelector(`.${input.name}-error`);
    error.textContent = '';
  }

  _checkInputValidity(input) {
    if (input.validity.patternMismatch) {
      input.setCustomValidity(this._config[input.name].valMsg);
      this._fulfillInputError(input, input.validationMessage);
    } else if (input.validity.valueMissing) {
      input.setCustomValidity('Заполните это поле');
      this._fulfillInputError(input, input.validationMessage);
    }    
    else {
      input.setCustomValidity('');
      this._clearInputError(input);
    }
    if (input.name === 'pass') {
      this._currentPass = input.value;
    }
    if (input.name === 'confpass' && input.value !== this._currentPass) {
      input.setCustomValidity(this._config.confpass.valMsg);
      this._fulfillInputError(input, input.validationMessage);
    }
  }

  _checkFormValidity() {
    this._inputs.forEach(input => {
      input.setAttribute('pattern', this._config[input.name].regexp);
      this._checkInputValidity(input);
    });
  }

  startValidation() {
    this._submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      this._checkFormValidity();
    })
  }
}

const validationConfig = {
  name: {
    regexp: '^[A-zА-яё]{3,30}$',
    valMsg: 'Только кириллица/латиница, от 3 до 30 символов',
  },
  tel: {
    regexp: '^[\+]?[0-9]{10,15}$',
    valMsg: 'От 10 до 15 символов, состоит из цифр, может начинаться с плюса',
  },
  pass: {
    regexp: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$',
    valMsg: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  },
  confpass: {
    regexp: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$',
    valMsg:
      'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра, пароли должны совпадать',
  },
};

const formValidator = new FormValidator('.form', validationConfig);

formValidator.startValidation();

let aaasssAS1 = 0;
