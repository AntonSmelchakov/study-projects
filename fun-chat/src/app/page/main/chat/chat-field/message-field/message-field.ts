import type { PayloadType, ServerPayloadType } from '../../../../../server-handler/server-handler';
import ServerHandler from '../../../../../server-handler/server-handler';
import type StateHandler from '../../../../../state-handler/state-handler';
import ComplexElement from '../../../../../utils/complex-element';
import MessageItem from './message-item/message-item';
import css from './message-field.module.css';

const ELEM_PARAMS = {
  messageField: {
    tag: 'div',
    properties: {
      className: css.messageField,
    },
  },
};

export default class MessageField extends ComplexElement<HTMLElement> {
  protected stateHandler;
  protected serverHandler;
  constructor(stateHandler: StateHandler, serverHandler: ServerHandler) {
    super(ELEM_PARAMS.messageField);
    this.stateHandler = stateHandler;
    this.serverHandler = serverHandler;
    this.configureElement();
  }

  public getAllMessages(payload: PayloadType['msgFromUser']): void {
    this.element.getElement().replaceChildren();
    globalThis.addEventListener('messageHistoryReceived', this.allMessagesHandler);
    this.serverHandler.fetchMessages(payload);
  }

  protected createMessage(messagePayload: ServerPayloadType['msgSend']): void {
    this.element.append([new MessageItem(messagePayload)]);
  }

  protected configureElement(): void {
    globalThis.addEventListener('messageReceived', (event) => {
      if (!(event instanceof CustomEvent)) return;
      const data: unknown = event.detail;
      if (
        ServerHandler.isValidData<ServerPayloadType['msgSend']>(data) &&
        (data.message.from === this.stateHandler.currentChatWith || this.stateHandler.login)
      )
        this.createMessage(data);
    });
  }

  protected allMessagesHandler = (event: Event): void => {
    if (!(event instanceof CustomEvent)) return;
    const data: unknown = event.detail;
    if (
      !(
        ServerHandler.isValidData<ServerPayloadType['msgFromUser']>(data) &&
        data.messages.length > 0
      )
    )
      return;
    for (const item of data.messages) {
      this.createMessage({ message: item });
    }
    globalThis.removeEventListener('messageHistoryReceived', this.allMessagesHandler);
  };
}
