import type LoginHandler from '../../../login-handler/login-handler';

import type { ElementList } from '../../../types/types';
import ComplexElement from '../../../utils/complex-element';
import ElementBuilder from '../../../utils/element-builder';
import './auth-page.css';

const ELEM_PARAMS: ElementList = {
  authPage: {
    tag: 'section',
    properties: {
      className: 'auth-page',
    },
  },
  nameInput: {
    tag: 'input',
    properties: {
      className: 'input',
      placeholder: 'Name',
      title: 'Login must consist of 4 to 12 characters, letters, spaces and numbers only',
    },
  },
  nameInputHint: {
    tag: 'span',
    properties: {
      className: 'input-hint',
    },
  },
  passwordInput: {
    tag: 'input',
    properties: {
      className: 'input',
      placeholder: 'password',
      type: 'password',
      title:
        'Password must have at least 6 letters, at least 1 number, 1 capital letter, 1 small letter',
    },
  },
  passwordInputHint: {
    tag: 'span',
    properties: {
      className: 'input-hint',
    },
  },
  confirmBtn: {
    tag: 'button',
    properties: {
      className: 'button',
      textContent: 'Confirm',
    },
  },
  aboutBtn: {
    tag: 'button',
    properties: {
      className: 'button',
      textContent: 'About',
    },
  },
};

export default class AuthPage extends ComplexElement<HTMLElement> {
  protected nameInput: ElementBuilder<HTMLInputElement>;
  protected nameInputHint: ElementBuilder<HTMLElement>;
  protected passwordInput: ElementBuilder<HTMLInputElement>;
  protected passwordInputHint: ElementBuilder<HTMLElement>;
  protected confirmBtn: ElementBuilder<HTMLElement>;
  protected aboutBtn: ElementBuilder<HTMLElement>;
  protected isValidLogin = false;
  protected isValidPassword = false;
  private loginHandler: LoginHandler;

  constructor(loginHandler: LoginHandler) {
    super(ELEM_PARAMS.authPage);
    this.loginHandler = loginHandler;
    this.nameInput = new ElementBuilder<HTMLInputElement>(ELEM_PARAMS.nameInput);
    this.nameInputHint = new ElementBuilder(ELEM_PARAMS.nameInputHint);
    this.passwordInput = new ElementBuilder<HTMLInputElement>(ELEM_PARAMS.passwordInput);
    this.passwordInputHint = new ElementBuilder(ELEM_PARAMS.passwordInputHint);
    this.confirmBtn = new ElementBuilder(ELEM_PARAMS.confirmBtn);
    this.aboutBtn = new ElementBuilder(ELEM_PARAMS.aboutBtn);
    this.configureAuthPage();
  }

  protected configureAuthPage(): void {
    this.element.append([
      this.nameInput,
      this.nameInputHint,
      this.passwordInput,
      this.passwordInputHint,
      this.confirmBtn,
      this.aboutBtn,
    ]);
    this.configureConfirmBtn();
    this.configureLoginInput();
    this.configurePasswordInput();
    /*     this.configureLoginProcess(); */
  }

  protected configureLoginInput(): void {
    this.nameInput.addEventListener('input', () => {
      const result = this.nameInput.getElement().value;
      const testPattern = /^[\d A-Za-zЁА-яё]+$/;
      const message = ['Login must contain'];
      if (result.length < 4) message.push('at least 4 characters');
      if (result.length > 12) message.push('no more than 12 characters');
      if (!testPattern.test(result)) message.push('letters and numbers only');
      if (message.length === 1) {
        this.nameInputHint.getElement().textContent = '';
        this.isValidLogin = true;
        this.confirmBtn.getElement().removeAttribute('disabled');
      } else {
        this.nameInputHint.getElement().textContent = message.join(' ');
        this.isValidLogin = false;
        this.confirmBtn.getElement().setAttribute('disabled', 'true');
      }
    });
  }

  protected configurePasswordInput(): void {
    this.passwordInput.addEventListener('input', () => {
      const result = this.passwordInput.getElement().value;
      const testPatternNumber = /\d/;
      const testPatternCapitalLetter = /[A-ZЁА-Я]/;
      const testPatternSmallLetter = /[a-zа-яё]/;
      const testPatternSpecial = /[!"#$%&'()*+/;@^_`]/;
      const message = ['Login must contain'];
      if (result.length < 6) message.push('at least 6 characters');
      if (!testPatternNumber.test(result)) message.push('at least 1 number');
      if (!testPatternCapitalLetter.test(result)) message.push('at least 1 capital letter');
      if (!testPatternSmallLetter.test(result)) message.push('at least 1 small letter');
      if (testPatternSpecial.test(result)) message.push('no special characters');
      if (message.length === 1) {
        this.passwordInputHint.getElement().textContent = '';
        this.isValidPassword = true;
        this.confirmBtn.getElement().removeAttribute('disabled');
      } else {
        this.passwordInputHint.getElement().textContent = message.join(' ');
        this.isValidPassword = false;
        this.confirmBtn.getElement().setAttribute('disabled', 'true');
      }
    });
  }

  protected configureConfirmBtn(): void {
    this.confirmBtn.getElement().addEventListener('click', () => {
      this.login();
    });
    this.element.getElement().addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.login();
      }
    });
    this.confirmBtn.getElement().setAttribute('disabled', 'true');
  }

  protected login(): void {
    if (this.isValidLogin && this.isValidPassword)
      this.loginHandler.loginInit(
        this.nameInput.getElement().value,
        this.passwordInput.getElement().value,
      );
  }

  protected configureAboutBtn(): void {
    this.aboutBtn.getElement().addEventListener('click', () => {
      console.log('Under construction');
    });
  }
}
