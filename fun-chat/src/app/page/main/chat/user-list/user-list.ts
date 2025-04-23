import type { ServerPayloadType } from '../../../../server-handler/server-handler';
import ServerHandler from '../../../../server-handler/server-handler';
import type StateHandler from '../../../../state-handler/state-handler';
import ComplexElement from '../../../../utils/complex-element';
import ElementBuilder from '../../../../utils/element-builder';
import css from './user-list.module.css';

const ELEM_PARAMS = {
  userList: {
    tag: 'div',
    properties: {
      className: css.userList,
    },
  },
  searchBar: {
    tag: 'input',
    properties: {
      className: 'search-bar',
      type: 'text',
      placeholder: 'Search users...',
    },
  },
  onlineSection: {
    tag: 'div',
    properties: {
      className: css.onlineSection,
    },
  },
  offlineSection: {
    tag: 'div',
    properties: {
      className: css.offlineSection,
    },
  },
  userItem: {
    tag: 'p',
    properties: {
      className: css.userItem,
    },
  },
};

export default class UserList extends ComplexElement<HTMLElement> {
  protected serverHandler: ServerHandler;
  protected stateHandler: StateHandler;
  protected searchBar: ElementBuilder<HTMLInputElement>;
  protected onlineSection: ElementBuilder<HTMLElement>;
  protected offlineSection: ElementBuilder<HTMLElement>;
  protected users: Record<string, HTMLElement>;

  constructor(serverHandler: ServerHandler, stateHandler: StateHandler) {
    super(ELEM_PARAMS.userList);
    this.searchBar = new ElementBuilder<HTMLInputElement>(ELEM_PARAMS.searchBar);
    this.onlineSection = new ElementBuilder(ELEM_PARAMS.onlineSection);
    this.offlineSection = new ElementBuilder(ELEM_PARAMS.offlineSection);
    this.serverHandler = serverHandler;
    this.stateHandler = stateHandler;
    this.users = {};
    this.configureElement();
  }

  protected configureElement(): void {
    this.configureUserList();
    this.configureSearch();
    this.element.append([this.searchBar, this.onlineSection, this.offlineSection]);
  }

  protected configureUserList(): void {
    globalThis.addEventListener('userAuthGood', () => {
      globalThis.addEventListener('activeUsersReceived', (event) => {
        this.userListHandler(this.onlineSection, event, 'user-item');
      });
      globalThis.addEventListener('inactiveUsersReceived', (event) => {
        this.userListHandler(this.offlineSection, event, 'user-item');
      });
      this.serverHandler.getActiveUsers();
      this.serverHandler.getInactiveUsers();
    });
  }

  protected configureSearch(): void {
    this.searchBar.addEventListener('input', () => {
      const searchParameter = this.searchBar.getElement().value;
      for (const item of Object.values(this.users)) {
        const string = item.textContent || '';
        if (string.indexOf(searchParameter) === -1) item.classList.add(css.hidden);
        else item.classList.remove(css.hidden);
      }
    });
  }

  protected userListHandler(
    section: ElementBuilder<HTMLElement>,
    event: Event,
    cssClass: string,
  ): void {
    if (!(event instanceof CustomEvent)) return;
    const data: unknown = event.detail;
    if (!(ServerHandler.isValidData<ServerPayloadType['allUsers']>(data) && data.users.length > 0))
      return;
    section.getElement().replaceChildren();
    for (const item of data.users) {
      if (item.login === this.stateHandler.login) continue;
      const userItem = new ElementBuilder<HTMLElement>(ELEM_PARAMS.userItem);
      userItem.getElement().textContent = item.login;
      userItem.getElement().classList.add(cssClass);
      section.getElement().append(userItem.getElement());
      this.serverHandler.fetchMessages({
        user: {
          login: item.login,
        },
      });
      this.users[item.login] = userItem.getElement();
    }
  }

  protected configureUnreadMsgDisplay(): void {
    globalThis.addEventListener('messageHistoryReceived', (event) => {
      if (!(event instanceof CustomEvent)) return;
      const data: unknown = event.detail;
      if (
        !(
          ServerHandler.isValidData<ServerPayloadType['msgFromUser']>(data) &&
          data.messages.length > 0
        )
      )
        return;
      const name = data.messages[0].from;
      const element = this.users[name];
      const unreadMessage = data.messages.filter((x) => x.status.isReaded === false);
      element.textContent += ` ${unreadMessage.length}`;
    });
  }
}
