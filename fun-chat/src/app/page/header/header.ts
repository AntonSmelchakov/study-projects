import type ServerHandler from '../../server-handler/server-handler';
import type StateHandler from '../../state-handler/state-handler';
import ComplexElement from '../../utils/complex-element';
import ElementBuilder from '../../utils/element-builder';
import './header.css';
const ELEM_PARAMS = {
  title: {
    tag: 'h1',
    properties: {
      className: 'title',
      textContent: 'Fun Chat',
    },
  },
  userName: {
    tag: 'p',
    properties: {
      className: 'user-name',
    },
  },
  logoutBtn: {
    tag: 'button',
    properties: {
      className: 'logout-btn',
      textContent: 'Logout',
    },
  },
};

export default class Header extends ComplexElement<HTMLElement> {
  protected title: ElementBuilder<HTMLElement>;
  protected userName: ElementBuilder<HTMLElement>;
  protected logoutBtn: ElementBuilder<HTMLElement>;
  protected serverHandler: ServerHandler;
  protected stateHandler: StateHandler;

  constructor(serverHandler: ServerHandler, stateHandler: StateHandler) {
    super({ tag: 'header', properties: { className: 'header' } });
    this.title = new ElementBuilder<HTMLElement>(ELEM_PARAMS.title);
    this.userName = new ElementBuilder<HTMLElement>(ELEM_PARAMS.userName);
    this.logoutBtn = new ElementBuilder<HTMLElement>(ELEM_PARAMS.logoutBtn);
    this.serverHandler = serverHandler;
    this.stateHandler = stateHandler;
    this.configureElement();
    this.configureLogoutBtn();
  }

  public setUserName(name: string): void {
    this.userName.getElement().textContent = name;
  }

  public toggleHeader(onOff: boolean): void {
    if (onOff) {
      this.element.getElement().style.display = 'flex';
    } else {
      this.element.getElement().style.display = 'none';
    }
  }

  protected configureElement(): void {
    this.element.append([this.title, this.userName, this.logoutBtn]);
    globalThis.addEventListener('userAuthGood', () => {
      const name = this.stateHandler.login || '';
      this.userName.getElement().textContent = name;
    });
  }

  protected configureLogoutBtn(): void {
    this.logoutBtn.addEventListener('click', () => {
      if (this.stateHandler.login && this.stateHandler.password) {
        this.serverHandler.userLogout({
          user: {
            login: this.stateHandler.login,
            password: this.stateHandler.password,
          },
        });
      }
    });
  }
}
