import Ember from 'ember';
import EmberFlatpickr from 'ember-flatpickr/components/ember-flatpickr';

export default EmberFlatpickr.extend({
  session: Ember.inject.service('session'),
  altFormat: 'F j, Y H:i',
  enableSeconds: false,
  enableTime: true,
  allowInput: false,
  altInput: true,
  clickOpens: true,
  altInputClass: 'form-control',
  locale: 'pt',
  mode: 'single',
  nextArrow: '>',
  parseDate: false,
  placeholder: '',
  prevArrow: '<',
  static: false,
  dateFormat: 'Z',
  timeFormat: 'H:i',
  utc: false,
  wrap: false
});