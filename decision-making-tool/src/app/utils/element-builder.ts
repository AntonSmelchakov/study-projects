interface EventListener {
  eventName: string;
  callbackArr: (() => void)[];
}

export interface Parameters {
  tag: string;
  classNames?: string[];
  textContent?: string;
  eventListeners?: EventListener[];
}

export default class ElementBuilder {
  private element;

  constructor(parameters: Parameters) {
    this.element = document.createElement(parameters.tag);
    this.configureElement(parameters);
  }

  public configureElement(parameters: Parameters): this {
    this.setCssClasses(parameters.classNames);
    this.setTextContent(parameters.textContent);
    this.setEventListeners(parameters.eventListeners);
    return this;
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public setCssClasses(cssClasses: string[] | undefined): void {
    if (cssClasses) {
      for (const cssClass of cssClasses) this.element.classList.add(cssClass);
    }
  }

  public setTextContent(text: string | undefined): void {
    if (text) this.element.textContent = text;
  }

  public setEventListeners(eventListeners: EventListener[] | undefined): void {
    if (eventListeners) {
      for (const listener of eventListeners) {
        for (const callback of listener.callbackArr)
          this.element.addEventListener(listener.eventName, () => callback);
      }
    }
  }
}
