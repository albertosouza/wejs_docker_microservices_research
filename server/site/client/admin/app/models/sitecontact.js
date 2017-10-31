import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  phone: DS.attr('string'),
  message: DS.attr('string'),
  status: DS.attr('string', {
    defaultValue: 'opened'
  }),
  statusClass: DS.attr('string'),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  linkPermanent: DS.attr('string'),

  isClosed: Ember.computed('status', function() {
    return (this.get('status') === 'closed');
  })
});