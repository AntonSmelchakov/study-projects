import type { ServerPayloadType } from '../../../../server-handler/server-handler';
import ServerHandler from '../../../../server-handler/server-handler';
import ComplexElement from '../../../../utils/complex-element';
import ElementBuilder from '../../../../utils/element-builder';

const ELEM_PARAMS = {
  userList: {
    tag: 'div',
    properties: {
      className: 'user-list',
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
  userItem: {
    tag: 'div',
    properties: {
      className: 'user-item',
    },
  },
};

export default class UserList extends ComplexElement<HTMLElement> {
  protected searchBar: ElementBuilder<HTMLInputElement>;
  protected serverHandler: ServerHandler;

  constructor(serverHandler: ServerHandler) {
    super(ELEM_PARAMS.userList);
    this.searchBar = new ElementBuilder<HTMLInputElement>(ELEM_PARAMS.searchBar);
    this.serverHandler = serverHandler;
    this.configureElement();
  }

  protected configureElement(): void {
    globalThis.addEventListener('activeUsersReceived', (event) => {
      this.userListHandler(event, 'active-user-item');
    });
    globalThis.addEventListener('inactiveUsersReceived', (event) => {
      this.userListHandler(event, 'inactive-user-item');
    });
    try {
      this.serverHandler.getActiveUsers();
      this.serverHandler.getInactiveUsers();
    } catch {
      this.serverHandler.addEventListener('open', () => {
        this.serverHandler.getActiveUsers();
        this.serverHandler.getInactiveUsers();
      });
    }
  }

  protected userListHandler(event: Event, cssClass: string): void {
    if (!(event instanceof CustomEvent)) return;
    const data: unknown = event.detail;
    if (
      ServerHandler.isValidData<ServerPayloadType['allUsers']>(data) &&
      data.user.users.length > 0
    ) {
      /* this.element.getElement().replaceChildren(); */
      for (const item of data.user.users) {
        const userItem = new ElementBuilder<HTMLElement>(ELEM_PARAMS.userItem);
        userItem.getElement().textContent = item.login;
        userItem.getElement().classList.add(cssClass);
        this.element.getElement().append(userItem.getElement());
      }
    }
  }
}
