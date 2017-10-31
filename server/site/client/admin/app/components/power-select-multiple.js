import Ember from 'ember';
import EmberPowerSelect from 'ember-power-select/components/power-select-multiple';

export default EmberPowerSelect.extend({
  i18n: Ember.inject.service(),

  searchEnabled: true,


  loadingMessage: Ember.computed('i18n.locale', function() {
    return this.get('i18n').t('selects.loading');
  }),
  noMatchesMessage: Ember.computed('i18n.locale', function() {
    return this.get('i18n').t('selects.no-results-found');
  }),
  searchMessage: Ember.computed('i18n.locale', function() {
    return this.get('i18n').t('selects.type-to-search');
  })
});