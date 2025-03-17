import type StateHandler from '../../state-handler/state-handler';
import ComplexElement from '../../utils/complex-element';
import Index from './index';

export default class Main extends ComplexElement {
  private stateHandler: StateHandler;
  constructor(stateHandler: StateHandler) {
    super({ tag: 'main', classNames: ['main'] });
    this.stateHandler = stateHandler;
    this.configureElement();
  }

  public configureElement(): void {
    const index = new Index(this.stateHandler);
    this.getElement().append(index.getElement());
  }
}
