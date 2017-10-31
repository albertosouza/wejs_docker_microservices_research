import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    const vocabulary = this.modelFor('vocabulary.item').record;
    return {
      vocabulary: vocabulary,
      record: this.store.createRecord('term', {
        vocabularyName: Ember.get(vocabulary,'name')
      })
    };
  },
  actions: {
    save(record) {
      record.save()
      .then( (r)=> {
        this.get('notifications').success('O termo foi criado com sucesso.');

        this.transitionTo(
          'vocabulary.item.terms.index',
          this.get('currentModel.vocabulary.id')
        );
        // success
        return r;
      })
      .catch( (err)=> {
        this.send('queryError', err);
      });
    }
  }
});