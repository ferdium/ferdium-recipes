const titleRegex = /^\((\d+)\)/;

const getJson = async relativeUri => {
  const req = await window.fetch(`${window.origin}${relativeUri}`, {
    Accept: 'application/json',
  });
  return req.json();
};

const getInstanceConfig = async () => {
  const staticConfig = await getJson('/static/config.json');
  try {
    const frontendConfig = await getJson(
      '/api/pleroma/frontend_configurations',
    );
    const pleromaFeConfig = frontendConfig.pleroma_fe || {};
    return { ...staticConfig, ...pleromaFeConfig };
  } catch (error) {
    console.log('Failed to load dynamic frontend configuration', error);
    return staticConfig;
  }
};

const getInstanceLogo = async () => {
  const config = await getInstanceConfig();
  if (!config.logo) {
    throw new Error('Instance has no logo');
  }
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.addEventListener('load', () => {
      resolve({
        logo: img,
        logoMask: config.logoMask,
      });
    });
    img.addEventListener('error', event => {
      reject(
        new Error(
          `${event.type} error loading ${config.logo}: ${event.message}`,
        ),
      );
    });
    img.src = `${origin}${config.logo}`;
  });
};

const getPropertyValue = (style, property) => {
  const value = style.getPropertyValue(property) || '';
  return value.trim();
};

const R = 0;
const G = 1;
const B = 2;
const A = 3;
const SCALE = 255;

const clamp = b => Math.min(Math.max(Math.round(b), 0), SCALE);
const scalePixel = b => clamp(b * SCALE);
const unscalePixel = b => b / SCALE;
const blend = (bgValue, bgWeight, fgValue, fgWeight) => {
  const sum = bgValue * bgWeight + fgValue * fgWeight;
  return clamp(sum / (bgWeight + fgWeight));
};

class LogoUpdater {
  constructor(img, mask) {
    this._img = img;
    this._mask = mask;
    this._size = Math.max(img.width, img.height);
    this._canvas = document.createElement('canvas');
    this._canvas.width = this._size;
    this._canvas.height = this._size;
    this._ctx = this._canvas.getContext('2d');
    this._dx = Math.floor((this._size - img.width) / 2);
    this._dy = Math.floor((this._size - img.height) / 2);
    this._previousBg = '';
    this._previousFg = '';
  }

  update() {
    const style = window.getComputedStyle(document.body);
    const bg = getPropertyValue(style, '--topBar');
    if (this._mask) {
      const fg = getPropertyValue(style, '--topBarText');
      if (this._previousBg !== bg || this._previousFg !== fg) {
        this._updateMask(bg, fg);
        this._previousBg = bg;
        this._previousFg = fg;
        return true;
      }
    } else if (this._previousBg !== bg) {
      this._updateNoMask(bg);
      this._previousBg = bg;
      return true;
    }
    return false;
  }

  toDataURL() {
    return this._canvas.toDataURL();
  }

  _updateNoMask(bg) {
    this._ctx.fillStyle = bg;
    this._ctx.fillRect(0, 0, this._size, this._size);
    this._drawImage();
  }

  _updateMask(bg, fg) {
    const bgColor = this._getColorData(bg);
    const fgColor = this._getColorData(fg);
    const bgAlpha = unscalePixel(bgColor[A]);
    const fgAlpha = unscalePixel(fgColor[A]);
    this._ctx.clearRect(0, 0, this._size, this._size);
    this._drawImage();
    const data = this._ctx.getImageData(0, 0, this._size, this._size);
    const arr = data.data;
    const length = data.width * data.height * 4;
    for (let i = 0; i < length; i += 4) {
      const logoAlpha = unscalePixel(arr[i + A]);
      const fgWeight = logoAlpha * fgAlpha;
      const bgWeight = bgAlpha * (1 - fgWeight);
      arr[i + R] = blend(bgColor[R], bgWeight, fgColor[R], fgWeight);
      arr[i + G] = blend(bgColor[G], bgWeight, fgColor[G], fgWeight);
      arr[i + B] = blend(bgColor[B], bgWeight, fgColor[B], fgWeight);
      arr[i + A] = scalePixel(bgWeight + fgWeight);
    }
    this._ctx.putImageData(data, 0, 0);
  }

  _getColorData(str) {
    this._ctx.fillStyle = str;
    this._ctx.fillRect(0, 0, 1, 1);
    return this._ctx.getImageData(0, 0, 1, 1).data;
  }

  _drawImage() {
    this._ctx.drawImage(this._img, this._dx, this._dy);
  }
}

module.exports = Ferdium => {
  const getMessages = () => {
    let directCount = 0;
    const matchArr = document.title.match(titleRegex);
    if (matchArr) {
      directCount = Ferdium.safeParseInt(matchArr[1]);
    }
    Ferdium.setBadge(directCount);
  };

  getInstanceLogo().then(
    ({ logo, logoMask }) => {
      const updater = new LogoUpdater(logo, logoMask);
      Ferdium.loop(() => {
        getMessages();
        if (updater.update()) {
          Ferdium.setAvatarImage(updater.toDataURL());
        }
      });
    },
    error => {
      console.log('Failed to load instance logo', error);
      Ferdium.loop(getMessages);
    },
  );
};
