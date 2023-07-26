function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

/**
 * Help Scout integration plugin for Ferdium
 *
 * @summary     Integrates Help Scout into the Ferdium application
 * @since       1.2.0
 */

/**
 * Scripts specific to ticket pages
 *
 * @since       1.2.0
 */
const ticketScripts = {
  init() {
    this.processCopy();
  },
  /**
   * Handles clicking the copy link
   *
   * @since       1.2.0
   * @return      {void}
   */
  processCopy() {
    $('#copyLink').on('click', function (e) {
      e.preventDefault();

      copyToClipboard();

      $('.link-copied').fadeIn('fast').css('display', 'block');
    });

    $('#closeLink').on('click', function (e) {
      e.preventDefault();

      $('.link-copied').fadeOut('fast', function () {
        $(this).css('display', 'none');
      });
    });
  },
};

/**
 * The core Ferdium message handler
 *
 * @since       1.0.0
 */
module.exports = Ferdium => {
  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));

  /**
   * Get messages for the Ferdium loop
   *
   * @since       1.0.0
   * @return      {void}
   */
  function getMessages() {
    let mine = '';
    let unassigned = '';
    let total = '0';

    /**
     * Since Help Scout loads things asyncronously,
     * we have to trigger everything in the loop for
     * it to get recognized.
     */
    addCopyLink();
    ticketScripts.init();

    if (
      $('.dropdown.mailboxes').length > 0 &&
      $('.dropdown.mailboxes a').hasClass('active')
    ) {
      // Individual tickets
      mine = $('li.mine a .badge').text();
      unassigned = $('li.unassigned a .badge').text();
    } else if (
      window.location.href === 'https://secure.helpscout.net/dashboard/'
    ) {
      // Main dashboard
      mine = 0;
      unassigned = 0;

      $('.card.mailbox .c-list').each(function () {
        const m = $(this).find('a:nth-child(2)').find('.count').text();
        const u = $(this).find('a:first-child').find('.count').text();

        if ($.isNumeric(m)) {
          mine += Number.parseInt(m);
        }

        if ($.isNumeric(u)) {
          unassigned += Number.parseInt(u);
        }
      });

      mine = mine.toString();
      unassigned = unassigned.toString();
    }

    if (mine !== '') {
      total = mine;
    }

    if (unassigned !== '') {
      total = `${total}/${unassigned}`;
    }

    Ferdium.setBadge(total);
  }

  Ferdium.loop(getMessages);
};

/**
 * Add copy link to the conversation toolbar
 *
 * @since       1.2.0
 * @return      {void}
 */
function addCopyLink() {
  if ($('.convo-toolbar').length > 0 && $('#copyLink').length === 0) {
    $('#actions-dd .more').append(
      '<li class="actions-dd"><a id="copyLink" class="actions-dd">Copy Link</a></li>',
    );
    $('.c-convo-toolbar').after(
      '<div class="link-copied" style="display: none">Ticket URL copied to clipboard!<a id="closeLink">x</a></div>',
    );
  }
}

/**
 * Process copying URLs to clipboard
 *
 * @since       1.1.
 * @return      {void}
 */
function copyToClipboard() {
  const targetId = '_hiddenURLField';
  let target = document.querySelector(targetId);

  if (!target) {
    target = document.createElement('textarea');
    target.style.position = 'absolute';
    target.style.left = '-9999px';
    target.style.top = '0';
    target.id = targetId;
    document.body.append(target);
  }

  target.textContent = window.location.href;

  const currentFocus = document.activeElement;

  target.focus();
  target.setSelectionRange(0, target.value.length);

  document.execCommand('copy');

  if (currentFocus && typeof currentFocus.focus === 'function') {
    currentFocus.focus();
  }
}
