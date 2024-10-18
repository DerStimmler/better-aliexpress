import { observeElements } from '../utils.ts';

let stopObserving: (() => void) | null = null;

const listSelector = '#card-list';

export function optimizeSearchResultsLayout() {
  if (stopObserving) return;

  const callback = (itemLists: HTMLElement[]) => {
    itemLists.forEach((itemList) => {
      itemList.style.display = 'grid';
      itemList.style.gap = '1rem';
      itemList.style.gridTemplateColumns = 'repeat(auto-fit, minmax(16rem, 1fr))';

      Array.from(itemList.children).forEach((child) => {
        const itemCard = child as HTMLElement;
        itemCard.style.width = '100%';

        const cardwrapper = itemCard.firstChild?.firstChild as HTMLElement;
        if (cardwrapper) {
          cardwrapper.style.height = '468.5px !important';
        }

        const innerCard = itemCard.firstChild?.firstChild?.firstChild as HTMLElement;
        if (innerCard) {
          innerCard.style.zIndex = '12';
          innerCard.style.height = '100%';
          innerCard.style.backgroundColor = '#fff';
          innerCard.style.padding = '16px';
          innerCard.style.left = '0';
          innerCard.style.top = '0';
          innerCard.style.right = '0';
          innerCard.style.border = '1px solid rgba(0, 0, 0, 0.1)';
          innerCard.style.webkitBoxShadow = '0 2px 4px 0 rgba(0, 0, 0, 0.1)';
          innerCard.style.boxShadow = '0 2px 4px 0 rgba(0, 0, 0, 0.1)';
          innerCard.style.borderRadius = '16px';
        }

        const actionContainer = itemCard.querySelector('.rcmd-hover-more-action') as HTMLElement;
        if (actionContainer) {
          actionContainer.style.display = 'flex';
          actionContainer.style.marginTop = '0.25rem';
        }

        const bundleButton = itemCard.querySelector('.multi--rainbow--15BbKuB') as HTMLElement;
        if (bundleButton) {
          bundleButton.style.backgroundColor = '#191919';
          bundleButton.style.color = '#ffffff';

          if (bundleButton.parentElement?.lastChild !== bundleButton) {
            bundleButton.parentElement?.appendChild(bundleButton);
          }

          Array.from(bundleButton.children).forEach((child) => ((child as HTMLElement).style.color = '#ffffff'));

          bundleButton.onmouseover = () => {
            Array.from(bundleButton.children).forEach(
              (child) => ((child as HTMLElement).style.color = 'rgba(255,255,255,0.8)')
            );
          };

          bundleButton.onmouseout = () => {
            Array.from(bundleButton.children).forEach((child) => ((child as HTMLElement).style.color = '#ffffff'));
          };
        }
      });
    });
  };

  const elements = document.querySelectorAll<HTMLElement>(listSelector);
  callback(Array.from(elements));

  stopObserving = observeElements(listSelector, callback);
}

export function unoptimizeSearchResultsLayout() {
  if (!stopObserving) return;

  stopObserving();
  stopObserving = null;

  const callback = (itemLists: HTMLElement[]) => {
    itemLists.forEach((itemList) => {
      itemList.removeAttribute('style');

      Array.from(itemList.children).forEach((child) => {
        const itemCard = child as HTMLElement;
        itemCard.style.removeProperty('width');

        const cardwrapper = itemCard.firstChild?.firstChild as HTMLElement;
        if (cardwrapper) {
          cardwrapper.removeAttribute('style');
        }

        const innerCard = itemCard.firstChild?.firstChild?.firstChild as HTMLElement;
        if (innerCard) {
          innerCard.removeAttribute('style');
        }

        const actionContainer = itemCard.querySelector('.rcmd-hover-more-action') as HTMLElement;
        if (actionContainer) {
          actionContainer.removeAttribute('style');
        }

        const bundleButton = itemCard.querySelector('.multi--rainbow--15BbKuB') as HTMLElement;
        if (bundleButton) {
          bundleButton.removeAttribute('style');

          bundleButton.onmouseover = null;
          bundleButton.onmouseout = null;

          Array.from(bundleButton.children).forEach((child) => (child as HTMLElement).removeAttribute('style'));
        }
      });
    });
  };

  const elements = document.querySelectorAll<HTMLElement>(listSelector);
  callback(Array.from(elements));
}
