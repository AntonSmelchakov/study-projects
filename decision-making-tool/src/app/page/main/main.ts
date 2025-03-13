import ElementBuilder from '../../utils/element-builder';
import Index from './index';

export default class Main {
  public builder: ElementBuilder;
  constructor() {
    this.builder = new ElementBuilder({ tag: 'main', classNames: ['main'] });
    this.configureElement();
  }

  public getNode(): HTMLElement {
    return this.builder.getElement();
  }

  public configureElement(): void {
    const index = new Index();
    this.getNode().append(index.builder.getElement());
  }
}
