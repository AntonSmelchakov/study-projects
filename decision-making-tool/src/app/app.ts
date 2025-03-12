import Main from './page/main/main';

export default class App {
  public main: Main;
  constructor() {
    this.main = new Main();
    this.buildPage();
  }

  public buildPage(): void {
    document.body.append(this.main.getNode());
  }
}
