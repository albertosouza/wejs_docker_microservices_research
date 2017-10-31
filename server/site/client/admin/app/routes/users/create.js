import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  notifications: Ember.inject.service('notification-messages'),

  model() {
    return Ember.RSVP.hash({
      user: {}
    });
  },
  actions: {
    create(data) {
      const i18n = this.get('i18n');

      const record = this.store.createRecord('user', data);

      record.active = true;

      record.save()
      .then( (r)=> {
        this.get('notifications').success(i18n.t('user.registered.success.msg'));

        this.transitionTo('users.item', r.id);
        // success
        return r;
      })
      .catch( (err)=> {
        this.send('queryError', err);
      });
    }
  }
});