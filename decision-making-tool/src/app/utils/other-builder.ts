import type { BaseElementParameters, Parameters } from './element-builder';
import ElementBuilder from './element-builder';

export interface InputParameters extends BaseElementParameters {
  placeholder?: string;
  value?: string;
  type?: string;
}

export class InputBuilder extends ElementBuilder {
  declare protected element: HTMLInputElement;
  constructor(parameters: InputParameters) {
    super(parameters);
    this.configureElement(parameters);
  }

  public configureElement(parameters: InputParameters): void {
    super.configureElement(parameters);
    if (parameters.placeholder) this.setPlaceholder(parameters.placeholder);
    if (parameters.value) this.setValue(parameters.value);
    if (parameters.type) this.setType(parameters.type);
  }

  public setPlaceholder(placeholder: string): void {
    this.element.placeholder = placeholder;
  }

  public setValue(value: string): void {
    this.element.value = value;
  }

  public setType(value: string): void {
    this.element.type = value;
  }
}

export interface LabelParameters extends Parameters {
  for?: string;
}

export class LabelBuilder extends ElementBuilder {
  declare protected element: HTMLLabelElement;
  constructor(parameters: LabelParameters) {
    super(parameters);
    this.configureElement(parameters);
  }

  public configureElement(parameters: LabelParameters): void {
    super.configureElement(parameters);
    if (parameters.for) this.setFor(parameters.for);
  }

  public setFor(value: string): void {
    this.element.htmlFor = value;
  }
}

export interface AnchorParameters extends Parameters {
  download?: string;
  target?: string;
  href?: string;
}

export class AnchorBuilder extends ElementBuilder {
  declare protected element: HTMLAnchorElement;
  constructor(parameters: AnchorParameters) {
    super(parameters);
    this.configureElement(parameters);
  }

  public configureElement(parameters: AnchorParameters): void {
    super.configureElement(parameters);
    if (parameters.download) this.setDownload(parameters.download);
    if (parameters.target) this.setTarget(parameters.target);
    if (parameters.href) this.setHref(parameters.href);
  }

  public setDownload(value: string): void {
    this.element.download = value;
  }

  public setTarget(value: string): void {
    this.element.target = value;
  }

  public setHref(value: string): void {
    this.element.href = value;
  }
}
