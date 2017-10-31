import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
// import ENV from "../../../config/environment";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  model(params) {
    let parentModel = this.modelFor('menus.item');

    return Ember.RSVP.hash({
      menuId: params.id,
      menu: parentModel.record,
      record: this.store.createRecord('link')
    });
  },

  actions: {
    saveLink(link) {
      let menu = this.get('currentModel.menu');
      link.set('menu', menu);

      link
      .save()
      .then( (r)=> {
        this.get('notifications').success('Link salvo');

        this.transitionTo('menus.item', menu.id);
        return r;
      });
    }
  }

});