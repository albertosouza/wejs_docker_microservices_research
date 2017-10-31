import Ember from 'ember';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  actions: {
    deleteRecord(record) {
      if (confirm(`Tem certeza que deseja deletar o vocabulário "${record.get('title')}"? \nEssa ação não pode ser desfeita.`)) {
        record.destroyRecord()
        .then( ()=> {
          this.get('notifications').success(`O vocabulário "${record.get('title')}" foi deletado.`);
          this.transitionTo('vocabulary.index');
          return null;
        });
      }
    }
  }
});
