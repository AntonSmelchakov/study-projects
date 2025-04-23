import type { ServerPayloadType } from '../../../../../../server-handler/server-handler';
import ComplexElement from '../../../../../../utils/complex-element';

const ELEM_PARAM = {
  messageItem: {
    tag: 'div',
    properties: {
      className: 'messageItem',
    },
  },
};

export default class MessageItem extends ComplexElement<HTMLElement> {
  constructor(messagePayload: ServerPayloadType['msgSend']) {
    super(ELEM_PARAM.messageItem);
    this.element.getElement().textContent = messagePayload.message.text;
  }
}
