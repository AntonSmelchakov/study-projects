import ComplexElement from '../../../../../utils/complex-element';
import ElementBuilder from '../../../../../utils/element-builder';

import css from './user-item.module.css';

const ELEM_PARAM = {
  userItem: {
    tag: 'div',
    properties: {
      className: css.userItem,
    },
  },
  userName: {
    tag: 'p',
    properties: {
      className: css.userName,
    },
  },
  unreadMsg: {
    tag: 'p',
    properties: {
      className: css.unreadMsg,
    },
  },
};

export default class UserItem extends ComplexElement<HTMLElement> {
  protected userName = new ElementBuilder(ELEM_PARAM.userName);
  protected unreadMsg = new ElementBuilder(ELEM_PARAM.unreadMsg);

  constructor(name: string, messageCount: string) {
    super(ELEM_PARAM.userItem);
    this.userName.getElement().textContent = name;
    this.unreadMsg.getElement().textContent = messageCount;
    this.configureElement();
  }

  public get name(): string {
    return this.userName.getElement().textContent || '';
  }
  public set messageCount(value: string) {
    this.unreadMsg.getElement().textContent = value;
  }

  protected configureElement(): void {
    this.element.append([this.userName, this.unreadMsg]);
    this.userName.getElement().classList.add('userName');
  }
}
