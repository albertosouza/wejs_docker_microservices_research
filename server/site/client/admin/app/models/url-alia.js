import DS from 'ember-data';

export default DS.Model.extend({
  alias: DS.attr('string'),
  target: DS.attr('string'),
  locale: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
