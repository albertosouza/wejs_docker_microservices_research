import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    onSaveLink(link, modal) {
      this.send('saveLink', link, modal);
    },
    onCloseLinkEditModal() {
      this.send('onCloseLinkModal');
    }
  }
});