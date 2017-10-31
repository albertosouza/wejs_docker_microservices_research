module.exports = {
  /**
   * Install function run in we.js project install.
   *
   * @param  {Object}   we    we.js object
   * @param  {Function} done  callback
   */
  install(we, done) {
    we.log.info('Starting project install...');

    const fns = [];
    let u;

    fns.push(function registerUser1(done) {
      const user1 = {
        username: 'admin',
        email: 'alberto.souza.99@gmail.com',
        password: '123', // change after install
        displayName: 'Administrator',
        active: true,
        roles: ['administrator']
      };

      we.log.info('I will create the user: ', user1);

      we.db.models.user.findOrCreate({
        where: { email: user1.email },
        defaults: user1
      })
      .spread( (user)=> {
        u = user;
        we.log.info('New User with id: ', user.id);
        // install we-plugin-auth for use password
        if (!we.db.models.password) {
          done();
          return null;
        }
        // set the password
        return we.db.models.password.create({
          userId: user.id,
          password: user1.password,
          confirmPassword: user1.password
        })
        .then( ()=> {
          done();
          return null;
        });
      })
      .catch(done);
    });

    fns.push(function registerUser2(done) {
      const user1 = {
        username: 'alberto',
        email: 'contato@albertosouza.net',
        password: '123', // change after install
        displayName: 'Alberto',
        active: true,
        roles: []
      };

      we.log.info('I will create the user: ', user1);

      we.db.models.user.findOrCreate({
        where: { email: user1.email },
        defaults: user1
      })
      .spread( (user)=> {
        we.log.info('New User with id: ', user.id);
        // install we-plugin-auth for use password
        if (!we.db.models.password) {
          done();
          return null;
        }
        // set the password
        return we.db.models.password.create({
          userId: user.id,
          password: user1.password,
          confirmPassword: user1.password
        })
        .then( ()=> {
          done();
          return null;
        });
      })
      .catch(done);
    });

    fns.push(function registerHomeSlideshow(done) {
      const data = {
        name: 'Home slideshow',
        creatorId: u.id
      };

      we.db.models.slideshow.create(data)
      .then( ()=> {
        done();
        return null;
      })
      .catch(done);
    });

    fns.push(function createDefaultMenus(done) {
      we.utils.async.series([
        function createMainMenu(done) {
          we.db.models.menu.create({
            name: 'main',
            class: ''
          })
          .then(function (r){
            we.log.info('New menu with name: '+r.name+' and id: '+r.id);
            // then create menu links
            we.db.models.link.bulkCreate([
              {
                href: '/sobre',
                text: 'Sobre',
                title: 'Sobre o projeto',
                menuId: r.id
              },
              {
                href: '/site-contact',
                text: 'Contato',
                title: 'Entre em contato',
                menuId: r.id
              }
            ])
            .then( ()=> {
              done();
              return null;
            })
            .catch(done);

            return null;
          })
          .catch(done);
        },
        function createSocialMenu(done) {
          we.db.models.menu.create({
            name: 'social',
            class: ''
          })
          .then( (r)=> {
            we.log.info('New menu with name: '+r.name+' and id: '+r.id);
            done();
            return null;
          })
          .catch(done);
        }
      ], done);
    });

    fns.push(function createFirstTerms(done) {
      we.db.models.term
      .bulkCreate([{
        text: 'Notícias',
        description: 'Notícias publicas pela organização.',
        vocabularyName: 'Category'
      }, {
        text: 'Página',
        description: 'Páginas simples sem comentários.',
        vocabularyName: 'Category'
      }])
      .spread( ()=> {
        we.log.info('First category terms created');
        done();
        return null
      }).catch(done);
    });

    fns.push(function createTermAlias(done) {
      we.db.models['url-alia']
      .bulkCreate([{
        alias: '/eventos',
        target: '/hotel-event',
        locale: 'pt-BR'
      },
      {
        alias: '/noticias',
        target: '/vocabulary/Category/term/Notícias',
        locale: 'pt-BR'
      },
      {
        alias: '/quem-somos',
        target: '/content/1',
        locale: 'pt-BR'
      }])
      .spread( ()=> {
        we.log.info('First url alias created');
        done();
        return null
      })
      .catch(done);
    });

    fns.push(function createFirstPages(done) {
      we.db.models.content
      .create({
        artive: true,
        published: true,
        showInLists: true,
        title: 'Quem somos',
        about: 'Página com as informações sobre a organização',
        body: 'Digite o texto sobre a organização aqui ...',
        publishedAt: new Date(),
        allowComments: false,
        category: 'Página'
      })
      .then( ()=> {
        we.log.info('First contents created');
        done();
        return null
      })
      .catch(done);
    });

    fns.push(function createFirstSettings(done) {
      we.db.models['system-setting']
      .bulkCreate([{
        key: 'siteName',
        value: 'We.js example',
      }, {
        key: 'siteDescription',
        value: `Example project.`,
      },
      // {
      //   key: 'googleMapsKey',
      //   value: 'TODO!',
      // },
      {
        key: 'emailContact',
        value: `nao-responda <todo@example.com>`,
      }])
      .spread( ()=> {
        we.log.info('First system-setting created');
        done();
        return null
      })
      .catch(done);
    });

    we.utils.async.series(fns, done);
  }
};
