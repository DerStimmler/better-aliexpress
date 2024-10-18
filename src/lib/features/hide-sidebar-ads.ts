import { observeElements } from '../utils.ts';

let stopObserving: (() => void) | null = null;

const selector = '[style*="z-index: 1000000;"]:has(> .drogue-poplayer-modal)';

export function hideSidebarAds() {
  if (stopObserving) return;

  const callback = (elements: HTMLElement[]) => {
    elements.forEach((element) => (element.style.display = 'none'));
  };

  const elements = document.querySelectorAll<HTMLElement>(selector);
  callback(Array.from(elements));

  stopObserving = observeElements(selector, callback);
}

export function showSidebarAds() {
  if (!stopObserving) return;

  stopObserving();
  stopObserving = null;

  const callback = (elements: HTMLElement[]) => {
    elements.forEach((element) => (element.style.display = 'block'));
  };

  const elements = document.querySelectorAll<HTMLElement>(selector);
  callback(Array.from(elements));
}
