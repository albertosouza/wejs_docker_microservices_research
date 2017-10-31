import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  actions: {
    deleteRecord(record) {
      if (confirm(`Tem certeza que deseja deletar o menu "${record.get('name')}"? \nEssa ação não pode ser desfeita.`)) {
        record.destroyRecord()
        .then( ()=> {
          this.get('notifications').success(`O menu "${record.get('name')}" foi deletado.`);
          this.transitionTo('menus.index');
          return null;
        });
      }
    },
    save(record) {
      record.save()
      .then( (r)=> {
        this.get('notifications').success('Menu salvo');
        // success
        return r;
      })
      .catch( (err)=> {
        this.send('queryError', err);
      });
    },
  }
});
