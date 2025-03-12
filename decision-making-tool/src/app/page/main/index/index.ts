import type ElementBuilder from '../../../utils/element-builder';
import type { Parameters } from '../../../utils/element-builder';

type ParameterItem = {
  [key: string]: Parameters;
};

const PARAMS: ParameterItem = {
  taskList: { tag: 'div', classNames: [''] },
};

export default class Index {
  public taskList: ElementBuilder;
  public addOptionBtn: ElementBuilder;
  public pasteBtn: ElementBuilder;
  public clearBtn: ElementBuilder;
  public saveBtn: ElementBuilder;
  public loadBtn: ElementBuilder;
  public startBtn: ElementBuilder;

  constructor() {
    this.taskList = this.buildTaskList(PARAMS.taskList);
    this.addOptionBtn;
    this.pasteBtn;
    this.clearBtn;
    this.saveBtn;
    this.loadBtn;
    this.startBtn;
  }

  public buildTaskList(parameters: Parameters) {}
}
