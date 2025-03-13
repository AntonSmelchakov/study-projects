import ElementBuilder from '../../../utils/element-builder';
import type { Parameters } from '../../../utils/element-builder';
import TaskListElement from '../task-list-element/task-list-element';

type ParameterItem = {
  [key: string]: Parameters;
};

const ELEM_PARAMS: ParameterItem = {
  taskList: { tag: 'ul', classNames: ['taskList'] },
  addOptionBtn: { tag: 'button', classNames: ['button'] },
  pasteBtn: { tag: 'button', classNames: ['button'] },
  clearBtn: { tag: 'button', classNames: ['button'] },
  saveBtn: { tag: 'button', classNames: ['button'] },
  loadBtn: { tag: 'button', classNames: ['button'] },
  startBtn: { tag: 'button', classNames: ['button'] },
};

export default class Index {
  public builder: ElementBuilder;
  public taskList: ElementBuilder;
  public addOptionBtn: ElementBuilder;
  public pasteBtn: ElementBuilder;
  public clearBtn: ElementBuilder;
  public saveBtn: ElementBuilder;
  public loadBtn: ElementBuilder;
  public startBtn: ElementBuilder;
  private taskNum: number;

  constructor() {
    this.builder = new ElementBuilder({ tag: 'section', classNames: ['index'] });
    this.taskList = new ElementBuilder(ELEM_PARAMS.taskList);
    this.addOptionBtn = new ElementBuilder(ELEM_PARAMS.addOptionBtn);
    this.pasteBtn = new ElementBuilder(ELEM_PARAMS.pasteBtn);
    this.clearBtn = new ElementBuilder(ELEM_PARAMS.clearBtn);
    this.saveBtn = new ElementBuilder(ELEM_PARAMS.saveBtn);
    this.loadBtn = new ElementBuilder(ELEM_PARAMS.loadBtn);
    this.startBtn = new ElementBuilder(ELEM_PARAMS.startBtn);
    this.configureIndex();
  }

  public configureTaskList(): void {
    const taskListItem = new TaskListElement();
    this.taskList.getElement().append(taskListItem.getNode());
  }

  public configureIndex(): void {
    this.configureTaskList();
    this.builder.getElement().append(this.taskList.getElement());
  }
}
