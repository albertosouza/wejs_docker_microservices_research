import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return  Ember.RSVP.hash({
      users: this.get('store').query('user', {}),
      columns: [
        {
          propertyName: 'id',
          title: 'ID'
        },
        {
          propertyName: 'username',
          filteredBy: 'username_starts-with',
          title: 'Username'
        },
        {
          propertyName: 'displayName',
          filteredBy: 'displayName_starts-with',
          title: 'Nome'
        },
        {
          propertyName: 'email',
          filteredBy: 'email_starts-with',
          title: 'Email'
        },
        {
          propertyName: 'active',
          disableSorting: true,
          disableFiltering: true,
          title: 'Active'
        },
        {
          propertyName: 'actions',
          disableSorting: true,
          disableFiltering: true,
          title: 'Actions',
          template: 'users/list-item-actions'
        }
      ]
    });
  }
});
