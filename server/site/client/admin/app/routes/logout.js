import Ember from 'ember';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  afterModel: function() {
    this.get('session').invalidate();

    document.cookie = 'wejs.sid=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
});