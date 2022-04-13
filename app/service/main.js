const fs = require('fs-extra')
const path = require('path');

const Service = require('egg').Service;

class MainService extends Service {
    async checkList() {
        const { ctx, app } = this;

        return true;
    }

    async generatePacFile(username, customHost, customPort) {
        const { ctx, app } = this;

        // todo fix config
        let pacDirPath = path.join(app.config.path, '/pacfile/');
        let filename = `${username}.pac`;
        let filepath = path.join(pacDirPath, filename);

        fs.ensureDirSync(pacDirPath);
        fs.writeFileSync(filepath, pac_template(customHost, customPort), { encoding: 'utf8', flag: 'w+' });

        return { filepath, filename }
    }

    async judgePacFileExist(username) {
        const { ctx, app } = this;

        let pacDirPath = path.join(app.config.path, '/pacfile/');
        let filename = `${username}.pac`;
        let filepath = path.join(pacDirPath, filename);

        return fs.existsSync(filepath);
    }

    async getPacFileProperties(username) {
        const { ctx, app } = this;

        let pacDirPath = path.join(app.config.path, '/pacfile/');
        let filename = `${username}.pac`;
        let filepath = path.join(pacDirPath, filename);

        let fileStat = null;
        let message = 'success';

        try {
            fileStat = fs.statSync(filepath);
        } catch (error) {
            message = error;
        }

        return { fileStat, message };
    }

    async getPacFileContent(username) {
        const { ctx, app } = this;

        let pacDirPath = path.join(app.config.path, '/pacfile/');
        let filename = `${username}.pac`;
        let filepath = path.join(pacDirPath, filename);

        let fileContent = null;
        let message = 'success';

        try {
            fileContent = fs.readFileSync(filepath, { encoding: 'utf8' });
        } catch (error) {
            message = error;
        }

        return { fileContent, message };
    }
}

// fixme need move to helper
function pac_template(url, host) {
    return `function FindProxyForURL(url, host) { return "PROXY ${url}:${host}; DIRECT"; }`
}

module.exports = MainService;