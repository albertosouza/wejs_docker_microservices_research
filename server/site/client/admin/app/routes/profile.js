import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from "../config/environment";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    const settings = this.get('settings');

    return Ember.RSVP.hash({
      user: settings.get('user'),
      oldPassword: null,
      newPassword: null,
      rNewPassword: null
    });
  },

  actions: {
    save(user) {
      user.save()
      .then( (r)=> {
        this.get('notifications').success('Dados do perfil salvos.');
        // success
        return r;
      })
      .catch( (err)=> {
        this.send('queryError', err);
      });
    },

    changePassword(model) {
      let headers = { Accept: 'application/vnd.api+json' },
          accessToken = this.get('settings.accessToken');

      if (accessToken) {
        headers.Authorization = `Basic ${accessToken}`;
      }

      Ember.$.ajax({
        url: ENV.API_HOST + '/auth/change-password',
        type: 'POST',
        data: {
          password: model.oldPassword,
          newPassword: model.newPassword,
          rNewPassword: model.rNewPassword
        },
        cache: false,
        headers: headers
      })
      .then( (response)=> {
        console.log('response>', response);
        this.get('notifications').success('Senha alterada com sucesso.');

        model.oldPassword = null;
        model.newPassword = null;
        model.rNewPassword = null;
        // success
        return response;
      })
      .fail( (err)=> {
        this.send('queryError', err);
      });
    }
  }
});