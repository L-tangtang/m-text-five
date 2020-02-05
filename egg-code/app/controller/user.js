'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
class HomeController extends Controller {
  async login() {
    const { ctx, app } = this;
    const { password } = ctx.request.body;
    const result = await ctx.service.user.login(ctx.request.body);
    if (result.length === 0) {
      ctx.body = app.sendMsg(0, '账号未注册');
      return;
    }
    if (result.length > 0) {
      if (result[0].password !== password) {
        ctx.body = app.sendMsg(0, '密码错误');
        return;
      }
    }
    const token = jwt.sign({ ...result[0] }, app.config.keys);
    ctx.body = app.sendMsg(1, '登陆成功', token, result);
  }
  async getList() {
    const { ctx, app } = this;
    const result = await ctx.service.user.getList();
    ctx.body = app.sendMsg(1, '获取成功', result);
  }
  async del() {
    const { ctx, app } = this;
    await ctx.service.user.del(ctx.request.body);
    ctx.body = app.sendMsg(1, '删除成功');
  }
  async edit() {
    const { ctx, app } = this;

    await ctx.service.user.edit(ctx.request.body);
    ctx.body = app.sendMsg(1, '修改成功');
  }
  async add() {
    const { ctx, app } = this;
    await ctx.service.user.add(ctx.request.body);
    ctx.body = app.sendMsg(1, '添加成功');
  }
}

module.exports = HomeController;
