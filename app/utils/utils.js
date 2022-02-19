const validUrl = require('valid-url');

const validateUrl = (url) => {
  const valid = validUrl.isWebUri(url);
  if (valid) {
    return true;
  }

  return false;
}

module.exports = { validateUrl };
