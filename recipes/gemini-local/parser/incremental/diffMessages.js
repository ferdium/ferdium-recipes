function getStableMessageIdentity(message) {
  if (!message) {
    return null;
  }

  return `${message.role}:${message.seq}`;
}

function diffMessages(previousMessages, nextMessages) {
  if (previousMessages.length === 0) {
    return {
      type: 'bootstrap',
      appended: nextMessages,
      updatedTail: null,
    };
  }

  if (nextMessages.length < previousMessages.length) {
    return {
      type: 'rescan',
      appended: [],
      updatedTail: null,
    };
  }

  for (let index = 0; index < previousMessages.length; index += 1) {
    const previousMessage = previousMessages[index];
    const nextMessage = nextMessages[index];

    if (!nextMessage) {
      return {
        type: 'rescan',
        appended: [],
        updatedTail: null,
      };
    }

    const previousIdentity = getStableMessageIdentity(previousMessage);
    const nextIdentity = getStableMessageIdentity(nextMessage);
    const isTailAssistantUpdate =
      index === previousMessages.length - 1 &&
      previousMessage.role === 'assistant' &&
      nextMessage.role === 'assistant' &&
      previousIdentity === nextIdentity &&
      previousMessage.text !== nextMessage.text;

    if (isTailAssistantUpdate) {
      continue;
    }

    if (
      previousIdentity !== nextIdentity ||
      previousMessage.text !== nextMessage.text
    ) {
      return {
        type: 'rescan',
        appended: [],
        updatedTail: null,
      };
    }
  }

  if (nextMessages.length > previousMessages.length) {
    return {
      type: 'append',
      appended: nextMessages.slice(previousMessages.length),
      updatedTail: null,
    };
  }

  const previousTail = previousMessages.at(-1);
  const nextTail = nextMessages.at(-1);

  if (
    previousTail &&
    nextTail &&
    previousTail.role === 'assistant' &&
    nextTail.role === 'assistant' &&
    previousTail.seq === nextTail.seq &&
    previousTail.text !== nextTail.text
  ) {
    return {
      type: 'update-tail',
      appended: [],
      updatedTail: nextTail,
    };
  }

  return {
    type: 'noop',
    appended: [],
    updatedTail: null,
  };
}

module.exports = {
  diffMessages,
};
