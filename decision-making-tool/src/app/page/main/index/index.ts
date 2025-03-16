import ComplexElement from '../../../utils/complex-element';
import ElementBuilder from '../../../utils/element-builder';
import type { Parameters } from '../../../utils/element-builder';
import PasteModal from '../../paste-modal/paste-modal';
import TaskListElement from '../task-list-element/task-list-element';

type ParameterItem = {
  [key: string]: Parameters;
};

const ELEM_PARAMS: ParameterItem = {
  taskList: { tag: 'ul', classNames: ['taskList'] },
  addOptionBtn: {
    tag: 'button',
    classNames: ['button'],
    textContent: 'Add option',
  },
  pasteBtn: {
    tag: 'button',
    classNames: ['button'],
    textContent: 'Paste option list',
  },
  clearBtn: { tag: 'button', classNames: ['button'], textContent: 'Clear options' },
  saveBtn: { tag: 'button', classNames: ['button'] },
  loadBtn: { tag: 'button', classNames: ['button'] },
  startBtn: { tag: 'button', classNames: ['button'] },
};

export default class Index extends ComplexElement {
  public taskList: ElementBuilder;
  public addOptionBtn: ElementBuilder;
  public pasteBtn: ElementBuilder;
  public clearBtn: ElementBuilder;
  public saveBtn: ElementBuilder;
  public loadBtn: ElementBuilder;
  public startBtn: ElementBuilder;
  public taskNum: number;
  public pasteModal: PasteModal;

  constructor() {
    super({ tag: 'section', classNames: ['index'] });
    this.taskList = new ElementBuilder(ELEM_PARAMS.taskList);
    this.addOptionBtn = new ElementBuilder(ELEM_PARAMS.addOptionBtn);
    this.pasteBtn = new ElementBuilder(ELEM_PARAMS.pasteBtn);
    this.clearBtn = new ElementBuilder(ELEM_PARAMS.clearBtn);
    this.saveBtn = new ElementBuilder(ELEM_PARAMS.saveBtn);
    this.loadBtn = new ElementBuilder(ELEM_PARAMS.loadBtn);
    this.startBtn = new ElementBuilder(ELEM_PARAMS.startBtn);
    this.taskNum = 1;
    this.pasteModal = new PasteModal();
    this.configureIndex();
  }

  public configureTaskList(): void {
    this.addOption();
  }

  public configureIndex(): void {
    this.configureTaskList();
    this.append([
      this.taskList,
      this.addOptionBtn,
      this.pasteBtn,
      this.pasteModal,
      this.clearBtn,
      this.saveBtn,
      this.loadBtn,
      this.startBtn,
    ]);
    this.configureAddOptionBtn();
    this.configurePasteBtn();
  }

  public addOption(): void {
    this.taskList.append([new TaskListElement(this.taskNum)]);
    this.taskNum += 1;
  }

  protected configureAddOptionBtn(): void {
    this.addOptionBtn.addEventListener('click', () => this.addOption());
  }

  protected configurePasteBtn(): void {
    this.pasteBtn.addEventListener('click', () => {
      const item = this.pasteModal.getElement();
      if (item instanceof HTMLDialogElement) {
        item.showModal();
      }
    });
  }
}
