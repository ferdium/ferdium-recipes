const INCREMENTAL_HOST_CHANNEL = 'aihub-incremental-messages';

function emitIncrementalResult(Ferdium, payload, logPrefix) {
  if (!Ferdium?.ipcRenderer?.sendToHost) {
    console.warn(`${logPrefix} sendToHost unavailable for incremental payload`);
    return false;
  }

  Ferdium.ipcRenderer.sendToHost(INCREMENTAL_HOST_CHANNEL, payload);
  return true;
}

module.exports = {
  INCREMENTAL_HOST_CHANNEL,
  emitIncrementalResult,
};
