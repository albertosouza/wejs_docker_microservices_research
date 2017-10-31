import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  ajax: Ember.inject.service(),
  image: Ember.inject.service(),

  model() {
    const systemSettings = (this.get('settings').get('systemSettings') || '');

    return Ember.RSVP.hash({
      settings: systemSettings,
      themeCollor: { id: 'default', name: 'Padrão do tema'},
      themeConfigs: this.get('settings').getThemeConfigs()
    });
  },

  actions: {
    save(data) {
      let s = this.get('settings');
      const themeCollor = this.get('themeCollor');
      if (themeCollor) {
        data.themeCollor = themeCollor.id;
      } else {
        data.themeCollor = 'default';
      }

      s.setSystemSettings(data)
      .then( (result) => {
        Ember.set(s, 'systemSettings', result.settings);

        console.log('success');
        this.get('notifications').success('As configurações do sistema foram salvas.');
        this.send('scrollToTop');
      })
      .fail( (err)=> {
        this.send('queryError', err);
      });
    }
  }
});
