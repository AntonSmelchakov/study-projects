import ElementBuilder from '../../utils/element-builder';

export default class Main {
  public builder: ElementBuilder;
  constructor() {
    this.builder = new ElementBuilder({ tag: 'main', classNames: ['main'] });
  }

  public getNode(): HTMLElement {
    return this.builder.getElement();
  }
}
