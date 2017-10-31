/**
 * We.js plugin file, use to load routes and configs
 *
 * @param  {String} projectPath current project path
 * @param  {Object} Plugin      we.js Plugin class
 * @return {Object}             intance of we.js Plugin class
 */

const path = require('path');

module.exports = function loadPlugin(projectPath, Plugin) {
  const plugin = new Plugin(__dirname);
console.log('r');
  plugin.setConfigs({
    perissions: {
      'access_contents_unpublished': {
        'title': 'Access unpublished contents'
      }
    }
  });

  plugin.setRoutes({
    'get /': {
      'controller': 'main',
      'action': 'index',
      'template': 'home/index',
      titleHandler(req, res, next) {
        res.locals.title = '';
        return next();
      }
    },
    'get /system-settings': {
      'controller': 'system-setting',
      'model': 'system-setting',
      'action': 'get',
      'responseType': 'json'
    },
    'post /system-settings': {
      'controller': 'system-setting',
      'model': 'system-setting',
      'action': 'set',
      'responseType': 'json'
    },
    'get /theme': {
      controller: 'theme',
      action: 'getAllThemes',
      responseType: 'json'
    }
  });

  // resrouces:
  plugin.setResource({
    name: 'content',
    findAll: {
      search: {
        published: {
          parser: 'equalBoolean',
          target: {
            type: 'field',
            field: 'published'
          }
        }
      }
    },
    findOne: {
      metatagHandler: 'contentFindOne'
    }
  });

  plugin.setResource({ name: 'slide' });
  plugin.setResource({ name: 'slideshow' });

  plugin.events.on('we:after:load:plugins', function (we) {
    if (we.router.metatag) {
      we.router.metatag.add('conentFindOne', function metatagContentFindOne(req, res, next) {
        if (!res.locals.data) return next();

        const hostname = we.config.hostname;

        res.locals.metatag +=
          '<meta property="og:url" content="'+hostname+req.urlBeforeAlias+'" />'+
          '<meta property="og:title" content="'+res.locals.title+'" />' +
          '<meta property="og:site_name" content="'+res.locals.appName+'" />'+
          '<meta property="og:type" content="profile" />';

          if (res.locals.data.about) {
            const description = we.utils.string(res.locals.data.about).stripTags().truncate(200).s;
            res.locals.metatag += '<meta property="og:description" content="'+
              description+
            '" />';
            res.locals.metatag += '<meta content="'+description+'" name="description">';
          }

          if (res.locals.data.featuredImage && res.locals.data.featuredImage[0]) {
            let img = res.locals.data.featuredImage[0];

            res.locals.metatag +=
              '<meta property="og:image" content="'+img.urls.large+'" />'+
              '<meta property="og:image:type" content="'+img.mime+'" />'+
              '<meta property="og:image:width" content="'+we.config.upload.image.styles.large.width+'" />'+
              '<meta property="og:image:height" content="'+we.config.upload.image.styles.large.height+'" />';
          }

          if (res.locals.data.tags && res.locals.data.tags.length) {
            res.locals.metatag +=
              '<meta name="keywords" content="'+res.locals.data.tags.join(',')+'" />';
          }

        next();
      });
    }
  });

  plugin.hooks.on('we:after:routes:bind', function(we, done) {
    // preload all system settings salved in db before the bootstrap:
    we.db.models['system-setting'].findAll()
    .then( (r)=> {
      we.systemSettings = {};

      if (r) {
        r.forEach( (setting)=> {
          we.systemSettings[setting.key] = setting.value;
        });
      }
      done();
      return null;
    })
    .catch(done);

    return null;
  });


  plugin.hooks.on('we-plugin-user-settings:getCurrentUserSettings', (ctx, done)=> {
    // ctx = {req: req,res: res,data: data}
    plugin.we.db.models['system-setting'].findAll()
    .then( (r)=> {
      ctx.data.systemSettings = {};

      if (r) {
        r.forEach( (setting)=> {
          ctx.data.systemSettings[setting.key] = setting.value;
        });
      }

      done();
      return null;
    })
    .catch(done);
  });

  plugin.events.on('we:after:load:express', (we)=> {

    if (we.env == 'dev') {
      // Allows cross domain Credentials in ajax
      we.express.use((req, res, next)=>{
        res.set('Access-Control-Allow-Credentials', 'true');
        next();
      });
    }

    const adminFiles = path.join( __dirname, 'client', 'admin', 'prod');

    we.express.use('/admin', we.utils.express.static(adminFiles));
  });

  return plugin;
};