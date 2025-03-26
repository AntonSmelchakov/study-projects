import ComplexElement from '../../utils/complex-element';
import type { Parameters } from '../../utils/element-builder';
import ElementBuilder from '../../utils/element-builder';
import type { InputParameters } from '../../utils/other-builder';
import cssClasses from './style.module.css';

type ParameterItem = {
  [key: string]: Parameters | InputParameters;
};

const ELEM_PARAMS: ParameterItem = {
  dialog: {
    tag: 'dialog',
    classNames: [cssClasses.dialog],
  },
  container: {
    tag: 'div',
    classNames: [cssClasses.container],
  },
  text: {
    tag: 'p',
    classNames: ['text'],
    textContent:
      'At least two(2) options has to be valid, i.e positive number as weight and a title',
  },
  cancelBtn: {
    tag: 'button',
    classNames: ['button'],
    textContent: 'cancel',
  },
};

export default class InvalidModal extends ComplexElement {
  protected container: ElementBuilder;
  protected cancelBtn: ElementBuilder;
  protected text: ElementBuilder;

  constructor() {
    super(ELEM_PARAMS.dialog);
    this.container = new ElementBuilder(ELEM_PARAMS.container);
    this.cancelBtn = new ElementBuilder(ELEM_PARAMS.cancelBtn);
    this.text = new ElementBuilder(ELEM_PARAMS.text);
    this.configureElement();
  }

  public configureElement(): void {
    this.append([this.container]);
    this.container.append([this.text, this.cancelBtn]);
    this.configureCloseFunctionality();
  }

  protected configureCloseFunctionality(): void {
    this.cancelBtn.getElement().addEventListener('click', (event) => {
      event.preventDefault();
      this.close();
    });
    this.getElement().addEventListener('click', (event) => {
      if (event.target === event.currentTarget) this.close();
    });
  }

  protected close(): void {
    const item = this.getElement<HTMLDialogElement>();
    this.getElement().remove();
    item.close();
  }
}
