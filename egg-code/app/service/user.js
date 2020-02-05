'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async login({ username }) {
    return await this.app.mysql.select('userlist', { where: { username } });
  }
  async getList() {
    return await this.app.mysql.select('userlist');
  }
  async del({ id }) {
    return await this.app.mysql.delete('userlist', { id });
  }
  async edit({ username, password, indent, id }) {
    return await this.app.mysql.update(
      'userlist',
      { username, password, indent },
      { where: { id } }
    );
  }
  async add({ username, password, indent }) {
    return await this.app.mysql.insert('userlist', { username, password, indent });
  }
}

module.exports = UserService;
