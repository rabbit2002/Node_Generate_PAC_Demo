'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async generatePacFile() {
    const { ctx, app } = this;

    try {
      ctx.validate({
        username: { type: 'string', required: true },
        customHost: { type: 'string', required: false },
        // todo
        customPort: { type: 'string', required: false, min: 0, max: 65535 },
      }, ctx.request.body);
    } catch (error) {
      ctx.body = { code: 403, success: false, result: error };
      return;
    }

    // host: param > config > req's ip / port: param > config
    const { username, customHost = app.config.proxyDefaultHost || ctx.request.ip, customPort = app.config.proxyDefaultPort } = ctx.request.body;

    const { fileDirPath, filenameWithExtension, fileFullpath } = await ctx.service.main.generatePacFile(username, customHost, customPort);

    return ctx.body = { code: 200, success: true, result: { fileDirPath, filenameWithExtension, fileFullpath } };
  }

  async downloacPacFile() {
    const { ctx } = this;

    try {
      ctx.validate({
        username: { type: 'string', required: true },
      }, ctx.request.query);
    } catch (error) {
      ctx.body = { code: 403, success: false, result: error };
      return;
    }

    const { username } = ctx.request.query;

    const fileExist = await ctx.service.main.judgePacFileExist(username);
    if (!fileExist) {
      return ctx.body = { code: 200, success: false, result: 'file not exist, check input username' };
    }

    const { filenameWithExtension } = ctx.helper.getFilePathInfo(username);
    const { fileContent } = await ctx.service.main.getPacFileContent(username);

    ctx.set('content-Type', 'application/octet-stream');
    ctx.set('content-Disposition', `attachment;filename=${filenameWithExtension}`);
    ctx.body = fileContent;
  }

  async getPacFileInfo() {
    const { ctx } = this;

    try {
      ctx.validate({
        username: { type: 'string', required: true },
      }, ctx.request.query);
    } catch (error) {
      ctx.body = { code: 403, success: false, result: error };
      return;
    }

    const { username } = ctx.request.query;

    const fileExist = await ctx.service.main.judgePacFileExist(username);
    if (!fileExist) {
      return ctx.body = { code: 200, success: false, result: 'file not exist, check input username' };
    }

    const { fileStat } = await ctx.service.main.getPacFileProperties(username);
    const { fileContent } = await ctx.service.main.getPacFileContent(username);

    return ctx.body = { code: 200, success: true, result: { fileStat, fileContent } };
  }

}

module.exports = MainController;
