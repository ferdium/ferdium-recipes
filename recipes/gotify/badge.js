(() => {
  if (window.gotifyFerdiumBadgeInjected) {
    return;
  }

  window.gotifyFerdiumBadgeInjected = true;

  const sendBadge = count => {
    window.dispatchEvent(
      new CustomEvent('gotify-ferdium-badge', {
        detail: { count },
      }),
    );
  };

  const findReactFiber = element => {
    const key = Object.keys(element).find(name =>
      name.startsWith('__reactFiber$'),
    );

    return key ? element[key] : null;
  };

  const isMessageList = data =>
    Array.isArray(data) &&
    data.every(
      message =>
        message &&
        typeof message.id === 'number' &&
        typeof message.message === 'string' &&
        typeof message.appid === 'number',
    );

  const getLoadedMessageCount = () => {
    const root = document.querySelector('#messages');

    if (!root) {
      return 0;
    }

    // A Fiber's `return` property points to its parent Fiber. React sets it to
    // null when the parent chain ends, so walk up the tree until that point.
    let currentFiber = findReactFiber(root);

    while (currentFiber !== null) {
      const data = currentFiber.memoizedProps?.data;

      if (isMessageList(data) && data.length > 0) {
        return data.length;
      }

      currentFiber = currentFiber.return ?? null;
    }

    return 0;
  };

  window.addEventListener('gotify-ferdium-poll', () => {
    sendBadge(getLoadedMessageCount());
  });
})();
