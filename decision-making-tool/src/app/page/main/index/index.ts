import type StateHandler from '../../../state-handler/state-handler';
import type { DataItem } from '../../../state-handler/state-handler';
import ComplexElement from '../../../utils/complex-element';
import ElementBuilder from '../../../utils/element-builder';
import type { Parameters } from '../../../utils/element-builder';
import type { AnchorParameters } from '../../../utils/other-builder';
import { AnchorBuilder, InputBuilder, type InputParameters } from '../../../utils/other-builder';
import InvalidModal from '../../invalid-modal/invalid-modal';
import PasteModal from '../../paste-modal/paste-modal';
import TaskListElement from '../task-list-element/task-list-element';
import './style.css';

type ParameterItem = {
  [key: string]: Parameters | InputParameters | AnchorParameters;
};

const ELEM_PARAMS: ParameterItem = {
  appTitle: { tag: 'h1', classNames: ['title'], textContent: 'Decision making tool 0.5' },
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
  saveBtn: { tag: 'button', classNames: ['button'], textContent: 'Save options to file' },
  loadBtn: { tag: 'button', classNames: ['button'], textContent: 'Load options from file' },
  startBtn: { tag: 'button', classNames: ['button'], textContent: 'Start' },
  fileInput: { tag: 'input', classNames: ['fileInput'], type: 'file' },
  uploadAnchor: {
    tag: 'a',
    classNames: ['uploadAnchor'],
    download: 'option-list',
    target: '_blank',
  },
};

export default class Index extends ComplexElement {
  public appTitle: ElementBuilder;
  public taskList: ElementBuilder;
  public addOptionBtn: ElementBuilder;
  public pasteBtn: ElementBuilder;
  public clearBtn: ElementBuilder;
  public saveBtn: ElementBuilder;
  public loadBtn: ElementBuilder;
  public startBtn: ElementBuilder;
  public taskNum: number;
  public pasteModal: PasteModal;
  public invalidModal: InvalidModal;
  public stateHandler: StateHandler;
  public fileInput: InputBuilder;

  constructor(stateHandler: StateHandler) {
    super({ tag: 'section', classNames: ['index'] });
    this.appTitle = new ElementBuilder(ELEM_PARAMS.appTitle);
    this.taskList = new ElementBuilder(ELEM_PARAMS.taskList);
    this.addOptionBtn = new ElementBuilder(ELEM_PARAMS.addOptionBtn);
    this.pasteBtn = new ElementBuilder(ELEM_PARAMS.pasteBtn);
    this.clearBtn = new ElementBuilder(ELEM_PARAMS.clearBtn);
    this.saveBtn = new ElementBuilder(ELEM_PARAMS.saveBtn);
    this.loadBtn = new ElementBuilder(ELEM_PARAMS.loadBtn);
    this.startBtn = new ElementBuilder(ELEM_PARAMS.startBtn);
    this.fileInput = new InputBuilder(ELEM_PARAMS.fileInput);
    this.taskNum = 2;
    this.pasteModal = new PasteModal(this);
    this.invalidModal = new InvalidModal();
    this.stateHandler = stateHandler;
    this.configureIndex();
  }

  public configureIndex(): void {
    this.append([
      this.appTitle,
      this.taskList,
      this.addOptionBtn,
      this.pasteBtn,
      this.clearBtn,
      this.saveBtn,
      this.loadBtn,
      this.startBtn,
    ]);
    this.configureTaskList();
    this.configureAddOptionBtn();
    this.configurePasteBtn();
    this.configureClearBtn();
    this.configureSaveBtn();
    this.configureLoadBtn();
    this.configureStartBtn();
  }

  public configureTaskList(): void {
    this.taskList.getElement().replaceChildren();
    const state = this.stateHandler.getState('object');
    if (typeof state === 'object') {
      const array = Object.entries(state);
      for (const item of array) {
        this.addOption(+item[0], item[1]);
        this.taskNum = +item[0] + 1;
      }
    }
  }

  public addOption(id: number = this.taskNum, data: DataItem = {}): void {
    this.taskList.append([new TaskListElement(id, data, this.stateHandler)]);
    this.stateHandler.setOption(id);
    this.taskNum += 1;
  }

  protected configureAddOptionBtn(): void {
    this.addOptionBtn.addEventListener('click', () => this.addOption());
  }

  protected configurePasteBtn(): void {
    this.pasteBtn.addEventListener('click', () => {
      const item = this.pasteModal.getElement();
      this.append([this.pasteModal]);
      if (item instanceof HTMLDialogElement) {
        item.showModal();
      }
    });
  }

  protected configureClearBtn(): void {
    this.clearBtn.addEventListener('click', () => {
      this.taskList.getElement().replaceChildren();
      this.taskNum = 1;
    });
  }

  protected configureSaveBtn(): void {
    const uploadAnchor = new AnchorBuilder(ELEM_PARAMS.uploadAnchor);
    this.saveBtn.addEventListener('click', () => {
      const stateData = this.stateHandler.getState('string');
      if (typeof stateData !== 'string') return;
      const fileMimeType = 'application/json';
      const fileName = uploadAnchor.getElement().download;
      const fileType = 'json';
      const data: File = new File([stateData], fileName + '.' + fileType, { type: fileMimeType });
      const url: string = URL.createObjectURL(data);
      uploadAnchor.setHref(url);
      uploadAnchor.getElement().click();
      URL.revokeObjectURL(url);
    });
  }

  protected configureLoadBtn(): void {
    this.loadBtn.addEventListener('click', () => {
      this.fileInput.getElement().click();
    });
    this.fileInput.addEventListener('change', () => {
      void (async (): Promise<void> => {
        const data: FileList | null = this.fileInput.getElement().files;
        if (!(data && data.length > 0)) return;
        const myFile = data[0];
        let myData: string;
        try {
          myData = await myFile.text();
        } catch {
          throw new Error('File load error');
        }
        const newDataJSON: unknown = JSON.parse(myData);
        this.stateHandler.setState(newDataJSON);
        this.configureTaskList();
      })();
    });
  }

  protected configureStartBtn(): void {
    this.startBtn.addEventListener('click', () => {
      const isOptionsValid = this.optionsValidation();
      if (!isOptionsValid) {
        const item = this.invalidModal.getElement();
        this.append([this.invalidModal]);
        if (item instanceof HTMLDialogElement) {
          item.showModal();
        }
      }
    });
  }

  protected optionsValidation(): boolean {
    const data = this.stateHandler.getState('object');
    console.log(data);
    let check: number = 0;
    if (typeof data === 'object') {
      const array = Object.entries(data);
      for (const item of array) {
        if (item[1].title && item[1].weight) check += 1;
      }
    }
    return check >= 2 ? true : false;
  }
}
