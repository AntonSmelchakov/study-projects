import type Router from '../../../router/router';
import { PagesEnum } from '../../../router/router';
import type StateHandler from '../../../state-handler/state-handler';
import ComplexElement from '../../../utils/complex-element';
import ElementBuilder from '../../../utils/element-builder';

const ELEM_PARAMS = {
  notFound: {
    tag: 'div',
    properties: {
      textContent: 'Wrong page buddy',
    },
  },
  backBtn: {
    tag: 'button',
    properties: {
      textContent: 'Go back',
    },
  },
};

export default class NotFound extends ComplexElement<HTMLElement> {
  protected backBtn;
  protected router: Router;
  protected stateHandler: StateHandler;

  constructor(router: Router, stateHandler: StateHandler) {
    super(ELEM_PARAMS.notFound);
    this.router = router;
    this.stateHandler = stateHandler;
    this.backBtn = new ElementBuilder(ELEM_PARAMS.backBtn);
    this.configureNotFound();
  }

  public configureNotFound(): void {
    this.append([this.backBtn]);
    this.backBtn.addEventListener('click', () => {
      const target = this.stateHandler.isLoggedIn ? PagesEnum.chat : PagesEnum.authPage;
      this.router.switchPageTo(target);
    });
  }
}
