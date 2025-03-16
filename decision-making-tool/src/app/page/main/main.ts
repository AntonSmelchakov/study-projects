import ComplexElement from '../../utils/complex-element';
import Index from './index';

export default class Main extends ComplexElement {
  constructor() {
    super({ tag: 'main', classNames: ['main'] });
    this.configureElement();
  }

  public configureElement(): void {
    const index = new Index();
    this.getElement().append(index.getElement());
  }
}
