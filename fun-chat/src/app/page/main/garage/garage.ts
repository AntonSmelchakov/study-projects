import ServerHandler from '../../../server-handler/server-handler';
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
        const result = await ServerHandler.startStopEngine({ id: 1, status: 'stopped' });
        console.log(result);
      })();
    });
  }

  /*   public configureCreateBtn(): void {}

  public configureUpdateBtn(): void {}

  public configureRaceBtn(): void {}

  public configureResetBtn(): void {}

  public configureGenerateBtn(): void {} */
}
