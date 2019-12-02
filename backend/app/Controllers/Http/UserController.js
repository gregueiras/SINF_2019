'use strict'
const User = use("App/Models/User");

class UserController {
  async index() {
    return User.all();
  }

  async get({ request }) {
    const { params } = request;
    const { id } = params;
    console.log(id)
    return User.find(id);
  }
}

module.exports = UserController
