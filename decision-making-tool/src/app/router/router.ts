import type Main from '../page/main/main';

const PAGES = {
  index: 'index',
  picker: 'picker',
  notFound: 'notFound',
} as const;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const pageEntries = Object.values(PAGES);

type Pages = (typeof pageEntries)[number];

function isValidPage(pageName: string): pageName is Pages {
  return !!pageName;
}

export default class Router {
  /*   protected index: Index | undefined;
  protected picker: Picker | undefined; */
  protected main: Main | undefined;

  constructor() {
    /*     this.index = undefined;
    this.picker = undefined; */
    this.main = undefined;
  }

  private static parseUrl(pathName: string, hash: string): string {
    let pointIndex = pathName.lastIndexOf('.');
    if (pointIndex < 0) pointIndex = 0;
    const symbolIndex = hash ? '#' : '/';
    return pathName.slice(pathName.lastIndexOf(symbolIndex) + 1, pointIndex);
  }

  private static setHistory(url: string): void {
    globalThis.history.pushState(undefined, '', url);
  }

  public configureRouter(main: Main): void {
    this.main = main;
    this.configureHistoryHandler();
  }

  public switchPageTo(page: Pages): void {
    console.log('switch');
    if (!this.main) return;
    if (this.main[page]) this.main.getElement().replaceChildren(this.main[page].getElement());
  }

  private configureHistoryHandler(): void {
    console.log('POOP');
    const pathName = globalThis.location.pathname;
    const hash = globalThis.location.hash;
    const targetPage = Router.parseUrl(pathName, hash);
    Router.setHistory(targetPage);
    globalThis.addEventListener('popstate', () => {
      console.log('hey');
      console.log(pathName, hash, targetPage);
      if (isValidPage(targetPage)) this.switchPageTo(targetPage);
      else this.switchPageTo('notFound');
      Router.setHistory(targetPage);
    });
  }
}
