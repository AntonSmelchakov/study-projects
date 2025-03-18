import type { Parameters } from './element-builder';
import ElementBuilder from './element-builder';

export default class ComplexElement {
  protected builder: ElementBuilder;
  constructor(parameters: Parameters) {
    this.builder = new ElementBuilder(parameters);
  }

  public getElement<Type extends HTMLElement>(): Type {
    return this.builder.getElement<Type>();
  }

  public append(childElements: (ElementBuilder | ComplexElement)[]): void {
    this.builder.append(childElements);
  }
}
