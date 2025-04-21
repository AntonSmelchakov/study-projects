import type Router from '../../../router/router';
import { PagesEnum } from '../../../router/router';
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
  constructor(router: Router) {
    super(ELEM_PARAMS.notFound);
    this.router = router;
    this.backBtn = new ElementBuilder(ELEM_PARAMS.backBtn);
    this.configureNotFound();
  }

  public configureNotFound(): void {
    this.append([this.backBtn]);
    this.backBtn.addEventListener('click', () => {
      this.router.switchPageTo(PagesEnum.authPage);
    });
  }
}
