'use strict';

const fs = require('fs-extra')

const Service = require('egg').Service;

class MainService extends Service {
    async checkList() {
        const { ctx, app } = this;

        return true;
    }

    async generatePacFile(username, customHost, customPort) {
        const { ctx, app } = this;

        const { dirPath, filenameWithExtension, fileFullpath } = ctx.helper.getFilePathInfo(username);

        fs.ensureDirSync(dirPath);
        fs.writeFileSync(fileFullpath, ctx.helper.generatePacContent(customHost, customPort), { encoding: 'utf8', flag: 'w+' });

        return { fileDirPath: dirPath, filenameWithExtension, fileFullpath }
    }

    async judgePacFileExist(username) {
        const { ctx, app } = this;

        const { dirPath, filenameWithExtension, fileFullpath } = ctx.helper.getFilePathInfo(username);

        return fs.existsSync(fileFullpath);
    }

    async getPacFileProperties(username) {
        const { ctx, app } = this;

        const { dirPath, filenameWithExtension, fileFullpath } = ctx.helper.getFilePathInfo(username);

        let fileStat = null;
        let message = 'success';

        try {
            fileStat = fs.statSync(fileFullpath);
        } catch (error) {
            message = error;
        }

        return { fileStat, message };
    }

    async getPacFileContent(username) {
        const { ctx, app } = this;

        const { dirPath, filenameWithExtension, fileFullpath } = ctx.helper.getFilePathInfo(username);

        let fileContent = null;
        let message = 'success';

        try {
            fileContent = fs.readFileSync(fileFullpath, { encoding: 'utf8' });
        } catch (error) {
            message = error;
        }

        return { fileContent, message };
    }
}

module.exports = MainService;