// var path = require('path');
module.exports = {
  appName: 'We.js example',
  subtitle: 'We.js docker example',

  // default favicon, change in your project config/local.js
  // favicon: path.resolve(__dirname, '..', 'files/public/favicon.png'),
  // logo public url path
  appLogo: '/public/project/logo.jpg',

  site: {
    homeBg :'/public/project/home-bg.jpg'
  },

  fileHostname: '',
  fileImageHostname: '',
  acl: {
    disabled: false
  },

  enableRequestLog: false,


  security: {
    // see https://github.com/expressjs/cors#configuration-options for  all CORS configuration options
    // This may be override by every route configs
    CORS: {
      // allow CORS requests by default
      origin: function(origin, cb){ cb(null, true) },
      // default methods
      methods: ['GET', 'OPTIONS', 'POST', 'PATCH', 'UPDATE'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'Access-Control-Allow-Credentials'
      ],

      credentials: true
    }
  },
  upload: {
    // defaultImageStorage: null,
    // defaultFileStorage: null,
    image: {
      avaibleStyles: [
        'thumbnail',
        'medium',
        'large',
        'banner',
        'bannerbig' ,
        'eventBanner'
      ],
      styles: {
        thumbnail: { width: '75', heigth: '75' },
        medium: { width: '250', heigth: '250' },
        large: { width: '640', heigth: '400' },
        banner: { width: '900', heigth: '300' },
        bannerbig: { width: '1920', heigth: '1080' },
        eventBanner: { width: '1920', heigth: '250' }
      }
    }
  },

  latestCommentLimit: 4,// limit for preloaded comments
  comments: {
    models:  {
      // enable comments in models:
      post: true,
      content: true,
      article: true,
      cfnews: true
    }
  }
};