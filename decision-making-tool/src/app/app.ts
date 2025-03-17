import Main from './page/main/main';
import StateHandler from './state-handler/state-handler';

export default class App {
  private main: Main;
  private stateHandler: StateHandler;
  constructor() {
    this.stateHandler = new StateHandler();
    this.main = new Main(this.stateHandler);
    this.buildPage();
  }

  public buildPage(): void {
    document.body.append(this.main.getElement());
  }
}
