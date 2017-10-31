import DS from 'ember-data';

export default DS.Model.extend({
  active: DS.attr('boolean'),
  published: DS.attr('boolean'),
  showInLists: DS.attr('boolean', {
    defaultValue: true
  }),
  allowComments: DS.attr('boolean', {
    defaultValue: false
  }),
  title: DS.attr('string'),
  about: DS.attr('string'),
  body: DS.attr('string'),
  creator: DS.belongsTo('user', {
    inverse: 'contents'
  }),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  publishedAt: DS.attr('date'),
  tags: DS.attr(),
  category: DS.attr(),
  featuredImage: DS.attr('array'),
  images: DS.attr('array'),
  attachment: DS.attr('array'),
  setAlias: DS.attr('string'),

  linkPermanent: DS.attr('string')
});