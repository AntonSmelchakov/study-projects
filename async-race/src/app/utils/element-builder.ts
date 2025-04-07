import type { AppendableElement, ElementParameters, ElementProperties } from '../types/types';

export default class ElementBuilder<HTMLElementType extends HTMLElement> {
  protected element: HTMLElementType;

  constructor(parameters: ElementParameters) {
    const element = document.createElement(parameters.tag);
    if (ElementBuilder.isHTMLType<HTMLElementType>(element)) this.element = element;
    else throw new Error('Wrong type parameter on ElementBuilder instance declaration');
    if (parameters.properties) this.configureElement(parameters.properties);
  }

  public static isHTMLType<Type extends HTMLElement>(element: HTMLElement): element is Type {
    return !!element;
  }

  public propertyHandler(key: string, value: string): void {
    switch (key) {
      case 'className': {
        this.element.className = value;
        break;
      }
      case 'textContent': {
        this.element.textContent = value;
        break;
      }
      case 'value': {
        if (ElementBuilder.isHTMLType<HTMLInputElement>(this.element)) this.element.value = value;
        break;
      }
      default: {
        this.element.setAttribute(key, value);
      }
    }
  }

  public configureElement(properties: ElementProperties): void {
    const arrayParameters = Object.entries(properties);
    for (const item of arrayParameters) {
      if (item[0] in this.element) this.propertyHandler(item[0], item[1]);
    }
  }

  public getElement(): HTMLElementType {
    return this.element;
  }

  public addEventListener(event: string, callback: () => void): void {
    this.element.addEventListener(event, callback);
  }

  public append(childElements: AppendableElement[]): void {
    for (const item of childElements) this.element.append(item.getElement());
  }
}
