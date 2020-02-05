'use strict';

const url = require('url');

const write = require('../../config/writeList');
module.exports = option => {
  return async (ctx, next) => {
    const oldUrl = url.parse(ctx.url).pathname;

    // 登陆接口不做权限验证
    if (write.includes(oldUrl)) {
      await next();
      return;
    }

    if (option.includes(oldUrl)) {
      const { indent } = ctx.info;
      const res = await ctx.app.mysql.select('oprlist', { where: { name: indent } });

      if (res.some(item => item.opr === oldUrl)) {
        await next();
        return;
      }
      ctx.body = ctx.app.sendMsg(0, '无权访问');
      return;
    }
    await next();
  };
};
