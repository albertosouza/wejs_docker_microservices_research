import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

Ember.Controller.reopen({
  notifications: Ember.inject.service('notification-messages'),
  settings: Ember.inject.service('settings'),
  session: Ember.inject.service('session'),
  i18n: Ember.inject.service()
});

Ember.Route.reopen({
  notifications: Ember.inject.service('notification-messages'),
  settings: Ember.inject.service('settings'),
  i18n: Ember.inject.service(),
  activate: function() {
    this._super.apply(this, arguments);
    window.scrollTo(0,0);
  },
  // pace loading on route change:
  activatePace: Ember.on('activate', function(){
    return window.Pace.restart();
  }),
  deactivatePace: Ember.on('deactivate', function() {
    return window.Pace.stop();
  })
});

// settup ember ajax for this project session store
if (config.environment === 'development') {
  Ember.$.ajaxSetup({
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    }
  });
} else {
  Ember.$.ajaxSetup({
    xhrFields: {
      withCredentials: true
    }
  });
}



export default App;
