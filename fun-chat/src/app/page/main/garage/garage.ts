/* eslint-disable class-methods-use-this */
import ApiHandler from '../../../api-handler/api-handler';
import type Router from '../../../router/router';
import type StateHandler from '../../../state-handler/state-handler';
import type { ElementList } from '../../../types/types';
import ComplexElement from '../../../utils/complex-element';
import ElementBuilder from '../../../utils/element-builder';
import './style.css';

const ELEM_PARAMS: ElementList = {
  garage: {
    tag: 'section',
    properties: {
      className: 'garage',
    },
  },
  winnersBtn: {
    tag: 'button',
    properties: {
      className: 'button',
      textContent: 'Winners Leaderboard',
    },
  },
  carNameInput: {
    tag: 'input',
    properties: {
      className: 'input',
      placeholder: 'car name',
    },
  },
  carColorInput: {
    tag: 'input',
    properties: {
      className: 'input',
      type: 'color',
    },
  },
  createBtn: {
    tag: 'button',
    properties: {
      className: 'button',
      textContent: 'Create car',
    },
  },
  updateBtn: {
    tag: 'button',
    properties: {
      className: 'button',
      textContent: 'Update car',
    },
  },
  raceBtn: {
    tag: 'button',
    properties: {
      className: 'button',
      textContent: 'Race',
    },
  },
  resetBtn: {
    tag: 'button',
    properties: {
      className: 'button',
      textContent: 'Reset All cars',
    },
  },
  generateBtn: {
    tag: 'button',
    properties: {
      className: 'button',
      textContent: 'Create 100 cars',
    },
  },
  startBtn: {
    tag: 'button',
    properties: {
      className: 'button',
      textContent: 'Start',
    },
  },
};

export default class Garage extends ComplexElement<HTMLElement> {
  public stateHandler: StateHandler;
  public router: Router;
  public winnersBtn: ElementBuilder<HTMLElement>;
  public carNameInput: ElementBuilder<HTMLInputElement>;
  public carColorInput: ElementBuilder<HTMLInputElement>;
  public createBtn: ElementBuilder<HTMLElement>;
  public updateBtn: ElementBuilder<HTMLElement>;
  public raceBtn: ElementBuilder<HTMLElement>;
  public resetBtn: ElementBuilder<HTMLElement>;
  public generateBtn: ElementBuilder<HTMLElement>;
  /*   public track: AppendableElement; */

  constructor(stateHandler: StateHandler, router: Router) {
    super(ELEM_PARAMS.garage);
    this.winnersBtn = new ElementBuilder(ELEM_PARAMS.winnersBtn);
    this.carNameInput = new ElementBuilder<HTMLInputElement>(ELEM_PARAMS.carNameInput);
    this.carColorInput = new ElementBuilder<HTMLInputElement>(ELEM_PARAMS.carColorInput);
    this.createBtn = new ElementBuilder(ELEM_PARAMS.createBtn);
    this.updateBtn = new ElementBuilder(ELEM_PARAMS.updateBtn);
    this.raceBtn = new ElementBuilder(ELEM_PARAMS.raceBtn);
    this.resetBtn = new ElementBuilder(ELEM_PARAMS.resetBtn);
    this.generateBtn = new ElementBuilder(ELEM_PARAMS.generateBtn);
    /*     this.track = new Track(ELEM_PARAMS.title); */
    this.stateHandler = stateHandler;
    this.router = router;
    this.configureGarage();
  }

  public configureGarage(): void {
    this.element.append([
      this.winnersBtn,
      this.carNameInput,
      this.carColorInput,
      this.createBtn,
      this.updateBtn,
      this.raceBtn,
      this.resetBtn,
      this.generateBtn,
      /*       this.track, */
    ]);
    this.configureWinnersBtn();
    this.configureCreateBtn();
    this.configureUpdateBtn();
    this.configureRaceBtn();
    this.configureResetBtn();
    this.configureGenerateBtn();
  }

  public configureWinnersBtn(): void {
    this.winnersBtn.addEventListener('click', () => {
      void (async (): Promise<void> => {
        const result = await ApiHandler.startStopEngine({ id: 1, status: 'stopped' });
        console.log(result);
      })();
    });
  }

  public configureCreateBtn(): void {}

  public configureUpdateBtn(): void {}

  public configureRaceBtn(): void {}

  public configureResetBtn(): void {}

  public configureGenerateBtn(): void {}

  /*   public configureTaskList(): void {
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
  } */
}
