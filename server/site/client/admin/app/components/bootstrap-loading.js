import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    const lw = Ember.$('.loading-wrapper');
    lw.width(Ember.$( window ).width());
    lw.height(Ember.$( window ).height());
  }
});
