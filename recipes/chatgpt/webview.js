module.exports = Ferdium => {
  Ferdium.handleDarkMode(isEnabled => {
    if (isEnabled) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
};
