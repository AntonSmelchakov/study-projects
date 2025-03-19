import type Router from '../../router/router';
import type StateHandler from '../../state-handler/state-handler';
import ComplexElement from '../../utils/complex-element';
import Index from './index';
import Picker from './picker/picker';

export default class Main extends ComplexElement {
  public index: Index;
  public picker: Picker;
  public notFound: ComplexElement;

  constructor(stateHandler: StateHandler, router: Router) {
    super({ tag: 'main', classNames: ['main'] });
    this.index = new Index(stateHandler, router);
    this.picker = new Picker(stateHandler, router);
    this.notFound = new ComplexElement({ tag: 'div', textContent: 'Wrong page buddy' });
    this.configureElement();
  }

  public configureElement(): void {
    this.getElement().append(this.index.getElement());
  }
}
