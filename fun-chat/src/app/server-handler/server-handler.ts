const BASE_URL = 'ws://127.0.0.1:4000';

/* enum API_DATA2 {
  userAuthentication = {
    type = "USER_LOGIN",
    payload = {
  }
} */

const CLIENT_REQUEST_DATA = {
  userAuth: {
    type: 'USER_LOGIN',
    payload: {
      user: {
        login: 'string',
        password: 'string',
      },
    },
  },
  userLogout: {
    type: 'USER_LOGOUT',
    payload: {
      user: {
        login: 'string',
        password: 'string',
      },
    },
  },
  userActive: {
    type: 'USER_ACTIVE',
    payload: null,
  },
  userInactive: {
    type: 'USER_INACTIVE',
    payload: null,
  },
  msgSend: {
    type: 'MSG_SEND',
    payload: {
      message: {
        to: 'string',
        text: 'string',
      },
    },
  },
  msgFromUser: {
    type: 'MSG_FROM_USER',
    payload: {
      user: {
        login: 'string',
      },
    },
  },
  msgRead: {
    type: 'MSG_READ',
    payload: {
      message: {
        id: 'string',
        status: {
          isReaded: 'boolean',
        },
      },
    },
  },
  msgDelete: {
    type: 'MSG_DELETE',
    payload: {
      message: {
        id: 'string',
      },
    },
  },
  msgEdit: {
    type: 'MSG_EDIT',
    payload: {
      message: {
        id: 'string',
        text: 'string',
      },
    },
  },
};

const SERVER_REQUEST_DATA = {
  userAuth: {
    type: 'USER_EXTERNAL_LOGIN',
    payload: {
      user: {
        login: 'string',
        isLoggedIn: true,
      },
    },
  },
  allUsers: {
    type: 'ALL_USERS',
    payload: {
      user: {
        users: [
          {
            login: 'string',
            isLoggedIn: true,
          },
        ],
      },
    },
  },
  userLogout: {
    type: 'USER_EXTERNAL_LOGOUT',
    payload: {
      user: {
        login: 'string',
        isLoggedIn: 'boolean',
      },
    },
  },
  msgSend: {
    type: 'MSG_SEND',
    payload: {
      message: {
        id: 'string',
        from: 'string',
        to: 'string',
        text: 'string',
        datetime: 'number',
        status: {
          isDelivered: 'boolean',
          isReaded: 'boolean',
          isEdited: 'boolean',
        },
      },
    },
  },
  msgDelivered: {
    type: 'MSG_DELIVER',
    payload: {
      message: {
        id: 'string',
        status: {
          isDelivered: 'boolean',
        },
      },
    },
  },
  msgRead: {
    type: 'MSG_READ',
    payload: {
      message: {
        id: 'string',
        status: {
          isReaded: 'boolean',
        },
      },
    },
  },
  msgDelete: {
    type: 'MSG_DELETE',
    payload: {
      message: {
        id: 'string',
        status: {
          isDeleted: 'boolean',
        },
      },
    },
  },
  msgEdit: {
    type: 'MSG_EDIT',
    payload: {
      message: {
        id: 'string',
        text: 'string',
        status: {
          isEdited: 'boolean',
        },
      },
    },
  },
  error: {
    id: 'string',
    type: 'ERROR',
    payload: {
      error: 'string',
    },
  },
};

export type PayloadType = {
  [K in keyof typeof CLIENT_REQUEST_DATA]: (typeof CLIENT_REQUEST_DATA)[K]['payload'];
};

export type ServerPayloadType = {
  [K in keyof typeof SERVER_REQUEST_DATA]: (typeof SERVER_REQUEST_DATA)[K]['payload'];
};

export interface RequestFormat {
  id: string | null;
  type: string;
  payload: Record<string, object | string> | null;
}

export default class ServerHandler {
  public log: RequestFormat[];
  private ws: WebSocket | null;
  private id: number;

  constructor() {
    this.ws = new WebSocket(`${BASE_URL}`);
    this.id = 0;
    this.log = [];
    this.configureWebSocket();
  }

  public static isValidData<type>(data: unknown): data is type {
    return typeof data === 'object' && data !== null;
  }

  public static isValidJSON(incomingJSON: unknown): incomingJSON is RequestFormat {
    return (
      typeof incomingJSON === 'object' &&
      incomingJSON !== null &&
      'id' in incomingJSON &&
      'type' in incomingJSON &&
      'payload' in incomingJSON
    );
  }

  protected static dispatchCustomEvent(eventName: string, data: RequestFormat): void {
    const newEvent = new CustomEvent(eventName, {
      detail: { user: data.payload },
    });
    globalThis.dispatchEvent(newEvent);
  }

  public userAuth(payload: PayloadType['userAuth']): number | undefined {
    return this.requestHandler(CLIENT_REQUEST_DATA.userAuth.type, payload);
  }

  public userLogout(payload: PayloadType['userLogout']): void {
    this.requestHandler(CLIENT_REQUEST_DATA.userLogout.type, payload);
  }

  public getActiveUsers(): void {
    this.requestHandler(CLIENT_REQUEST_DATA.userActive.type, null);
  }

  public getInactiveUsers(): void {
    this.requestHandler(CLIENT_REQUEST_DATA.userInactive.type, null);
  }

  public getResponse(id: number): RequestFormat | undefined {
    console.log(this.log);
    const response = this.log.find((item) => item.id !== null && +item.id === id);
    console.log(response);
    if (response) return response;
  }

  public addEventListener(eventName: string, callback: () => void): void {
    if (!this.ws) return;
    this.ws.addEventListener(eventName, callback);
  }

  protected requestHandler(
    type: string,
    payload: Record<string, object | string> | null,
  ): number | undefined {
    if (!this.ws) return undefined;
    const request: RequestFormat = {
      id: `${this.id}`,
      type: type,
      payload: payload,
    };
    this.ws.send(JSON.stringify(request));
    /*     const requestId = this.id; */
    this.id += 1;
    return this.id - 1;
  }

  protected configureWebSocket(): void {
    if (!this.ws) return;
    this.ws.addEventListener('open', () => {
      console.log('WebSocket OK');
    });
    this.configureMessageParser();
  }

  protected configureMessageParser(): void {
    if (!this.ws) return;
    this.ws.addEventListener('message', (event) => {
      if (typeof event.data !== 'string') return;
      const dataString = event.data;
      const data: unknown = JSON.parse(dataString);
      if (!ServerHandler.isValidJSON(data)) return;
      switch (data.type) {
        case 'ERROR': {
          ServerHandler.dispatchCustomEvent('customServerError', data);

          break;
        }
        case CLIENT_REQUEST_DATA.userActive.type: {
          ServerHandler.dispatchCustomEvent('activeUsersReceived', data);

          break;
        }
        case CLIENT_REQUEST_DATA.userInactive.type: {
          ServerHandler.dispatchCustomEvent('inactiveUsersReceived', data);

          break;
        }
        // No default
      }
    });
  }
}
