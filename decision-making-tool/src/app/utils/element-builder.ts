interface EventListener {
  eventName: string;
  callbackArr: ((event: MouseEvent) => void)[];
}

export interface BaseElementParameters {
  tag: string;
  id?: string;
  classNames?: string[];
  eventListeners?: EventListener[];
}

export interface Parameters extends BaseElementParameters {
  textContent?: string;
}

export default class ElementBuilder {
  protected element: HTMLElement | HTMLButtonElement;

  constructor(parameters: Parameters) {
    this.element = document.createElement(parameters.tag);
    this.configureElement(parameters);
  }

  public configureElement(parameters: Parameters): void {
    if (parameters.id) this.setId(parameters.id);
    if (parameters.classNames) this.setCssClasses(parameters.classNames);
    if (parameters.textContent) this.setTextContent(parameters.textContent);
    if (parameters.eventListeners) this.setEventListeners(parameters.eventListeners);
  }

  public getElement(): HTMLElement | HTMLButtonElement {
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
}
