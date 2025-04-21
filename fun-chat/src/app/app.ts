import Main from './page/main/main';
import Router from './router/router';
import ServerHandler from './server-handler/server-handler';
import StateHandler from './state-handler/state-handler';

export default class App {
  private main: Main;
  private stateHandler: StateHandler;
  private router: Router;
  private serverHandler: ServerHandler;
  constructor() {
    this.stateHandler = new StateHandler();
    this.serverHandler = new ServerHandler();
    this.router = new Router(this.serverHandler, this.stateHandler);
    this.main = new Main(this.stateHandler, this.router, this.serverHandler);
    this.router.configureRouter(this.main);
  }
}
