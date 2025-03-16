import type { Parameters, HTMLTypes } from './element-builder';
import ElementBuilder from './element-builder';

export default class ComplexElement {
  protected builder: ElementBuilder;
  constructor(parameters: Parameters) {
    this.builder = new ElementBuilder(parameters);
  }

  public getElement(): HTMLTypes {
    return this.builder.getElement();
  }

  public append(childElements: (ElementBuilder | ComplexElement)[]): void {
    this.builder.append(childElements);
  }
}
