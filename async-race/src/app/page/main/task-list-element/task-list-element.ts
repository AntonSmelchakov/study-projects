import ElementBuilder from '../../../utils/element-builder';
import ComplexElement from '../../../utils/complex-element';
import type StateHandler from '../../../state-handler/state-handler';
import type { DataItem } from '../../../state-handler/state-handler';
import './style.css';
import type { ElementList } from '../../../types/types';

const ELEM_PARAMS: ElementList = {
  thisElement: {
    tag: 'ul',
    properties: {
      className: 'taskListElement',
    },
  },
  id: {
    tag: 'label',
    properties: {
      className: 'listItemId',
    },
  },
  title: {
    tag: 'input',
    properties: {
      className: 'listItemTitle',
      placeholder: 'title',
    },
  },
  weight: {
    tag: 'input',
    properties: {
      className: 'listItemWidth',
      placeholder: 'weight',
      type: 'number',
    },
  },
  deleteBtn: {
    tag: 'button',
    properties: {
      className: 'listItemDeleteBtn',
      textContent: 'delete',
    },
  },
};

export default class TaskListElement extends ComplexElement<HTMLElement> {
  public id;
  public title;
  public weight;
  public deleteBtn;
  public stateHandler: StateHandler;

  constructor(id: number, data: DataItem, stateHandler: StateHandler) {
    super(ELEM_PARAMS.thisElement);
    this.id = new ElementBuilder<HTMLLabelElement>(ELEM_PARAMS.id);
    this.title = new ElementBuilder<HTMLInputElement>(ELEM_PARAMS.title);
    this.weight = new ElementBuilder<HTMLInputElement>(ELEM_PARAMS.weight);
    this.deleteBtn = new ElementBuilder(ELEM_PARAMS.deleteBtn);
    this.stateHandler = stateHandler;
    this.configureElement(id, data);
  }

  private static getInputValue(InputElement: ElementBuilder<HTMLInputElement>): string {
    const value: string = InputElement.getElement().value;
    return value;
  }

  public configureElement(id: number, data: DataItem): void {
    this.element
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
    console.log(ElementBuilder.isHTMLType<HTMLLabelElement>(this.title.getElement()));
    console.log(ElementBuilder.isHTMLType<HTMLInputElement>(this.id.getElement()));
  }

  public setId(id: number): void {
    this.id.getElement().textContent = `#${id}`;
    this.id.getElement().htmlFor = `option-${id}`;
    this.title.getElement().id = `option-${id}`;
  }

  public setTitle(title: string): void {
    this.title.getElement().value = title;
  }

  public setWeight(weight: string): void {
    this.weight.getElement().value = weight;
  }

  public configureDeleteBtn(id: number): void {
    this.deleteBtn.getElement().addEventListener('click', () => {
      this.element.getElement().remove();
      this.stateHandler.removeOption(id);
    });
  }

  public configureInputFields(id: number): void {
    this.title.getElement().addEventListener('input', () => {
      const value = TaskListElement.getInputValue(this.title);
      this.stateHandler.setOptionTitle(id, value);
    });
    this.weight.getElement().addEventListener('input', () => {
      const value = TaskListElement.getInputValue(this.weight);
      this.stateHandler.setOptionWeight(id, value);
    });
  }
}
