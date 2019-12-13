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
  async register({ request, auth, response }) {
    let body = request.post();
    let { username, email, password, repeatPassword } = body.data;
    console.log("repeat password " + password + " " + repeatPassword);
    try {
      let user = await User.create({ username, email, password });

      //generate token for user;
      let token = await auth.generate(user)
      Object.assign(user, token)
      return response.json({ message: 'Success' })
    } catch (e) {
      console.log(e)
      return response.json({ message: 'Success' })

    }
  }

  async login({ request, auth, response }) {
    let body = request.post();

    let { username, password } = body.data;

    try {
      if (await auth.attempt(username, password)) {
        let user = await User.findBy('username', username)

        let token = await auth.generate(user)
        console.log("user " + username);

        Object.assign(user, token)
        return response.json({ message: 'Success' })
      }
    }
    catch (e) {
      console.log(e)
      return response.json({ message: 'Success' })
    }
  }
}

module.exports = UserController
