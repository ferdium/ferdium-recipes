const nameDescriptor = Object.getOwnPropertyDescriptor(Plugin.prototype, 'name');
const getName = nameDescriptor.get;
Object.defineProperty(Plugin.prototype, 'name', {
  ...nameDescriptor,
  get() {
    return getName.call(this).replace('Chromium', 'Chrome');
  },
});
