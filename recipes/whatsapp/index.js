const WEB_SEND_URL = 'https://web.whatsapp.com/send/';

const parseUrl = link => {
  try {
    return new URL(link);
  } catch {
    return null;
  }
};

// A chat link (whatsapp://send/, wa.me/<number> or api.whatsapp.com/send) opens
// the chat with that number in WhatsApp Web
const getChatPhone = url => {
  if (url.protocol === 'whatsapp:' && url.hostname === 'send') {
    return url.searchParams.get('phone');
  }

  if (url.hostname === 'wa.me') {
    return url.pathname.replace(/^\//, '').split('/')[0] || null;
  }

  if (url.hostname === 'api.whatsapp.com' && /^\/send\/?$/.test(url.pathname)) {
    return url.searchParams.get('phone');
  }

  return null;
};

module.exports = Ferdium =>
  class Messenger extends Ferdium {
    overrideUserAgent() {
      return window.navigator.userAgent
        .replaceAll(/(Ferdium|Electron)\/\S+ \([^)]+\)/g, '')
        .trim();
    }

    modifyRequestHeaders() {
      return [
        {
          headers: {
            'user-agent': window.navigator.userAgent
              .replaceAll(/(Ferdium|Electron)\/\S+ \([^)]+\)/g, '')
              .trim(),
          },
          requestFilters: {
            urls: ['*://*/*'],
          },
        },
      ];
    }

    resolveLink(link) {
      const url = parseUrl(link);
      const phone = url ? getChatPhone(url) : null;

      if (!phone) {
        return null;
      }

      const webUrl = new URL(WEB_SEND_URL);
      webUrl.searchParams.set('phone', phone);

      const text = url.searchParams.get('text');
      if (text) {
        webUrl.searchParams.set('text', text);
      }

      return webUrl.toString();
    }
  };
