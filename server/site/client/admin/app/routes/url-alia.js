import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  actions: {
    deleteRecord(record) {
      if (confirm(`Tem certeza que deseja deletar o url alternativo "${record.get('target')}"? \nEssa ação não pode ser desfeita.`)) {
        record.destroyRecord()
        .then( ()=> {
          this.get('notifications').success(`O url alternativo "${record.get('target')}" foi deletado.`);
          this.transitionTo('url-alia.index');
          return null;
        });
      }
    },
    save(record) {
      record.save()
      .then( (r)=> {
        this.get('notifications').success('Dados salvos.');
        // success
        return r;
      })
      .catch( (err)=> {
        this.send('queryError', err);
      });
    },
  }
});
