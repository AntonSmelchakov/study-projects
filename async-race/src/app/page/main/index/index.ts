import type Router from '../../../router/router';
import type StateHandler from '../../../state-handler/state-handler';
import type { DataItem } from '../../../state-handler/state-handler';
import type { ElementList } from '../../../types/types';
import ComplexElement from '../../../utils/complex-element';
import ElementBuilder from '../../../utils/element-builder';
import InvalidModal from '../../invalid-modal/invalid-modal';
import PasteModal from '../../paste-modal/paste-modal';
import TaskListElement from '../task-list-element/task-list-element';
import './style.css';

const ELEM_PARAMS: ElementList = {
  index: {
    tag: 'section',
    properties: {
      className: 'index',
    },
  },
  appTitle: {
    tag: 'h1',
    properties: {
      className: 'title',
      textContent: 'Decision making tool 0.5',
    },
  },
  taskList: {
    tag: 'ul',
    properties: {
      className: 'taskList',
    },
  },
  addOptionBtn: {
    tag: 'button',
    properties: {
      className: 'button',
      textContent: 'Add option',
    },
  },
  pasteBtn: {
    tag: 'button',
    properties: {
      className: 'button',
      textContent: 'Paste option list',
    },
  },
  clearBtn: {
    tag: 'button',
    properties: {
      className: 'button',
      textContent: 'Clear options',
    },
  },
  saveBtn: {
    tag: 'button',
    properties: {
      className: 'button',
      textContent: 'Save options to file',
    },
  },
  loadBtn: {
    tag: 'button',
    properties: {
      className: 'button',
      textContent: 'Load options from file',
    },
  },
  startBtn: {
    tag: 'button',
    properties: {
      className: 'button',
      textContent: 'Start',
    },
  },
  fileInput: {
    tag: 'input',
    properties: {
      className: 'fileInput',
      type: 'file',
    },
  },
  uploadAnchor: {
    tag: 'a',
    properties: {
      className: 'uploadAnchor',
      download: 'option-list',
      target: '_blank',
    },
  },
};

export default class Index extends ComplexElement<HTMLElement> {
  public appTitle;
  public taskList;
  public addOptionBtn;
  public pasteBtn;
  public clearBtn;
  public saveBtn;
  public loadBtn;
  public startBtn;
  public taskNum: number;
  public pasteModal: PasteModal;
  public invalidModal: InvalidModal;
  public stateHandler: StateHandler;
  public router: Router;
  public fileInput;

  constructor(stateHandler: StateHandler, router: Router) {
    super(ELEM_PARAMS.index);
    this.appTitle = new ElementBuilder(ELEM_PARAMS.appTitle);
    this.taskList = new ElementBuilder(ELEM_PARAMS.taskList);
    this.addOptionBtn = new ElementBuilder(ELEM_PARAMS.addOptionBtn);
    this.pasteBtn = new ElementBuilder(ELEM_PARAMS.pasteBtn);
    this.clearBtn = new ElementBuilder(ELEM_PARAMS.clearBtn);
    this.saveBtn = new ElementBuilder(ELEM_PARAMS.saveBtn);
    this.loadBtn = new ElementBuilder(ELEM_PARAMS.loadBtn);
    this.startBtn = new ElementBuilder(ELEM_PARAMS.startBtn);
    this.fileInput = new ElementBuilder<HTMLInputElement>(ELEM_PARAMS.fileInput);
    this.taskNum = 2;
    this.pasteModal = new PasteModal(this);
    this.invalidModal = new InvalidModal();
    this.stateHandler = stateHandler;
    this.router = router;
    this.configureIndex();
  }

  public configureIndex(): void {
    this.element.append([
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
    this.addOptionBtn.getElement().addEventListener('click', () => this.addOption());
  }

  protected configurePasteBtn(): void {
    this.pasteBtn.getElement().addEventListener('click', () => {
      const item = this.pasteModal.getElement();
      this.element.append([this.pasteModal]);
      item.showModal();
    });
  }

  protected configureClearBtn(): void {
    this.clearBtn.getElement().addEventListener('click', () => {
      this.taskList.getElement().replaceChildren();
      this.taskNum = 1;
    });
  }

  protected configureSaveBtn(): void {
    const uploadAnchor = new ElementBuilder<HTMLAnchorElement>(ELEM_PARAMS.uploadAnchor);
    this.saveBtn.getElement().addEventListener('click', () => {
      const stateData = this.stateHandler.getState('string');
      if (typeof stateData !== 'string') return;
      const fileMimeType = 'application/json';
      const fileName = uploadAnchor.getElement().download;
      const fileType = 'json';
      const data: File = new File([stateData], fileName + '.' + fileType, { type: fileMimeType });
      const url: string = URL.createObjectURL(data);
      uploadAnchor.getElement().href = url;
      uploadAnchor.getElement().click();
      URL.revokeObjectURL(url);
    });
  }

  protected configureLoadBtn(): void {
    this.loadBtn.getElement().addEventListener('click', () => {
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
      if (isOptionsValid) {
        this.router.switchPageTo('picker');
      } else {
        const item = this.invalidModal.getElement();
        this.element.append([this.invalidModal]);
        item.showModal();
      }
    });
  }

  protected optionsValidation(): boolean {
    const data = this.stateHandler.getState('object');
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
