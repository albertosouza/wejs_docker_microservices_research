/* jshint node: true */
module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'project-admin-spa',
    environment: environment,
    rootURL: '/admin/',
    imageHost: 'http://localhost:5100',
    locationType: 'hash',
    i18n: {
      // defaultLocale: 'en-us'
      defaultLocale: 'pt-br'
    },
    EmberENV: {
      EXTEND_PROTOTYPES: {
        Date: false,
      },
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    'ember-cli-notifications': {
      icons: 'bootstrap'
    },
    pace: {
      // addon-specific options to configure theme
      theme: 'flash',
      color: 'green',
      // pace-specific options
      // learn more on http://github.hubspot.com/pace/#configuration
      //           and https://github.com/HubSpot/pace/blob/master/pace.coffee#L1-L72
      catchupTime: 50,
      initialRate: 0.01,
      minTime: 100,
      ghostTime: 50,
      maxProgressPerFrame: 20,
      easeFactor: 1.25,
      startOnPageLoad: true,
      restartOnPushState: true,
      restartOnRequestAfter: 500,
      target: 'body',
      elements: {
        checkInterval: 100,
        selectors: ['body', '.ember-view']
      },
      eventLag: {
        minSamples: 10,
        sampleCount: 3,
        lagThreshold: 3
      },
      ajax: {
        trackMethods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PATCH', 'PUT'],
        // trackWebSockets: true,
        // ignoreURLs: []
      }
    }
  };
  ENV['ember-simple-auth'] = {
    identificationField: 'email',
    passwordField: 'password',
    authenticationRoute: 'login',
    routeAfterAuthentication: 'index',
    routeIfAlreadyAuthenticated: 'index',
    serverTokenEndpoint: '/auth/grant-password/authenticate',


    authorizer: 'authorizer:custom',
    store: 'simple-auth-session-store:cookie', // optional
    crossOriginWhitelist: ['http://localhost:5100']
  };


  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.API_HOST = 'http://localhost:5100';
    ENV['ember-simple-auth'].serverTokenEndpoint = ENV['API_HOST'] + ENV['ember-simple-auth'].serverTokenEndpoint;
  }
  if (environment === 'test') {
    // Testem prefers this...
    ENV.rootURL = '/';
    ENV.locationType = 'none';
    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
  }
  if (environment === 'production') {
    ENV.rootURL = '/admin';
    ENV.imageHost = '';
    ENV.API_HOST = '';
    ENV['ember-simple-auth'].serverTokenEndpoint = ENV['API_HOST'] + ENV['ember-simple-auth'].serverTokenEndpoint;
  }
  return ENV;
};