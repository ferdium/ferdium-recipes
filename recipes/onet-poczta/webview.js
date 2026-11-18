const path = require('path');

// Onet renders its ad units as `.onet-ad` divs with stable ids (`slot-top`,
// `slot-right`, ...), each inside a wrapper that also holds a "REKLAMA" label.
// Class names are build-generated, so the ids are the only anchor.
const hideAds = () => {
  for (const ad of document.querySelectorAll('.onet-ad, [id^="slot-"]')) {
    // Skip only what this script already hid. Checking offsetParent instead
    // would skip slots the site itself hides while their empty label wrapper
    // is still taking up space on the page.
    if (ad.closest('[data-ferdium-hidden]')) {
      continue;
    }

    // The REKLAMA label lives in a wrapper a few levels up, not in the
    // page-sized container. Stop as soon as the ancestor holds real content
    // (message list, attachments, toolbar) instead of just the label.
    let wrapper = ad;
    for (let level = 0; level < 5 && wrapper.parentElement; level += 1) {
      const parent = wrapper.parentElement;
      if (parent === document.body || parent.id === 'React_MainContainer') {
        break;
      }
      if (parent.getBoundingClientRect().height > 400) {
        break;
      }
      const rest = (parent.textContent || '')
        .replaceAll(/reklama/gi, '')
        .replaceAll(/\s+/g, '');
      if (rest.length > 60) {
        break;
      }
      wrapper = parent;
    }

    // Sidebar ads (right/left) sit in their own narrow column; hiding only the
    // ad leaves an empty column behind, so collapse that column too. Start from
    // the wrapper: the CSS above already made the slot itself 0px wide, so
    // measuring from the ad would break the climb immediately.
    let column = wrapper;
    for (let level = 0; level < 8 && column.parentElement; level += 1) {
      const own = column.getBoundingClientRect().width;
      const parent = column.parentElement.getBoundingClientRect().width;
      if (parent - own > 200) {
        break;
      }
      column = column.parentElement;
    }

    const isAdColumn =
      column !== wrapper &&
      column.getBoundingClientRect().width < 700 &&
      (column.textContent || '').replaceAll(/reklama/gi, '').trim().length <
        120;
    const target = isAdColumn ? column : wrapper;
    // Never hide a container that holds real page content; CSS already keeps
    // the ad itself invisible, so leaving its wrapper is the safe option.
    if (
      (target.textContent || '').replaceAll(/reklama/gi, '').trim().length > 120
    ) {
      continue;
    }
    target.dataset.ferdiumHidden = '1';
    target.style.display = 'none';
  }
};

module.exports = Ferdium => {
  // CSS applies to nodes inserted later as well, so ad boxes are never painted
  // even before the JS below runs.
  Ferdium.injectCSS(path.join(__dirname, 'service.css'));

  // Onet puts the unread total in the page title, e.g.
  // "(4) Odebrane - Lista Wiadomości - Poczta w Onet.pl".
  const getMessages = () => {
    const match = document.title.match(/^\((\d+)\)/);
    Ferdium.setBadge(match ? Ferdium.safeParseInt(match[1]) : 0);
  };

  Ferdium.loop(getMessages);

  // Hide ad slots once, then again whenever the page inserts new nodes. The
  // observer callback is a microtask, so the slot is hidden before it paints.
  hideAds();
  new MutationObserver(hideAds).observe(document.body, {
    childList: true,
    subtree: true,
  });
};
