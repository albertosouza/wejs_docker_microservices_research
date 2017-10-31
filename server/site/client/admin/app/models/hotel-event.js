/**
 * Hodel event model
 */

import DS from 'ember-data';

export default DS.Model.extend({
  published: DS.attr('boolean'),
  showInLists: DS.attr('boolean', {
    defaultValue: true
  }),
  name: DS.attr('string'),
  about: DS.attr('string'),
  body: DS.attr('string'),
  creator: DS.belongsTo('user', {
    inverse: 'contents'
  }),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  publishedAt: DS.attr('date'),

  registrationStartDate: DS.attr('date'),
  registrationEndDate: DS.attr('date'),
  eventStartDate: DS.attr('date'),
  eventEndDate: DS.attr('date'),

  registrationManagerName: DS.attr('string'),
  registrationManagerEmail: DS.attr('string'),

  registrationLink: DS.attr('string'),

  vacancies: DS.attr('number'),

  tags: DS.attr(),
  category: DS.attr(),
  featuredImage: DS.attr('array'),
  images: DS.attr('array'),
  setAlias: DS.attr('string'),
  linkPermanent: DS.attr('string')
});