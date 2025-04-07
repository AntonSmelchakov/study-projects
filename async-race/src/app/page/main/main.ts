import type Router from '../../router/router';
import type StateHandler from '../../state-handler/state-handler';
import ComplexElement from '../../utils/complex-element';
import Garage from './garage/garage';
import NotFound from './not-found/not-found';
import Winners from './winners/winners';

export default class Main extends ComplexElement<HTMLElement> {
  public garage: Garage;
  public winners: Winners;
  public notFound: NotFound;

  constructor(stateHandler: StateHandler, router: Router) {
    super({ tag: 'main', properties: { className: 'main' } });
    this.garage = new Garage(stateHandler, router);
    this.winners = new Winners(stateHandler, router);
    this.notFound = new NotFound(router);
    this.configureElement();
  }

  public configureElement(): void {
    this.element.getElement().append(this.garage.getElement());
  }
}
