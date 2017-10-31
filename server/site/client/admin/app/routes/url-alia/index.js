import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    const i18n = this.get('i18n');

    return  Ember.RSVP.hash({
      records: this.get('store').query('url-alia', {}),
      columns: [
        {
          propertyName: 'id',
          title: 'ID'
        },
        {
          propertyName: 'alias',
          filteredBy: 'alias',
          title: i18n.t('form-urlAlias-alias')
        },
        {
          propertyName: 'target',
          filteredBy: 'targer',
          title: i18n.t('form-urlAlias-target')
        },
        {
          propertyName: 'createdAt',
          filteredBy: 'createdAt',
          title: i18n.t('form-urlAlias-createdAt'),
          template: 'partials/list-item-created-at'
        },
        {
          propertyName: 'actions',
          disableSorting: true,
          disableFiltering: true,
          title: i18n.t('Actions'),
          template: 'url-alia/list-item-actions'
        }
      ]
    });
  }
});
