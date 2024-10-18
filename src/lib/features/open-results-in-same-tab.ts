import { observeElements } from '../utils.ts';

let stopObserving: (() => void) | null = null;

const linkSelector = '#card-list > * a';

export function openResultsInSameTab() {
  if (stopObserving) return;

  const callback = (linkElements: HTMLElement[]) => {
    linkElements.forEach((linkElement) => linkElement.setAttribute('target', '_self'));
  };

  const elements = document.querySelectorAll<HTMLElement>(linkSelector);
  callback(Array.from(elements));

  stopObserving = observeElements(linkSelector, callback);
}

export function openResultsInNewTab() {
  if (!stopObserving) return;

  stopObserving();
  stopObserving = null;

  const callback = (linkElements: HTMLElement[]) => {
    linkElements.forEach((linkElement) => linkElement.setAttribute('target', '_blank'));
  };

  const elements = document.querySelectorAll<HTMLElement>(linkSelector);
  callback(Array.from(elements));
}
