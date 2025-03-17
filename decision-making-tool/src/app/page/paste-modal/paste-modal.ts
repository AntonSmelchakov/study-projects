import ComplexElement from '../../utils/complex-element';
import type { Parameters } from '../../utils/element-builder';
import ElementBuilder from '../../utils/element-builder';
import type { InputParameters } from '../../utils/other-builder';
import { InputBuilder } from '../../utils/other-builder';
import type Index from '../main/index';

type ParameterItem = {
  [key: string]: Parameters | InputParameters;
};

type ValidPasteData = [string, number][];

const ELEM_PARAMS: ParameterItem = {
  dialog: {
    tag: 'dialog',
    classNames: ['dialog'],
  },
  container: {
    tag: 'form',
    classNames: ['container'],
  },
  inputField: {
    tag: 'textarea',
    classNames: ['inputField'],
    placeholder:
      'Past a list of the new options in a CSV-like format, as shown below. Title allows whitespaces,quotes and commas that is separated from weight by comma.\n\nTitle_1_with_commas_quotes_or_whitespaces , weight_as_number\nTitle_2_with_commas_quotes_or_whitespaces , weight_as_number',
  },
  cancelBtn: {
    tag: 'button',
    classNames: ['button'],
    textContent: 'cancel',
  },
  confirmBtn: {
    tag: 'button',
    classNames: ['button'],
    textContent: 'confirm',
  },
};

export default class PasteModal extends ComplexElement {
  public pasteData: ValidPasteData;
  protected container: ElementBuilder;
  protected pasteField: InputBuilder;
  protected cancelBtn: ElementBuilder;
  protected confirmBtn: ElementBuilder;
  protected index: Index;

  constructor(index: Index) {
    super(ELEM_PARAMS.dialog);
    this.container = new ElementBuilder(ELEM_PARAMS.container);
    this.pasteField = new InputBuilder(ELEM_PARAMS.inputField);
    this.cancelBtn = new ElementBuilder(ELEM_PARAMS.cancelBtn);
    this.confirmBtn = new ElementBuilder(ELEM_PARAMS.confirmBtn);
    this.index = index;
    this.pasteData = [];
    this.configureElement();
  }

  private static isValidPasteData(incomingData: unknown): incomingData is ValidPasteData {
    return !!incomingData;
  }

  public configureElement(): void {
    this.append([this.container]);
    this.container.append([this.pasteField, this.cancelBtn, this.confirmBtn]);
    this.configureCloseFunctionality();
    this.configureConfirmBtn();
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
    const item = this.getElement();
    this.getElement().remove();
    if (item instanceof HTMLDialogElement) item.close();
  }

  protected configureConfirmBtn(): void {
    this.confirmBtn.getElement().addEventListener('click', (event) => {
      console.log('hey');
      event.preventDefault();
      const item = this.pasteField.getElement();
      const pasteData: ValidPasteData = [];
      if (item instanceof HTMLTextAreaElement) {
        const values = item.value.split('\n');
        for (const item of values) {
          const separateComma = item.lastIndexOf(',');
          const newTitle = item.slice(0, separateComma).trim();
          const newWeight = +item.slice(separateComma + 1).trim();
          pasteData.push([newTitle, newWeight]);
        }
      }
      if (PasteModal.isValidPasteData(pasteData)) {
        this.pasteData = pasteData;
        for (const item of pasteData) {
          this.index.addOption(this.index.taskNum, { title: item[0], weight: `${item[1]}` });
        }
      }
      this.close();
    });
  }
}
