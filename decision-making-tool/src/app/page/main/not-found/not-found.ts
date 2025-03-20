import type Router from '../../../router/router';
import ComplexElement from '../../../utils/complex-element';
import ElementBuilder from '../../../utils/element-builder';

const ELEM_PARAMS = {
  notFound: { tag: 'div', textContent: 'Wrong page buddy' },
  backBtn: { tag: 'button', textContent: 'Go back' },
};

export default class NotFound extends ComplexElement {
  protected backBtn: ElementBuilder;
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
      this.router.switchPageTo('index');
    });
  }
}
