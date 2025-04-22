export interface DataItem {
  title?: string;
  weight?: string;
}

export interface ValidJSON {
  login: string;
  password: string;
  isLoggedIn: boolean;
}

const STORAGE_KEYS = {
  loginData: 'loginData',
};

function isValidJSON(incomingJSON: unknown): incomingJSON is ValidJSON {
  return !!incomingJSON;
}

export default class StateHandler {
  public isLoggedIn: boolean;
  public login: string | undefined;
  public password: string | undefined;
  protected state: ValidJSON | undefined;

  constructor() {
    this.isLoggedIn = false;
    this.state = undefined;
    this.configureStateStorage();
  }

  /*   public setState(data: unknown): void {
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
  } */

  public setState(loginStatus: boolean = true): void {
    if (this.isLoggedIn) {
      const loginData = {
        login: this.login,
        password: this.password,
        isLoggedIn: loginStatus,
      };
      globalThis.sessionStorage.setItem(STORAGE_KEYS.loginData, JSON.stringify(loginData));
    } else globalThis.sessionStorage.clear();
  }

  protected stateInit(): void {
    const sessionData: string | null = globalThis.sessionStorage.getItem(STORAGE_KEYS.loginData);
    let loginData: unknown;
    if (sessionData) loginData = JSON.parse(sessionData);
    if (isValidJSON(loginData)) {
      this.login = loginData.login;
      this.password = loginData.password;
      this.isLoggedIn = loginData.isLoggedIn;
    }
  }

  protected configureStateStorage(): void {
    this.stateInit();
    window.addEventListener('beforeunload', () => {
      this.setState();
    });
  }
}
