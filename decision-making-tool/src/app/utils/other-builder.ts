import type { BaseElementParameters, Parameters } from './element-builder';
import ElementBuilder from './element-builder';

export interface InputParameters extends BaseElementParameters {
  placeholder?: string;
  value?: string;
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
  }

  public setPlaceholder(placeholder: string): void {
    this.element.placeholder = placeholder;
  }

  public setValue(value: string): void {
    this.element.value = value;
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
