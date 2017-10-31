import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  ajax: Ember.inject.service(),
  image: Ember.inject.service(),

  model() {
    const systemSettings = (this.get('settings').get('systemSettings') || '');

    return Ember.RSVP.hash({
      settings: systemSettings
    });
  },

  actions: {
    save(data) {
      let s = this.get('settings');

      s.setSystemSettings(data)
      .then( (result) => {
        Ember.set(s, 'systemSettings', result.settings);

        this.get('notifications').success('As configurações de integração do sistema foram salvas.');
        this.send('scrollToTop');
      })
      .fail( (err)=> {
        this.send('queryError', err);
      });
    }
  }
});
