import type ServerHandler from '../../../../../server-handler/server-handler';
import type StateHandler from '../../../../../state-handler/state-handler';
import ComplexElement from '../../../../../utils/complex-element';
import ElementBuilder from '../../../../../utils/element-builder';
import css from './writing-field.module.css';

const ELEM_PARAM = {
  writingField: {
    tag: 'div',
    properties: {
      className: css.writingField,
    },
  },
  textField: {
    tag: 'textarea',
    properties: {
      className: css.textField,
    },
  },
};

export default class WritingField extends ComplexElement<HTMLElement> {
  public textField;
  protected serverHandler;
  protected stateHandler;

  constructor(serverHandler: ServerHandler, stateHandler: StateHandler) {
    super(ELEM_PARAM.writingField);
    this.textField = new ElementBuilder<HTMLTextAreaElement>(ELEM_PARAM.textField);
    this.serverHandler = serverHandler;
    this.stateHandler = stateHandler;
    this.configureElement();
  }

  protected configureElement(): void {
    this.element.getElement().addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (this.textField.getElement().value) this.sendMessage();
        this.textField.getElement().value = '';
      }
    });
    this.element.append([this.textField]);
  }

  protected sendMessage(): void {
    if (this.stateHandler.currentChatWith)
      this.serverHandler.sendMessage({
        message: {
          to: this.stateHandler.currentChatWith,
          text: this.textField.getElement().value,
        },
      });
  }
}
