'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async getRole() {
    return await this.app.mysql.select('rolelist');
  }
  async deleteRelo({ id }) {
    return await this.app.mysql.delete('rolelist', { id });
  }
  async select({ name }) {
    return await this.app.mysql.select('rolelist', { where: { name } });
  }
  async addRelo({ name }) {
    return await this.app.mysql.insert('rolelist', { name });
  }
}

module.exports = UserService;
