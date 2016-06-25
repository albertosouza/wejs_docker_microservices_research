module.exports = {
  /**
   * Install function run in we.js project install.
   *
   * @param  {Object}   we    we.js object
   * @param  {Function} done  callback
   */
  install: function install (we, done) {
    we.log.info('Starting project install...');

    var fns = [];

    fns.push(function registerUser1 (done) {
      var user1 = {
        username: '',
        email: '',
        password: '', // change after install
        displayName: '',
        active: true,
        roles: ['administrator']
      };

      we.log.info('I will create the user: ', user1);

      we.db.models.user.findOrCreate({
        where: {
          email: user1.email
        },
        defaults: user1
      })
      .then(function (user) {
        we.log.info('New User with id: ', user.id);

        if (!we.db.models.password) return done();

        // set the password
        we.db.models.password.create({
          userId: user.id,
          password: user1.password,
          confirmPassword: user1.password
        }).then(function () {
          return done();
        }).catch(done);
      });
    });



    we.utils.async.series(fns, done);
  }
};
