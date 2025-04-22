import type LoginHandler from '../../login-handler/login-handler';
import type Router from '../../router/router';
import type { ServerPayloadType } from '../../server-handler/server-handler';
import ServerHandler from '../../server-handler/server-handler';
import type StateHandler from '../../state-handler/state-handler';
import ComplexElement from '../../utils/complex-element';
import ElementBuilder from '../../utils/element-builder';
import Footer from '../footer/footer';
import Header from '../header/header';
import AuthPage from './auth-page/auth-page';
import Chat from './chat/chat';
import NotFound from './not-found/not-found';

const ELEM_PARAMS = {
  errorMsg: {
    tag: 'p',
    properties: {
      className: 'error-msg',
    },
  },
};

export default class Main extends ComplexElement<HTMLElement> {
  public pages: ComplexElement<HTMLElement>[];
  public authPage: AuthPage;
  public chat: Chat;
  public notFound: NotFound;
  public errorMsg: ElementBuilder<HTMLElement>;
  public header: Header;
  public footer: Footer;

  constructor(
    stateHandler: StateHandler,
    router: Router,
    serverHandler: ServerHandler,
    loginHandler: LoginHandler,
  ) {
    super({ tag: 'main', properties: { className: 'main' } });
    this.authPage = new AuthPage(stateHandler, router, serverHandler, loginHandler);
    this.chat = new Chat(serverHandler, stateHandler);
    this.notFound = new NotFound(router, stateHandler);
    this.errorMsg = new ElementBuilder(ELEM_PARAMS.errorMsg);
    this.header = new Header(serverHandler, stateHandler);
    this.footer = new Footer();
    this.configureElement();
    this.pages = [this.authPage, this.chat, this.notFound];
  }

  public configureElement(): void {
    this.configureErrorMsg();
    document.body.append(this.element.getElement());
    this.element.getElement().append(this.authPage.getElement());
    this.element.getElement().insertAdjacentElement('beforebegin', this.header.getElement());
    this.element.getElement().after(this.footer.getElement());
    document.body.append(this.errorMsg.getElement());
  }

  protected configureErrorMsg(): void {
    globalThis.addEventListener('customServerError', (event) => {
      if (!(event instanceof CustomEvent)) return;
      const data: unknown = event.detail;
      if (ServerHandler.isValidData<ServerPayloadType['error']>(data)) {
        this.errorMsg.getElement().textContent = data.error;
      }
    });
  }
}
