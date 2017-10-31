import Ember from 'ember';
import EmberPowerSelect from 'ember-power-select/components/power-select';

export default EmberPowerSelect.extend({
  i18n: Ember.inject.service(),

  // Place here your system-wide preferences
  searchEnabled: false,
  allowClear: true,

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