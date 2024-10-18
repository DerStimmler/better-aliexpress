export function observeElements(selector: string, callback: (elements: HTMLElement[]) => void): () => void {
  const observer = new MutationObserver((_) => {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    if (elements.length > 0) {
      callback(Array.from(elements));
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  return () => {
    observer.disconnect();
  };
}

export function getRootDomain(url: string) {
  const parsedUrl = new URL(url);
  return `${parsedUrl.protocol}//${parsedUrl.host}`;
}
