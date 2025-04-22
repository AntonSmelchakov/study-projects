import LoginHandler from './login-handler/login-handler';
import Main from './page/main/main';
import Router from './router/router';
import ServerHandler from './server-handler/server-handler';
import StateHandler from './state-handler/state-handler';

export default class App {
  private main: Main;
  private stateHandler: StateHandler;
  private router: Router;
  private serverHandler: ServerHandler;
  private loginHandler: LoginHandler;
  constructor() {
    this.stateHandler = new StateHandler();
    this.serverHandler = new ServerHandler();
    this.router = new Router(this.serverHandler, this.stateHandler);
    this.loginHandler = new LoginHandler(this.serverHandler, this.stateHandler, this.router);
    this.main = new Main(this.stateHandler, this.router, this.serverHandler, this.loginHandler);
    this.router.configureRouter(this.main);
  }
}
