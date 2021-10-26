module.exports = Ferdi => {
  const getNotifications = function getNotifications() {
    let count = 0;

    const elements = [
      document.querySelector('#requestsCountValue'),
      // document.getElementById('mercurymessagesCountValue'),
      document.querySelector('#notificationsCountValue'),
      document.querySelector(
        '.k4urcfbm.qnrpqo6b.qt6c0cv9.jxrgncrl.jb3vyjys.taijpn5t.datstx6m.pq6dq46d.ljqsnud1.bp9cbjyn',
      ),
    ];

    for (const element of elements) {
      if (element !== null) {
        count += Ferdi.safeParseInt(element.textContent);
      }
    }

    Ferdi.setBadge(count);
  };

  const getActiveDialogTitle = () => {
    const element = [
      document.querySelector(
        '.cbu4d94t:not(.kr9hpln1) .l9j0dhe7 .pfnyh3mw .g5gj957u .ni8dbmo4.stjgntxs.g0qnabr5.ltmttdrg.ekzkrbhg.mdldhsdk.oo9gr5id',
      ),
      document.querySelector(
        '.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb:not(.kr9hpln1) .rq0escxv[role="main"] .t6p9ggj4.tkr6xdv7 .d2edcug0.j83agx80.bp9cbjyn.aahdfvyu.bi6gxh9e .a8c37x1j.ni8dbmo4.stjgntxs.l9j0dhe7.ltmttdrg.g0qnabr5.ojkyduve a.lzcic4wl.gmql0nx0.gpro0wi8.lrazzd5p',
      ),
    ].find(Boolean);

    Ferdi.setDialogTitle(element ? element.textContent : null);
  };

  const loopFunc = () => {
    getNotifications();
    getActiveDialogTitle();
  };

  Ferdi.loop(loopFunc);
};
