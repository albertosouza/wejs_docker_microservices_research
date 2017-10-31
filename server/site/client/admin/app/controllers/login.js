import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session')
      .authenticate('authenticator:custom', identification, password)
      .then( (r)=> {
        this.set('session.needsReload', true);
        return r;
      })
      .catch( (reason)=> {
        // console.log('reason', reason);
        this.get('notifications').error(reason.messages[0].message);
        // this.set('errorMessage', reason.error || reason);
      });
    }
  }
});