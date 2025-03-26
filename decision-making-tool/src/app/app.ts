import Main from './page/main/main';
import Router from './router/router';
import StateHandler from './state-handler/state-handler';

export default class App {
  private main: Main;
  private stateHandler: StateHandler;
  private router: Router;
  constructor() {
    this.stateHandler = new StateHandler();
    this.router = new Router();
    this.main = new Main(this.stateHandler, this.router);
    this.router.configureRouter(this.main);
    this.buildPage();
  }

  public buildPage(): void {
    document.body.append(this.main.getElement());
  }
}
