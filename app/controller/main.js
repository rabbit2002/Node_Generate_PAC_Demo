'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async generatePacFile() {
    const { ctx, app } = this;

    try {
      ctx.validate({
        username: { type: 'string', required: true, },
        customHost: { type: 'string', required: false, },
        // todo
        customPort: { type: 'string', required: false, min: 0, max: 65535, },
      }, ctx.request.body);
    } catch (error) {
      ctx.body = { code: 403, success: false, result: error, };
      return;
    }

    // todo move to config
    const { username, customHost = ctx.request.ip, customPort = 9999 } = ctx.request.body;

    // todo
    let checkResult = await ctx.service.main.checkList();

    let { fileDirPath, filenameWithExtension, fileFullpath } = await ctx.service.main.generatePacFile(username, customHost, customPort);

    return ctx.body = { code: 200, success: true, result: { fileDirPath, filenameWithExtension, fileFullpath, }, }


  }

  async downloacPacFile() {
    const { ctx, app } = this;

    try {
      ctx.validate({
        username: { type: 'string', required: true, },
      }, ctx.request.query);
    } catch (error) {
      ctx.body = { code: 403, success: false, result: error, };
      return;
    }

    const { username } = ctx.request.query;

    let fileExist = await ctx.service.main.judgePacFileExist(username);
    if (!fileExist) {
      return ctx.body = { code: 200, success: false, result: 'file not exist, check input username', }
    }

    const { dirPath, filenameWithExtension, fileFullpath } = ctx.helper.getFilePathInfo(username);
    let { fileContent, message } = await ctx.service.main.getPacFileContent(username);

    ctx.set('content-Type', 'application/octet-stream');
    ctx.set('content-Disposition', `attachment;filename=${filenameWithExtension}`)
    ctx.body = fileContent;
  }

  async getPacFileInfo() {
    const { ctx, app } = this;

    try {
      ctx.validate({
        username: { type: 'string', required: true, },
      }, ctx.request.query);
    } catch (error) {
      ctx.body = { code: 403, success: false, result: error, };
      return;
    }

    const { username } = ctx.request.query;

    let fileExist = await ctx.service.main.judgePacFileExist(username);
    if (!fileExist) {
      return ctx.body = { code: 200, success: false, result: 'file not exist, check input username', }
    }

    let { fileStat, message: statErrMessage } = await ctx.service.main.getPacFileProperties(username);
    let { fileContent, message: contentErrmessage } = await ctx.service.main.getPacFileContent(username);

    return ctx.body = { code: 200, success: true, result: { fileStat, fileContent, }, }
  }

}

module.exports = MainController;
