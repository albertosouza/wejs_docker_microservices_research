import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  link: DS.attr('string'),
  linkText: DS.attr('string'),
  published: DS.attr('boolean', {
    defaultValue: true
  }),
  publishedAt: DS.attr('date'),
  slideshowId: DS.attr('string'),
  creator: DS.belongsTo('user', {
    inverse: 'slides'
  }),
  image: DS.attr('array')
});