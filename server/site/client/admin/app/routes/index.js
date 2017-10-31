import Ember from 'ember';
import ENV from "../config/environment";

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  ajax: Ember.inject.service(),

  model() {

    return Ember.RSVP.hash({
      contentCount: this.get('ajax')
        .request(`${ENV.API_HOST}/content/count`)
        .then((json) => json.count ),
      unPublishedContents: this.get('store').query('content', {
        published: false
      }),
      newUsers: this.get('ajax')
        .request(`${ENV.API_HOST}/user?limit=10`)
        .then((json) => json ),
    });
  }
});