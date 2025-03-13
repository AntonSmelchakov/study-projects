import type { InputParameters, LabelParameters } from '../../../utils/other-builder';
import { InputBuilder, LabelBuilder } from '../../../utils/other-builder';
import type { Parameters } from '../../../utils/element-builder';
import ElementBuilder from '../../../utils/element-builder';

type ParameterItem = {
  [key: string]: Parameters | InputParameters | LabelParameters;
};

const ELEM_PARAMS: ParameterItem = {
  id: {
    tag: 'label',
    classNames: ['listItemId'],
  },
  title: {
    tag: 'input',
    classNames: ['listItemTitle'],
  },
  weight: {
    tag: 'input',
    classNames: ['listItemWight'],
  },
  deleteBtn: {
    tag: 'button',
    classNames: ['listItemDeleteBtn'],
  },
};

export default class TaskListElement {
  public id: LabelBuilder;
  public title: InputBuilder;
  public weight: InputBuilder;
  public deleteBtn: ElementBuilder;
  public builder: ElementBuilder;

  constructor() {
    this.builder = new ElementBuilder({ tag: 'ul', classNames: ['taskListElement'] });
    this.id = new LabelBuilder(ELEM_PARAMS.id);
    this.title = new InputBuilder(ELEM_PARAMS.title);
    this.weight = new InputBuilder(ELEM_PARAMS.weight);
    this.deleteBtn = new ElementBuilder(ELEM_PARAMS.deleteBtn);
    this.configureElement();
  }

  public configureElement() {
    this.builder
      .getElement()
      .append(
        this.id.getElement(),
        this.title.getElement(),
        this.weight.getElement(),
        this.deleteBtn.getElement(),
      );
    this.configureDeleteBtn();
  }

  public setId(id: number): void {
    this.id.setTextContent(`#${id}`);
    this.id.setFor(`option-${id}`);
    this.title.setId(`option-${id}`);
  }

  public setTitle(title: string): void {
    this.title.setValue(title);
  }

  public setWeight(weight: number): void {
    this.weight.setValue(`${weight}`);
  }

  public configureDeleteBtn(): void {
    this.deleteBtn.addEventListener('click', (): void => this.builder.getElement().remove());
  }

  public getNode(): HTMLElement {
    return this.builder.getElement();
  }
}
