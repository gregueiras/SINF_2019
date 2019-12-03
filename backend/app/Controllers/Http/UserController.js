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
  async login({request,auth}){
    const {username, password} = request.all();
    await auth.attempt(username, password);
    return "Logged in successfully";
  }
}

module.exports = UserController
