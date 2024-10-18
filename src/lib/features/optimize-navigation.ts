import { getRootDomain, observeElements } from '../utils.ts';

let stopObservingTabs: (() => void) | null = null;
const menuTabsSelector = '[data-tabs=true] > a';

let stopObservingHeader: (() => void) | null = null;
const headerSelector = '[data-spm=header]';

export enum NavigationOption {
  Normal = 'Normal',
  Choice = 'Choice',
  Bundle = 'Bundle'
}

export function optimizeNavigation() {
  optimizeTabs();
  optimizeHeader();
}

export function unoptimizeNavigation() {
  unoptimizeTabs();
  unoptimizeHeader();
}

function optimizeTabs() {
  if (stopObservingTabs) return;

  const callback = (menuTabs: HTMLElement[]) => {
    menuTabs.forEach((menuTab) => {
      const tabType = menuTab.getAttribute('data-spm');
      if (tabType !== '3fornn' && tabType !== 'choicetab') return;

      menuTab.style.display = 'none';
    });
  };

  const elements = document.querySelectorAll<HTMLElement>(menuTabsSelector);
  callback(Array.from(elements));

  stopObservingTabs = observeElements(menuTabsSelector, callback);
}

function optimizeHeader() {
  if (stopObservingHeader) return;

  const dropdown = document.createElement('select');
  dropdown.id = 'bae-dropdown';
  dropdown.style.backgroundColor = '#191919';
  dropdown.style.color = '#ffffff';
  dropdown.style.border = 'none';

  // Add options to the dropdown
  Object.keys(NavigationOption).forEach((optionText) => {
    const option = document.createElement('option');
    option.style.backgroundColor = '#191919';
    option.style.color = '#ffffff';
    option.value = optionText;
    option.textContent = optionText;
    dropdown.appendChild(option);
  });

  dropdown.addEventListener('change', () => {
    const rootDomain = getRootDomain(window.location.href);

    // Redirect based on the selected option
    if (dropdown.value === NavigationOption.Normal) {
      window.location.href = rootDomain;
    } else if (dropdown.value === NavigationOption.Choice) {
      window.location.href = `${rootDomain}/ssr/300000556/zQFHEaEPNJ`;
    } else if (dropdown.value === NavigationOption.Bundle) {
      window.location.href = `${rootDomain}/gcp/300000512/nnpage2024`;
    }
  });

  const callback = (headers: HTMLElement[]) => {
    headers.forEach((header) => {
      if (header.firstChild === dropdown) return;
      header.firstChild?.before(dropdown);
      updateDropdownBasedOnURL(dropdown);
    });
  };

  const elements = document.querySelectorAll<HTMLElement>(headerSelector);
  callback(Array.from(elements));

  stopObservingHeader = observeElements(headerSelector, callback);
}

function unoptimizeTabs() {
  if (!stopObservingTabs) return;

  stopObservingTabs();
  stopObservingTabs = null;

  const callback = (menuTabs: HTMLElement[]) => {
    menuTabs.forEach((menuTab) => {
      const tabType = menuTab.getAttribute('data-spm');
      if (tabType === '3fornn' || tabType === 'choicetab') menuTab.style.display = 'inline-block';
    });
  };

  const elements = document.querySelectorAll<HTMLElement>(menuTabsSelector);
  callback(Array.from(elements));
}

function unoptimizeHeader() {
  if (!stopObservingHeader) return;

  stopObservingHeader();
  stopObservingHeader = null;

  const dropdown = document.getElementById('bae-dropdown');
  dropdown?.remove();
}

const updateDropdownBasedOnURL = (dropdown: HTMLSelectElement) => {
  const path = window.location.pathname;
  if (path.startsWith('/ssr')) {
    dropdown.value = NavigationOption.Choice;
  } else if (path.startsWith('/gcp')) {
    dropdown.value = NavigationOption.Bundle;
  } else {
    dropdown.value = NavigationOption.Normal;
  }
};
