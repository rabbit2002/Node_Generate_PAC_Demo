'use strict';

const path = require('path');

module.exports = {
  generatePacContent(url, host) {
    return `function FindProxyForURL(url, host) { return "PROXY ${url}:${host}; DIRECT"; }`;
  },

  getFilePathInfo(filename) {
    const { app } = this;

    const dirPath = app.config.pacFileDir;
    const filenameWithExtension = this.getPacFileName(filename);
    const fileFullpath = path.join(dirPath, filenameWithExtension);

    return { dirPath, filenameWithExtension, fileFullpath };
  },

  getPacFileName(filename) {
    return `${filename}.pac`;
  },
};
