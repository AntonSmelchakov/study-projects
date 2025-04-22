import type Main from '../page/main/main';
import type ServerHandler from '../server-handler/server-handler';
import type StateHandler from '../state-handler/state-handler';

export enum PagesEnum {
  authPage = 'auth-page',
  chat = 'chat',
  /*   about = 'about', */
  notFound = 'not-found',
}

const pagesValues: string[] = Object.values(PagesEnum);
/* const pagesKeys = Object.keys(PagesEnum); */

function isValidPage(pageName: string): pageName is PagesEnum {
  return pagesValues.includes(pageName);
}

export default class Router {
  protected main: Main | undefined;
  protected stateHandler: StateHandler;
  protected serverHandler: ServerHandler;

  constructor(serverHandler: ServerHandler, stateHandler: StateHandler) {
    this.main = undefined;
    this.serverHandler = serverHandler;
    this.stateHandler = stateHandler;
  }

  private static parseUrl(): string {
    const pathName = globalThis.location.pathname;
    const hash = globalThis.location.hash;
    let pointIndex: number | undefined = pathName.lastIndexOf('.');
    if (pointIndex < 0) pointIndex = undefined;
    const symbolIndex = hash ? '#' : '/';
    const targetString = hash || pathName;
    const result = targetString.slice(targetString.lastIndexOf(symbolIndex) + 1, pointIndex);
    return result;
  }

  private static setHistory(url: string): void {
    globalThis.history.pushState(undefined, '', url);
  }

  public configureRouter(main: Main): void {
    this.main = main;
    this.configureHistoryHandler();
  }

  public switchPageTo(page: PagesEnum, isHistorySet: boolean = true): void {
    if (!this.main) return;
    const target = pagesValues.indexOf(page);
    this.main.getElement().replaceChildren(this.main.pages[target].getElement());
    if (isHistorySet) Router.setHistory(page);
    if (page === PagesEnum.chat) {
      this.main.header.toggleHeader(true);
      this.main.footer.toggleFooter(true);
    } else {
      this.main.header.toggleHeader(false);
      this.main.footer.toggleFooter(false);
    }
  }

  private configureHistoryHandler(): void {
    globalThis.addEventListener('DOMContentLoaded', () => {
      this.navigate();
    });
    globalThis.addEventListener('popstate', () => {
      this.navigate();
    });
  }

  private navigate(isHistorySet: boolean = true): void {
    const parsedPage = Router.parseUrl();
    let targetPage: PagesEnum;
    if (isValidPage(parsedPage)) targetPage = parsedPage;
    else if (parsedPage === '' || parsedPage === 'index') targetPage = PagesEnum.authPage;
    else targetPage = PagesEnum.notFound;

    if (this.stateHandler.isLoggedIn && targetPage === PagesEnum.authPage)
      this.switchPageTo(PagesEnum.chat, isHistorySet);
    else if (!this.stateHandler.isLoggedIn && targetPage === PagesEnum.chat)
      this.switchPageTo(PagesEnum.authPage, isHistorySet);
    else this.switchPageTo(targetPage, isHistorySet);

    /*     const targetPage = Router.parseUrl();
    console.log(targetPage);
    if (isValidPage(targetPage)) {
      if (this.stateHandler.isLoggedIn && targetPage === PagesEnum.authPage)
        this.switchPageTo(PagesEnum.chat, isHistorySet);
      if (!this.stateHandler.isLoggedIn && targetPage === PagesEnum.chat)
        this.switchPageTo(PagesEnum.authPage, isHistorySet);
      this.switchPageTo(targetPage, isHistorySet);
    } else if (targetPage === '' || targetPage === 'index') {
      this.switchPageTo(PagesEnum.authPage, isHistorySet);
    } else this.switchPageTo(PagesEnum.notFound, isHistorySet); */
  }
}
