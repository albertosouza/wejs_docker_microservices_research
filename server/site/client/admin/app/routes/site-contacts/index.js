import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  i18n: Ember.inject.service(),
  model() {
    const i18n = this.get('i18n');

    return  Ember.RSVP.hash({
      records: this.get('store').query('sitecontact', {}),
      columns: [
        {
          propertyName: 'id',
          title: 'ID'
        },
        {
          propertyName: 'name',
          filteredBy: 'name',
          title: "Nome"
        },
        {
          propertyName: 'email',
          filteredBy: 'email',
          title: "Email"
        },

        {
          propertyName: 'createdAt',
          filteredBy: 'createdAt',
          title: 'Enviado em',
          template: 'partials/list-item-created-at'
        },
        {
          propertyName: 'actions',
          disableSorting: true,
          disableFiltering: true,
          title: i18n.t('Actions'),
          template: 'site-contacts/list-item-actions'
        }
      ]
    });
  }
});
