import type { InputParameters, LabelParameters } from '../../../utils/other-builder';
import { InputBuilder, LabelBuilder } from '../../../utils/other-builder';
import type { Parameters } from '../../../utils/element-builder';
import ElementBuilder from '../../../utils/element-builder';
import ComplexElement from '../../../utils/complex-element';
import type StateHandler from '../../../state-handler/state-handler';
import type { DataItem } from '../../../state-handler/state-handler';

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
    placeholder: 'title',
  },
  weight: {
    tag: 'input',
    classNames: ['listItemWight'],
    placeholder: 'weight',
    type: 'number',
  },
  deleteBtn: {
    tag: 'button',
    classNames: ['listItemDeleteBtn'],
    textContent: 'delete',
  },
};

export default class TaskListElement extends ComplexElement {
  public id: LabelBuilder;
  public title: InputBuilder;
  public weight: InputBuilder;
  public deleteBtn: ElementBuilder;
  public stateHandler: StateHandler;

  constructor(id: number, data: DataItem, stateHandler: StateHandler) {
    super({ tag: 'ul', classNames: ['taskListElement'] });
    this.id = new LabelBuilder(ELEM_PARAMS.id);
    this.title = new InputBuilder(ELEM_PARAMS.title);
    this.weight = new InputBuilder(ELEM_PARAMS.weight);
    this.deleteBtn = new ElementBuilder(ELEM_PARAMS.deleteBtn);
    this.stateHandler = stateHandler;
    this.configureElement(id, data);
  }

  private static getInputValue(InputElement: InputBuilder): string {
    const value: string = InputElement.getElement().value;
    return value;
  }

  public configureElement(id: number, data: DataItem): void {
    this.builder
      .getElement()
      .append(
        this.id.getElement(),
        this.title.getElement(),
        this.weight.getElement(),
        this.deleteBtn.getElement(),
      );
    this.setId(id);
    if (data.title) this.setTitle(data.title);
    if (data.weight) this.setWeight(data.weight);
    this.configureDeleteBtn(id);
    this.configureInputFields(id);
  }

  public setId(id: number): void {
    this.id.setTextContent(`#${id}`);
    this.id.setFor(`option-${id}`);
    this.title.setId(`option-${id}`);
  }

  public setTitle(title: string): void {
    this.title.setValue(title);
  }

  public setWeight(weight: string): void {
    this.weight.setValue(weight);
  }

  public configureDeleteBtn(id: number): void {
    this.deleteBtn.addEventListener('click', () => {
      this.builder.getElement().remove();
      this.stateHandler.removeOption(id);
    });
  }

  public configureInputFields(id: number): void {
    this.title.getElement().addEventListener('input', () => {
      const value = TaskListElement.getInputValue(this.title);
      this.stateHandler.setOption(id, { title: value });
    });
    this.weight.getElement().addEventListener('input', () => {
      const value = TaskListElement.getInputValue(this.weight);
      this.stateHandler.setOption(id, { weight: value });
    });
  }

  /*  private parseElementState(): void {
    const id: string | null = this.id.getElement().textContent;
    const title: string | null = this.title.getElement().value;
    const weight: string | null = this.weight.getElement().value;
    const result: (number | string | undefined)[] = [];
    console.log(result, id, title, weight);
    result[0] = id ? +id.slice(1) : undefined;
    result[1] = title || undefined;
    result[2] = weight || undefined;
    console.log(result);
  } */
}
