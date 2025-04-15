import type ComplexElement from '../utils/complex-element';
import type ElementBuilder from '../utils/element-builder';

export type ElementProperties = Record<string, string>;

export interface ElementParameters {
  tag: string;
  properties?: ElementProperties;
  customProperties?: ElementProperties;
}

export type ElementList = Record<string, ElementParameters>;

export type AppendableElement = ElementBuilder<HTMLElement> | ComplexElement<HTMLElement>;
