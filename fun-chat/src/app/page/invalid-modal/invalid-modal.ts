import type { ElementList } from '../../types/types';
import ComplexElement from '../../utils/complex-element';
import ElementBuilder from '../../utils/element-builder';
import cssClasses from './style.module.css';

const ELEM_PARAMS: ElementList = {
  dialog: {
    tag: 'dialog',
    properties: {
      className: `${cssClasses.dialog}`,
    },
  },
  container: {
    tag: 'div',
    properties: {
      className: `${cssClasses.container}`,
    },
  },
  text: {
    tag: 'p',
    properties: {
      className: `text`,
      textContent:
        'At least two(2) options has to be valid, i.e have positive number as weight and a title',
    },
  },
  cancelBtn: {
    tag: 'button',
    properties: {
      className: `button`,
      textContent: 'cancel',
    },
  },
};

export default class InvalidModal extends ComplexElement<HTMLDialogElement> {
  protected container;
  protected cancelBtn;
  protected text;

  constructor() {
    super(ELEM_PARAMS.dialog);
    this.container = new ElementBuilder(ELEM_PARAMS.container);
    this.cancelBtn = new ElementBuilder(ELEM_PARAMS.cancelBtn);
    this.text = new ElementBuilder(ELEM_PARAMS.text);
    this.configureElement();
  }

  public configureElement(): void {
    this.element.append([this.container]);
    this.container.append([this.text, this.cancelBtn]);
    this.configureCloseFunctionality();
  }

  protected configureCloseFunctionality(): void {
    this.cancelBtn.getElement().addEventListener('click', (event) => {
      event.preventDefault();
      this.close();
    });
    this.element.getElement().addEventListener('click', (event) => {
      if (event.target === event.currentTarget) this.close();
    });
  }

  protected close(): void {
    const item = this.element.getElement();
    item.remove();
    item.close();
  }
}
