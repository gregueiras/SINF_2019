
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        // eslint-disable-next-line require-atomic-updates, no-param-reassign
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token');
  }
  products() {
    return this.hasMany('App/Models/Product');
  }
  processes() {
    return this.hasMany('App/Models/Process');
  }
  processedFiles() {
    return this.hasMany('App/Models/ProcessedFile');
  }
  processTyper() {
    return this.hasMany('App/Models/ProcessType');
  }
}

module.exports = User;
