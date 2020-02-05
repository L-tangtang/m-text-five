'use strict';

const url = require('url');
const jwt = require('jsonwebtoken');

function veriftType(token, key) {
  return new Promise(res => {
    jwt.verify(token, key, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      res(results);
    });
  });
}

module.exports = option => {
  return async (ctx, next) => {
    if (option.includes(url.parse(ctx.url).pathname)) {
      await next();
      return;
    }
    // 获取token
    const token = ctx.get('authorToken');
    // 没有token
    if (!token) {
      ctx.body = ctx.app.sendMsg(0, '无权限 请登录');
      return;
    }
    // 有token
    let info;
    try {
      info = await veriftType(token, ctx.app.config.keys);
    } catch (error) {
      ctx.body = ctx.app.sendMsg(0, '权限失效 请重新登陆');
    }
    ctx.info = info;
    await next();
  };
};
