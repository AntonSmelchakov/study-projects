import type Main from '../page/main/main';

type Pages = 'index' | 'picker';

function isValidPage(pageName: string): pageName is Pages {
  return pageName === 'index' || pageName === 'picker';
}

export default class Router {
  protected main: Main | undefined;

  constructor() {
    this.main = undefined;
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

  public switchPageTo(page: Pages | 'not-found', isHistorySet: boolean = true): void {
    if (!this.main) return;
    console.log(isValidPage(page), page);
    if (isValidPage(page)) this.main.getElement().replaceChildren(this.main[page].getElement());
    else {
      this.main.getElement().replaceChildren(this.main.notFound.getElement());
    }
    if (isHistorySet) Router.setHistory(page);
  }

  private configureHistoryHandler(): void {
    globalThis.addEventListener('DOMContentLoaded', () => {
      this.navigate(false);
    });
    globalThis.addEventListener('popstate', () => {
      this.navigate();
    });
  }

  private navigate(isHistorySet: boolean = true): void {
    const targetPage = Router.parseUrl();
    console.log(targetPage);
    if (isValidPage(targetPage)) this.switchPageTo(targetPage, isHistorySet);
    else if (targetPage) {
      this.switchPageTo('not-found');
    } else {
      this.switchPageTo('index');
    }
  }
}
