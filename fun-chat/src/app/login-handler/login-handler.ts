import type Router from '../router/router';
import { PagesEnum } from '../router/router';
import type { ServerPayloadType } from '../server-handler/server-handler';
import ServerHandler from '../server-handler/server-handler';
import type StateHandler from '../state-handler/state-handler';

export default class LoginHandler {
  protected login: string | undefined;
  protected password: string | undefined;
  protected serverHandler: ServerHandler;
  protected stateHandler: StateHandler;
  protected router: Router;

  constructor(serverHandler: ServerHandler, stateHandler: StateHandler, router: Router) {
    this.router = router;
    this.serverHandler = serverHandler;
    this.stateHandler = stateHandler;
    this.configureElement();
  }

  public loginInit(newLogin: string, newPassword: string): void {
    if (this.serverHandler.getState === 1) {
      this.login = newLogin;
      this.password = newPassword;
      this.serverHandler.userAuth({
        user: {
          login: newLogin,
          password: newPassword,
        },
      });
    } else {
      ServerHandler.dispatchCustomEvent('customServerError', {
        id: null,
        type: 'ERROR',
        payload: {
          error: 'connection not yet opened or already closed',
        },
      });
    }
  }

  protected configureElement(): void {
    this.configureLoginProcess();
    this.configureAutoLogin();
    this.configureLogoutProcess();
  }

  protected configureLoginProcess(): void {
    globalThis.addEventListener('userAuthGood', (event) => {
      if (!(event instanceof CustomEvent)) return;
      const data: unknown = event.detail;
      if (ServerHandler.isValidData<ServerPayloadType['userAuth']>(data)) {
        this.stateHandler.login = data.user.login;
        this.stateHandler.password = this.password;
        this.stateHandler.isLoggedIn = true;
        this.stateHandler.setState();
      }
      this.router.switchPageTo(PagesEnum.chat);
    });
  }

  protected configureAutoLogin(): void {
    this.serverHandler.addEventListener('open', () => {
      if (this.stateHandler.login && this.stateHandler.password) {
        this.loginInit(this.stateHandler.login, this.stateHandler.password);
      }
    });
  }

  protected configureLogoutProcess(): void {
    globalThis.addEventListener('userLogoutGood', () => {
      this.stateHandler.login = undefined;
      this.stateHandler.password = undefined;
      this.stateHandler.isLoggedIn = false;
      this.stateHandler.setState();
      this.router.switchPageTo(PagesEnum.authPage);
    });
  }
}
