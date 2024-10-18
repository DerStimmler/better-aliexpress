import { observeElements } from '../utils.ts';

let stopObserving: (() => void) | null = null;

const selector = '[class^="es--product-fix-wrap--"]';

export function hideSocialIcons() {
  if (stopObserving) return;

  const callback = (elements: HTMLElement[]) => {
    elements.forEach((element) => (element.style.display = 'none'));
  };

  const elements = document.querySelectorAll<HTMLElement>(selector);
  callback(Array.from(elements));

  stopObserving = observeElements(selector, callback);
}

export function showSocialIcons() {
  if (!stopObserving) return;

  stopObserving();
  stopObserving = null;

  const callback = (elements: HTMLElement[]) => {
    elements.forEach((element) => element.style.removeProperty('display'));
  };

  const elements = document.querySelectorAll<HTMLElement>(selector);
  callback(Array.from(elements));
}
