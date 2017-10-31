import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  i18n: Ember.inject.service(),
  model() {
    const i18n = this.get('i18n');

    return  Ember.RSVP.hash({
      records: this.get('store').query('content', {
        showInLists: null
      }),
      columns: [
        {
          propertyName: 'id',
          title: 'ID'
        },
        {
          propertyName: 'title',
          filteredBy: 'title',
          title: i18n.t('form-content-title')
        },
        {
          propertyName: 'creator.displayName',
          disableSorting: true,
          disableFiltering: true,
          title: i18n.t('content.creator')
        },
        {
          propertyName: 'published',
          disableSorting: true,
          disableFiltering: true,
          title: i18n.t('form-content-published'),
        },
        {
          propertyName: 'createdAt',
          filteredBy: 'createdAt',
          title: i18n.t('form-content-createdAt'),
          template: 'partials/list-item-created-at'
        },
        {
          propertyName: 'actions',
          disableSorting: true,
          disableFiltering: true,
          title: i18n.t('Actions'),
          template: 'contents/list-item-actions'
        }
      ]
    });
  }
});
