import Ember from 'ember';
import ENV from "../config/environment";

import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  model() {
    return {
      email: ''
    };
  },
  actions: {
    requestPasswordChange() {
      const email = this.get('currentModel.email');

      if (!email) {
        console.log('email is required');
        return;
      }

      let headers = { Accept: 'application/json' };

      Ember.$.ajax({
        url: `${ENV.API_HOST}/auth/forgot-password`,
        type: 'POST',
        headers: headers,
        data: {
          email: email
        }
      })
      .done( (result)=> {
        // reset email:
        this.set('currentModel.email', '');
        // then show the result as notification:
        if (result && result.messages) {
          result.messages.forEach( (m)=> {
            if (m.status === 'success') {
              this.get('notifications').success(m.message);
            } else {
              this.get('notifications').error(m.message);
            }
          });
        } else {
          Ember.Logger.log('Unknow success response on forgot-password page');
        }
      })
      .fail( (err)=> {
        this.send('queryError', err);
      });
    }
  }
});