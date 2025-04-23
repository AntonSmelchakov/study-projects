import type ServerHandler from '../../../server-handler/server-handler';
import type StateHandler from '../../../state-handler/state-handler';
import ComplexElement from '../../../utils/complex-element';
import ElementBuilder from '../../../utils/element-builder';
import ChatField from './chat-field/chat-field';
import UserList from './user-list/user-list';
import css from './chat.module.css';

const ELEM_PARAMS = {
  mainContainer: {
    tag: 'div',
    properties: {
      className: css.mainContainer,
    },
  },
  chatterName: {
    tag: 'h2',
    properties: {
      className: css.chatterName,
    },
  },
};

export default class Chat extends ComplexElement<HTMLElement> {
  public chatterName;
  protected userList: UserList;
  protected chatField: ChatField;
  protected stateHandler;

  constructor(serverHandler: ServerHandler, stateHandler: StateHandler) {
    super(ELEM_PARAMS.mainContainer);
    this.userList = new UserList(serverHandler, stateHandler);
    this.chatField = new ChatField(serverHandler, stateHandler);
    this.chatterName = new ElementBuilder(ELEM_PARAMS.chatterName);
    this.stateHandler = stateHandler;
    this.configureElement();
  }

  protected configureElement(): void {
    this.chatField.writeField.textField.getElement().setAttribute('disabled', 'true');
    this.userList.getElement().addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.classList.contains('user-item')) {
        this.chatterName.getElement().textContent = target.textContent;
        this.stateHandler.currentChatWith = target.textContent || '';
        this.chatField.writeField.textField.getElement().removeAttribute('disabled');
        this.chatField.messageField.getAllMessages({
          user: {
            login: this.stateHandler.currentChatWith,
          },
        });
      }
    });
    this.element.append([this.userList, this.chatterName, this.chatField]);
  }
}
