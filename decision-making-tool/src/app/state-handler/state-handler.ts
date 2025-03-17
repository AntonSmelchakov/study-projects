export interface DataItem {
  title?: string;
  weight?: string;
}

export type ValidJSON = { [id: number]: DataItem };

const STORAGE_KEYS = {
  optionDataKey: 'optionState',
};

function isValidJSON(incomingJSON: unknown): incomingJSON is ValidJSON {
  return !!incomingJSON;
}

export default class StateHandler {
  protected state: ValidJSON | undefined;

  constructor() {
    this.state = undefined;
    this.configureStateStorage();
  }

  public setState(data: unknown): void {
    if (isValidJSON(data)) {
      this.state = data;
    }
  }

  public getState(dataType: 'string' | 'object'): ValidJSON | string | undefined {
    if (this.state) {
      return dataType === 'object' ? this.state : JSON.stringify(this.state);
    }

    return undefined;
  }

  public removeOption(id: number): void {
    if (this.state && this.state[id]) delete this.state[id];
  }

  public setOption(id: number, data: DataItem = {}): void {
    if (this.state) {
      if (!this.state[id]) this.state[id] = {};
      if (data.title) this.setOptionTitle(id, data.title);
      if (data.weight) this.setOptionWeight(id, data.weight);
    }
  }

  public setOptionTitle(id: number, value: string): void {
    if (!this.state) return;
    this.state[id].title = value;
  }

  public setOptionWeight(id: number, value: string): void {
    if (!this.state) return;
    this.state[id].weight = value;
  }

  protected stateInit(): void {
    const defaultState: ValidJSON = { 1: { title: '', weight: '' } };
    const localOptionData: string | null = globalThis.localStorage.getItem(
      STORAGE_KEYS.optionDataKey,
    );
    let result: unknown;
    if (localOptionData) result = JSON.parse(localOptionData);
    this.state = isValidJSON(result) ? result : defaultState;
  }

  protected configureStateStorage(): void {
    this.stateInit();
    window.addEventListener('beforeunload', () => {
      localStorage.setItem(STORAGE_KEYS.optionDataKey, JSON.stringify(this.state));
    });
  }
}
