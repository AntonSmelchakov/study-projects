import ComplexElement from '../../utils/complex-element';
import ElementBuilder from '../../utils/element-builder';

const ELEM_PARAMS = {
  footer: {
    tag: 'footer',
    properties: {
      className: 'footer',
    },
  },
  gitHubLink: {
    tag: 'a',
    properties: {
      className: 'git-hub-link',
      href: 'https://github.com/AntonSmelchakov',
      target: '_blank',
    },
  },
  gitHubIcon: {
    tag: 'img',
    properties: {
      src: '/img/github-icon.svg',
      className: 'git-hub-icon',
      alt: 'GitHub',
      width: '32',
      height: '32',
    },
  },
  rsSchoolLink: {
    tag: 'a',
    properties: {
      className: 'rs-school-link',
      href: 'https://rs.school/courses/javascript-ru',
      target: '_blank',
    },
  },
  rsSchoolIcon: {
    tag: 'img',
    properties: {
      className: 'rs-school-icon',
      src: '/img/rss-logo.svg',
      alt: 'rs-school',
      width: '32',
      height: '32',
    },
  },
  year: {
    tag: 'p',
    properties: {
      className: 'year',
      textContent: '2024',
    },
  },
};

export default class Footer extends ComplexElement<HTMLElement> {
  constructor() {
    super(ELEM_PARAMS.footer);
    this.configureElement();
  }

  public toggleFooter(onOff: boolean): void {
    if (onOff) {
      this.element.getElement().style.display = 'flex';
    } else {
      this.element.getElement().style.display = 'none';
    }
  }

  private configureElement(): void {
    const gitHubLink = new ElementBuilder(ELEM_PARAMS.gitHubLink);
    const gitHubIcon = new ElementBuilder(ELEM_PARAMS.gitHubIcon);
    gitHubLink.append([gitHubIcon]);
    const rsSchoolLink = new ElementBuilder(ELEM_PARAMS.rsSchoolLink);
    const rsSchoolIcon = new ElementBuilder(ELEM_PARAMS.rsSchoolIcon);
    rsSchoolLink.append([rsSchoolIcon]);
    const year = new ElementBuilder(ELEM_PARAMS.year);
    this.element.append([gitHubLink, rsSchoolLink, year]);
  }
}
