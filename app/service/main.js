const fs = require('fs-extra')
const path = require('path');

const Service = require('egg').Service;

class MainService extends Service {
    async checkList(option) {
        const { ctx, app } = this;

        return true;
    }

    async generatePacFileInfo(option) {
        const { ctx, app } = this;

        const { username, customHost: url, customPort: host } = option;

        // write to file
        await fs.ensureDirSync(path.join(app.config.path, '/pacfile/'))
        await fs.writeFileSync(path.join(app.config.path, '/pacfile/', `${username}.pac`), pac_template(url, host), { encoding: 'utf8', flag: 'w+' });

        return { filename: `${username}.pac`, file: fs.createReadStream(path.join(app.config.path, '/pacfile/', `${username}.pac`)) }
    }
}

// fixme need move to helper
function pac_template(url, host) {
    return `function FindProxyForURL(url, host) { return "PROXY ${url}:${host}; DIRECT"; }`
}

module.exports = MainService;