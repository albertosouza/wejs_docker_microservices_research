import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  term: Ember.inject.service(),
  model(params) {
    return Ember.RSVP.hash({
      record: this.get('store').findRecord('sitecontact', params.id),
    });
  }
});