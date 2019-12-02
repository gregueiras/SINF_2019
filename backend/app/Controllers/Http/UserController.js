'use strict'
const User = use("App/Models/User");

class UserController {
  async index() {
    return User.all();
  }
}

module.exports = UserController
