import Ember from 'ember';

export default Ember.Component.extend({
  terms: null,
  newTerm: null,
  // Event throw after user add one tag
  onAddTag: null,

  actions: {
    onAddTag() {
      if (this.get('onAddTag') && this.get('newTerm')) {
        this.sendAction(this.get('onAddTag'), this.get('newTerm'));
      }
    },
    onRemoveTag(term) {
      const terms = this.get('terms');
      terms.removeObject(term);
    }
  }
});