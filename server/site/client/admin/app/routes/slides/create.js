import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return {
      record: this.store.createRecord('slide')
    };
  },
  actions: {
    save(record) {
      record.slideshowId = 1; // hardcoded slideshow id

      record.save()
      .then( (r)=> {
        this.get('notifications').success('Slide adicionado com sucesso.');

        this.transitionTo('slides.item', r.id);
        this.send('scrollToTop');
        // success
        return r;
      })
      .catch( (err)=> {
        this.send('queryError', err);
        return null;
      });
    }
  }
});