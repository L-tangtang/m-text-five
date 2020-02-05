'use strict';

const Controller = require('egg').Controller;
class RoleController extends Controller {
  async getRole() {
    const { ctx, app } = this;
    const result = await ctx.service.role.getRole();
    ctx.body = app.sendMsg(1, '获取成功', result);
  }
  async deleteRelo() {
    const { ctx, app } = this;
    await ctx.service.role.deleteRelo(ctx.request.body);
    ctx.body = app.sendMsg(1, '删除成功');
  }
  async addRelo() {
    const { ctx, app } = this;
    const result = await ctx.service.role.select(ctx.request.body);
    if (result.length > 0) {
      ctx.body = app.sendMsg(0, '添加失败，该身份已存在');
      return;
    }
    await ctx.service.role.addRelo(ctx.request.body);
    ctx.body = app.sendMsg(1, '添加成功');
  }
}

module.exports = RoleController;
