import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  actions: {
    changeStatus(record, status) {
      Ember.set(record, 'status', status);

      record.save()
      .then( (r)=> {
        if (status === 'closed') {
          this.get('notifications').success('Mensagem marcada como resolvida.');
        } else if('opened') {
          this.get('notifications').success('Mensagem marcada como pendente.');
        }
        // success
        return r;
      })
      .catch( (err)=> {
        this.send('queryError', err);
      });
    },
    save(record) {
      record.save()
      .then( (r)=> {
        this.get('notifications').success('Dados salvos.');
        // move scroll to top:
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        // success
        return r;
      })
      .catch( (err)=> {
        this.send('queryError', err);
        return err;
      });
    }
  }
});
