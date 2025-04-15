import type { AppendableElement, ElementParameters } from '../types/types';
import ElementBuilder from './element-builder';

export default class ComplexElement<HTMLElementType extends HTMLElement> {
  protected element;
  constructor(parameters: ElementParameters) {
    this.element = new ElementBuilder<HTMLElementType>(parameters);
  }

  public getElement(): HTMLElementType {
    return this.element.getElement();
  }

  public append(childElements: AppendableElement[]): void {
    for (const item of childElements) this.getElement().append(item.getElement());
  }
}
