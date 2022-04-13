'use strict';

const path = require('path');

module.exports = {
    foo(param) {
        // this 是 helper 对象，在其中可以调用其他 helper 方法
        // this.ctx => context 对象
        // this.app => application 对象
    },

    generatePacContent(url, host) {
        const { ctx, app } = this;

        return `function FindProxyForURL(url, host) { return "PROXY ${url}:${host}; DIRECT"; }`
    },

    getFilePathInfo(filename) {
        const { ctx, app } = this;

        let dirPath = app.config.pacFileDir;
        let filenameWithExtension = this.getPacFileName(filename);
        let fileFullpath = path.join(dirPath, filename);

        return { dirPath, filenameWithExtension, fileFullpath }
    },

    getPacFileName(filename) {
        return `${filename}.pac`;
    }
};