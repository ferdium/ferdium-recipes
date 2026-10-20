const WORKSPACE_ID_IN_CLIENT_PATH = /^\/client\/(T[\dA-Z]+)(\/|$)/;

const parseUrl = link => {
  try {
    return new URL(link);
  } catch {
    return null;
  }
};

// An app link like slack://channel?team=T…&id=C…&message=1700000000.000000
const resolveAppLink = (url, workspaceUrl, workspaceId) => {
  if (!workspaceId || url.searchParams.get('team') !== workspaceId) {
    return null;
  }

  const channelId = url.searchParams.get('id');

  if (url.hostname !== 'channel' || !channelId) {
    return workspaceUrl;
  }

  const message = url.searchParams.get('message');
  const messagePath = message ? `/p${message.replace('.', '')}` : '';

  return `${workspaceUrl}/messages/${channelId}${messagePath}`;
};

module.exports = Ferdium =>
  class Slack extends Ferdium {
    resolveLink(link, { team, linkContext }) {
      const url = parseUrl(link);

      if (!url || !team) {
        return null;
      }

      const workspaceUrl = `https://${team}.slack.com`;
      const workspaceId = linkContext && linkContext.workspaceId;

      if (url.protocol === 'slack:') {
        return resolveAppLink(url, workspaceUrl, workspaceId);
      }

      if (url.hostname === `${team}.slack.com`) {
        // A permalink to /archives/ shows an "open in the Slack app" page first,
        // while the same link to /messages/ opens the message in the web client
        url.pathname = url.pathname.replace(/^\/archives\//, '/messages/');

        return url.toString();
      }

      const clientPath = WORKSPACE_ID_IN_CLIENT_PATH.exec(url.pathname);

      if (
        url.hostname === 'app.slack.com' &&
        clientPath &&
        clientPath[1] === workspaceId
      ) {
        return link;
      }

      return null;
    }
  };
