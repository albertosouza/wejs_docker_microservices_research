import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    const i18n = this.get('i18n');

    return  Ember.RSVP.hash({
      records: this.get('store').query('menu', {}),
      columns: [
        {
          propertyName: 'id',
          title: 'ID'
        },
        {
          propertyName: 'name',
          filteredBy: 'name_starts-with',
          title: i18n.t('form-menu-name')
        },
        {
          propertyName: 'createdAt',
          filteredBy: 'createdAt',
          title: i18n.t('form-menu-createdAt'),
          template: 'partials/list-item-created-at'
        },
        {
          propertyName: 'actions',
          disableSorting: true,
          disableFiltering: true,
          title: i18n.t('Actions'),
          template: 'menus/list-item-actions'
        }
      ]
    });
  }
});
