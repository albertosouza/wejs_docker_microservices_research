export function initialize(instance) {

  // const applicationRoute = instance.lookup('route:application');
  const session          = instance.lookup('service:session');
  // const settings         = instance.lookup('service:settings');

  session.on('authenticationSucceeded', function() {
    window.location.reload();
    // TODO! add suport for dinamicaly set context
    // // get user settings ,,,
    // settings.getUserSettings()
    // .then( ()=> {
    //   applicationRoute.transitionTo('index');
    // });
  });
  session.on('invalidationSucceeded', function() {
    window.location.reload();
  });
}

export default {
  initialize,
  name:  'session-events',
  after: 'ember-simple-auth'
};