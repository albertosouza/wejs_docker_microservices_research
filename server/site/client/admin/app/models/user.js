import DS from 'ember-data';

export default DS.Model.extend({
  displayName: DS.attr('string'),
  username: DS.attr('string'),
  fullName: DS.attr('string'),
  biography: DS.attr('string'),
  gender: DS.attr('string'),
  email: DS.attr('string'),
  active: DS.attr('boolean'),
  language: DS.attr('string'),
  roles: DS.attr(),
  contents: DS.hasMany('content', {
    inverse: 'creator',
    async: true
  }),
  slides: DS.hasMany('slide', {
    inverse: 'creator',
    async: true
  }),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  avatar: DS.attr('array')
});