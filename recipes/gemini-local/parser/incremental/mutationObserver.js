const OBSERVER_ROOT_SELECTORS = [
  'main',
  '[data-testid="conversation-turn-wrapper"]',
  '[data-message-author-role]',
  'article',
];

function findObservationRoot(doc) {
  for (const selector of OBSERVER_ROOT_SELECTORS) {
    const element = doc.querySelector(selector);

    if (element) {
      return element.closest('main') || element;
    }
  }

  return doc.querySelector('main') || doc.body || null;
}

function installMutationObserver({ doc, onMutate }) {
  const root = findObservationRoot(doc);

  if (!root) {
    return null;
  }

  const observer = new MutationObserver(mutations => {
    const hasRelevantMutation = mutations.some(
      mutation =>
        mutation.type === 'childList' || mutation.type === 'characterData',
    );

    if (hasRelevantMutation) {
      onMutate();
    }
  });

  observer.observe(root, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  return observer;
}

module.exports = {
  findObservationRoot,
  installMutationObserver,
};
