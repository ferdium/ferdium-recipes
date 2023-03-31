module.exports = Ferdium => {
  Ferdium.handleDarkMode(isEnabled => {
    localStorage.setItem('theme', isEnabled ? 'dark' : 'light' );
  });
};
