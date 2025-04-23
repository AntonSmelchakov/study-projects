import type ServerHandler from '../../../../server-handler/server-handler';
import type StateHandler from '../../../../state-handler/state-handler';
import ComplexElement from '../../../../utils/complex-element';
import MessageField from './message-field/message-field';
import WritingField from './writing-field/writing-field';
import css from './chat-field.module.css';

const ELEM_PARAM = {
  chatField: {
    tag: 'div',
    properties: {
      className: css.chatField,
    },
  },
};

export default class ChatField extends ComplexElement<HTMLElement> {
  public messageField: MessageField;
  public writeField: WritingField;

  constructor(serverHandler: ServerHandler, stateHandler: StateHandler) {
    super(ELEM_PARAM.chatField);
    this.messageField = new MessageField(stateHandler, serverHandler);
    this.writeField = new WritingField(serverHandler, stateHandler);
    this.configureElement();
  }

  protected configureElement(): void {
    this.element.append([this.messageField, this.writeField]);
  }
}
