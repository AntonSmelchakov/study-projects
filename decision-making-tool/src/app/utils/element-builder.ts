import type ComplexElement from './complex-element';

export type HTMLTypes = HTMLElement | HTMLButtonElement | HTMLDialogElement;

export interface BaseElementParameters {
  tag: string;
  id?: string;
  classNames?: string[];
}

export interface Parameters extends BaseElementParameters {
  textContent?: string;
}

function createElement<HTMLType>(tag: string): HTMLType {
  return document.createElement(tag);
}

export default class ElementBuilder {
  protected element;

  constructor(parameters: Parameters) {
    this.element = document.createElement(parameters.tag);
    this.configureElement(parameters);
  }

  public configureElement(parameters: Parameters): void {
    if (parameters.id) this.setId(parameters.id);
    if (parameters.classNames) this.setCssClasses(parameters.classNames);
    if (parameters.textContent) this.setTextContent(parameters.textContent);
  }

  public getElement(): HTMLTypes {
    return this.element;
  }

  public setId(id: string): void {
    this.element.id = id;
  }

  public setCssClasses(cssClasses: string[]): void {
    for (const cssClass of cssClasses) this.element.classList.add(cssClass);
  }

  public setTextContent(text: string): void {
    this.element.textContent = text;
  }

  public addEventListener(event: string, callback: () => void): void {
    this.element.addEventListener(event, callback);
  }

  public append(childElements: (ElementBuilder | ComplexElement)[]): void {
    for (const item of childElements) this.element.append(item.getElement());
  }
}
