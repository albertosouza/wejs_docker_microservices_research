import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  term: Ember.inject.service(),
  model() {
    const vocabulary = this.modelFor('vocabulary.item').record;
    const i18n = this.get('i18n');

    return  Ember.RSVP.hash({
      vocabulary: vocabulary,
      records: this.get('store').query('term', {
        vocabularyName: Ember.get(vocabulary,'name')
      }),
      columns: [
        {
          propertyName: 'id',
          title: 'ID'
        },
        {
          propertyName: 'text',
          filteredBy: 'text_starts-with',
          title: i18n.t('form-term-text')
        },
        {
          propertyName: 'createdAt',
          filteredBy: 'createdAt',
          title: i18n.t('form-term-createdAt'),
          template: 'partials/list-item-created-at'
        },
        {
          propertyName: 'actions',
          disableSorting: true,
          disableFiltering: true,
          title:  i18n.t('Actions'),
          template: 'vocabulary/item/terms/list-item-actions'
        }
      ]
    });
  },
  actions: {
    deleteRecord(record) {
      const vocabulary = this.modelFor('vocabulary.item').record;

      if (confirm(`Tem certeza que deseja deletar o termo "${record.get('text')}"? \nEssa ação não pode ser desfeita.`)) {
        record.destroyRecord()
        .then( ()=> {
          this.get('notifications').success(`O termo "${record.get('text')}" foi deletado.`);
          this.transitionTo('vocabulary.item.terms.index', vocabulary.id);
          return null;
        });
      }
    }
  }
});