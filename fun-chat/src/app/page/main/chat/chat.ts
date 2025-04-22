import type ServerHandler from '../../../server-handler/server-handler';
import type StateHandler from '../../../state-handler/state-handler';
import ComplexElement from '../../../utils/complex-element';
import UserList from './user-list/user-list';

const ELEM_PARAMS = {
  mainContainer: {
    tag: 'div',
    properties: {
      className: 'mainContainer',
    },
  },
};

export default class Chat extends ComplexElement<HTMLElement> {
  protected userList: UserList;

  constructor(serverHandler: ServerHandler, stateHandler: StateHandler) {
    super(ELEM_PARAMS.mainContainer);
    this.userList = new UserList(serverHandler, stateHandler);
    this.configureElement();
  }

  protected configureElement(): void {
    this.element.append([this.userList]);
  }
}
