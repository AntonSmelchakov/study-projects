import type Router from '../../../router/router';
import type StateHandler from '../../../state-handler/state-handler';
import ComplexElement from '../../../utils/complex-element';
import ElementBuilder from '../../../utils/element-builder';

const ELEM_PARAMS = {
  picker: { tag: 'section', classNames: ['picker'] },
  appTitle: { tag: 'h1', classNames: ['title'], textContent: 'Decision making tool 0.5' },
  controlPanel: { tag: 'div', classNames: ['controlPanel'] },
  backBtn: { tag: 'button', classNames: ['backBtn'] },
};

export default class Picker extends ComplexElement {
  protected appTitle: ElementBuilder;
  protected controlPanel: ElementBuilder;
  protected backBtn: ElementBuilder;
  private stateHandler: StateHandler;
  private router: Router;

  constructor(stateHandler: StateHandler, router: Router) {
    super(ELEM_PARAMS.picker);
    this.appTitle = new ElementBuilder(ELEM_PARAMS.appTitle);
    this.controlPanel = new ElementBuilder(ELEM_PARAMS.controlPanel);
    this.backBtn = new ElementBuilder(ELEM_PARAMS.backBtn);
    this.stateHandler = stateHandler;
    this.router = router;
    console.log(this.stateHandler, this.router);
    this.configurePicker();
  }

  protected configurePicker(): void {
    this.configureBackBtn();
  }

  protected configureBackBtn(): void {
    this.backBtn.addEventListener('click', () => {});
  }
}
