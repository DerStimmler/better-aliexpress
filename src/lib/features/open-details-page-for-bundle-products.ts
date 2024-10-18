import { observeElements } from '../utils.ts';

let stopObserving: (() => void) | null = null;

const linkSelector = '#card-list > * a:has(.multi--rainbow--15BbKuB)';

export function openDetailsPageForBundleProducts() {
  if (stopObserving) return;

  const callback = (linkElements: HTMLElement[]) => {
    linkElements.forEach((linkElement) => {
      if (linkElement.getAttribute('bundle_href') || linkElement.getAttribute('data-better-aliexpress')) return;

      const bundleHref = linkElement.getAttribute('href');

      if (!bundleHref) return;

      linkElement.setAttribute('bundle_href', bundleHref);

      const oldUrl = new URL(bundleHref);
      const productId = oldUrl.searchParams.get('productIds');

      if (!productId) return;

      const newHref = `${oldUrl.protocol}//${oldUrl.host}/item/${productId}.html`;
      linkElement.setAttribute('href', newHref);

      const bundleButton = linkElement.querySelector('.multi--rainbow--15BbKuB');
      if (bundleButton) {
        if (bundleButton.parentElement?.tagName !== 'A') {
          const anchor = document.createElement('a');
          anchor.setAttribute('data-better-aliexpress', 'bundle-link');
          anchor.href = bundleHref;
          anchor.target = '_blank';
          bundleButton.parentElement?.appendChild(anchor);
          anchor.appendChild(bundleButton);
        }
      }
    });
  };

  const elements = document.querySelectorAll<HTMLElement>(linkSelector);
  callback(Array.from(elements));

  stopObserving = observeElements(linkSelector, callback);
}

export function openBundlePageForBundleProducts() {
  if (!stopObserving) return;

  stopObserving();
  stopObserving = null;

  const callback = (linkElements: HTMLElement[]) => {
    linkElements.forEach((linkElement) => {
      const bundleHref = linkElement.getAttribute('bundle_href');

      if (!bundleHref) return;

      linkElement.setAttribute('href', bundleHref);
      linkElement.removeAttribute('bundle_href');

      const bundleLink = document.querySelector('[data-better-aliexpress=bundle-link]');
      if (bundleLink) {
        bundleLink.parentElement?.appendChild(bundleLink.firstChild!);
        bundleLink.remove();
      }
    });
  };

  const elements = document.querySelectorAll<HTMLElement>(linkSelector);
  callback(Array.from(elements));
}
